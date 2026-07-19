import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Prompt, PROMPTS, CATEGORIES, TAGS, SUBCATEGORIES, MIGRATION_STEPS, type Category, type Tag, type Subcategory, type MigrationStep } from '@/lib/data';
import { toast } from 'sonner';
import { promptApi, type SyncMode } from '@/lib/promptApi';

interface PromptContextType {
  prompts: Prompt[];
  categories: Category[];
  tags: Tag[];
  subcategories: Subcategory[];
  migrationSteps: MigrationStep[];
  loading: boolean;
  syncMode: SyncMode;
  addPrompt: (prompt: Omit<Prompt, 'Prompt_ID' | 'Created_At' | 'Updated_At' | 'Version'>) => Promise<void>;
  updatePrompt: (id: string, updates: Partial<Prompt>) => Promise<void>;
  archivePrompt: (id: string) => Promise<void>;
  deletePrompt: (id: string) => Promise<void>;
  toggleFavorite: (id: string) => Promise<void>;
  addTag: (tag: Omit<Tag, 'Tag_ID' | 'Date_Created' | 'Date_Modified'>) => void;
  updateMigrationStep: (id: number, status: MigrationStep['status']) => void;
}

const PromptContext = createContext<PromptContextType | null>(null);

export function PromptProvider({ children }: { children: React.ReactNode }) {
  const [prompts, setPrompts] = useState<Prompt[]>(PROMPTS);
  const [loading, setLoading] = useState(true);
  const [categories] = useState<Category[]>(CATEGORIES);
  const [tags, setTags] = useState<Tag[]>(TAGS);
  const [subcategories] = useState<Subcategory[]>(SUBCATEGORIES);
  const [migrationSteps, setMigrationSteps] = useState<MigrationStep[]>(MIGRATION_STEPS);

  useEffect(() => {
    promptApi.list(PROMPTS)
      .then(setPrompts)
      .catch(() => toast.error('הטעינה מ-Google Sheets נכשלה; מוצגת גרסה מקומית'))
      .finally(() => setLoading(false));
  }, []);

  const addPrompt = useCallback(async (prompt: Omit<Prompt, 'Prompt_ID' | 'Created_At' | 'Updated_At' | 'Version'>) => {
    const now = new Date().toISOString();
    const newId = `PRM-${Date.now()}`;
    const newPrompt: Prompt = {
      ...prompt,
      Prompt_ID: newId,
      Version: 'v1.0',
      Created_At: now,
      Updated_At: now,
    };
    const saved = await promptApi.create(newPrompt, prompts);
    setPrompts(prev => [saved, ...prev]);
    toast.success('הפרומפט נוסף בהצלחה');
  }, [prompts.length]);

  const updatePrompt = useCallback(async (id: string, updates: Partial<Prompt>) => {
    const current = prompts.find(p => p.Prompt_ID === id);
    if (!current) return;
    const currentVersion = parseFloat(current.Version.replace('v', '')) || 1;
    const changed = { ...current, ...updates, Updated_At: new Date().toISOString(), Version: `v${(currentVersion + 0.1).toFixed(1)}` };
    const saved = await promptApi.update(changed, prompts);
    setPrompts(prev => prev.map(p => p.Prompt_ID === id ? saved : p));
    toast.success('הפרומפט עודכן בהצלחה');
  }, [prompts]);

  const archivePrompt = useCallback(async (id: string) => {
    await updatePrompt(id, { Status: 'Archived', Category: 'ארכיון' });
    toast.success('הפרומפט הועבר לארכיון');
  }, [updatePrompt]);

  const deletePrompt = useCallback(async (id: string) => {
    await promptApi.remove(id, prompts);
    setPrompts(prev => prev.filter(p => p.Prompt_ID !== id));
    toast.success('הפרומפט נמחק');
  }, [prompts]);

  const toggleFavorite = useCallback(async (id: string) => {
    const current = prompts.find(p => p.Prompt_ID === id);
    if (current) await updatePrompt(id, { Is_Favorite: !current.Is_Favorite });
  }, [prompts, updatePrompt]);

  const addTag = useCallback((tag: Omit<Tag, 'Tag_ID' | 'Date_Created' | 'Date_Modified'>) => {
    const now = new Date().toISOString().split('T')[0];
    const newTag: Tag = {
      ...tag,
      Tag_ID: `tag-${String(tags.length + 1).padStart(2, '0')}`,
      Date_Created: now,
      Date_Modified: now,
    };
    setTags(prev => [...prev, newTag]);
    toast.success('התגית נוספה בהצלחה');
  }, [tags.length]);

  const updateMigrationStep = useCallback((id: number, status: MigrationStep['status']) => {
    setMigrationSteps(prev => prev.map(s =>
      s.id === id ? { ...s, status } : s
    ));
    toast.success('סטטוס המיגרציה עודכן');
  }, []);

  return (
    <PromptContext.Provider value={{
      prompts, categories, tags, subcategories, migrationSteps, loading, syncMode: promptApi.mode,
      addPrompt, updatePrompt, archivePrompt, deletePrompt, toggleFavorite, addTag, updateMigrationStep,
    }}>
      {children}
    </PromptContext.Provider>
  );
}

export function usePrompts() {
  const ctx = useContext(PromptContext);
  if (!ctx) throw new Error('usePrompts must be used within PromptProvider');
  return ctx;
}
