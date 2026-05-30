import React, { createContext, useContext, useState, useCallback } from 'react';
import { Prompt, PROMPTS, CATEGORIES, TAGS, SUBCATEGORIES, MIGRATION_STEPS, type Category, type Tag, type Subcategory, type MigrationStep } from '@/lib/data';
import { toast } from 'sonner';

interface PromptContextType {
  prompts: Prompt[];
  categories: Category[];
  tags: Tag[];
  subcategories: Subcategory[];
  migrationSteps: MigrationStep[];
  addPrompt: (prompt: Omit<Prompt, 'Prompt_ID' | 'Created_At' | 'Updated_At' | 'Version'>) => void;
  updatePrompt: (id: string, updates: Partial<Prompt>) => void;
  archivePrompt: (id: string) => void;
  toggleFavorite: (id: string) => void;
  addTag: (tag: Omit<Tag, 'Tag_ID' | 'Date_Created' | 'Date_Modified'>) => void;
  updateMigrationStep: (id: number, status: MigrationStep['status']) => void;
}

const PromptContext = createContext<PromptContextType | null>(null);

export function PromptProvider({ children }: { children: React.ReactNode }) {
  const [prompts, setPrompts] = useState<Prompt[]>(PROMPTS);
  const [categories] = useState<Category[]>(CATEGORIES);
  const [tags, setTags] = useState<Tag[]>(TAGS);
  const [subcategories] = useState<Subcategory[]>(SUBCATEGORIES);
  const [migrationSteps, setMigrationSteps] = useState<MigrationStep[]>(MIGRATION_STEPS);

  const addPrompt = useCallback((prompt: Omit<Prompt, 'Prompt_ID' | 'Created_At' | 'Updated_At' | 'Version'>) => {
    const now = new Date().toISOString().split('T')[0];
    const newId = `PRM-${String(prompts.length + 1).padStart(3, '0')}`;
    const newPrompt: Prompt = {
      ...prompt,
      Prompt_ID: newId,
      Version: 'v1.0',
      Created_At: now,
      Updated_At: now,
    };
    setPrompts(prev => [newPrompt, ...prev]);
    toast.success('הפרומפט נוסף בהצלחה');
  }, [prompts.length]);

  const updatePrompt = useCallback((id: string, updates: Partial<Prompt>) => {
    const now = new Date().toISOString().split('T')[0];
    setPrompts(prev => prev.map(p => {
      if (p.Prompt_ID === id) {
        const currentVersion = parseFloat(p.Version.replace('v', ''));
        const newVersion = `v${(currentVersion + 0.1).toFixed(1)}`;
        return { ...p, ...updates, Updated_At: now, Version: newVersion };
      }
      return p;
    }));
    toast.success('הפרומפט עודכן בהצלחה');
  }, []);

  const archivePrompt = useCallback((id: string) => {
    setPrompts(prev => prev.map(p =>
      p.Prompt_ID === id ? { ...p, Status: 'Archived', Category: 'ארכיון', Updated_At: new Date().toISOString().split('T')[0] } : p
    ));
    toast.success('הפרומפט הועבר לארכיון');
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setPrompts(prev => prev.map(p =>
      p.Prompt_ID === id ? { ...p, Is_Favorite: !p.Is_Favorite } : p
    ));
  }, []);

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
      prompts, categories, tags, subcategories, migrationSteps,
      addPrompt, updatePrompt, archivePrompt, toggleFavorite, addTag, updateMigrationStep,
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
