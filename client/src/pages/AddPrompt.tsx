import { useState } from 'react';
import { usePrompts } from '@/contexts/PromptContext';
import { useLocation } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { STATUSES, PROMPT_TYPES, TOOL_TARGETS, STATUS_LABELS, TYPE_LABELS, TOOL_LABELS } from '@/lib/data';
import { toast } from 'sonner';

export default function AddPrompt() {
  const { categories, subcategories, tags, addPrompt } = usePrompts();
  const [, setLocation] = useLocation();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [description, setDescription] = useState('');
  const [previewText, setPreviewText] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [toolTarget, setToolTarget] = useState('ChatGPT');
  const [promptType, setPromptType] = useState('General');
  const [status, setStatus] = useState('Active');
  const [source, setSource] = useState('');
  const [notes, setNotes] = useState('');

  const filteredSubcategories = subcategories.filter(s => s.Category === category);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) { toast.error('כותרת היא שדה חובה'); return; }
    if (!category) { toast.error('קטגוריה היא שדה חובה'); return; }
    if (!previewText.trim()) { toast.error('תוכן הפרומפט הוא שדה חובה'); return; }

    addPrompt({
      Title: title.trim(),
      Category: category,
      Subcategory: subcategory,
      Description: description.trim(),
      Preview_Text: previewText.trim().slice(0, 1500),
      Full_Doc_Link: 'https://docs.google.com/document/d/new-doc',
      Tags: selectedTags,
      Is_Favorite: isFavorite,
      Tool_Target: toolTarget,
      Prompt_Type: promptType,
      Status: status,
      Source: source.trim(),
      Notes: notes.trim(),
    });

    setLocation('/prompts');
  };

  const toggleTag = (tagName: string) => {
    setSelectedTags(prev =>
      prev.includes(tagName) ? prev.filter(t => t !== tagName) : [...prev, tagName]
    );
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">הוספת פרומפט חדש</h1>
        <p className="text-muted-foreground text-sm mt-1">מלא את הפרטים ליצירת פרומפט חדש בספרייה</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <Card className="border border-border/60 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-display">מידע בסיסי</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">כותרת *</Label>
              <Input id="title" value={title} onChange={e => setTitle(e.target.value)} placeholder="שם הפרומפט..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">תיאור</Label>
              <Textarea id="description" value={description} onChange={e => setDescription(e.target.value)} placeholder="תיאור קצר של הפרומפט..." rows={2} />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>קטגוריה *</Label>
                <Select value={category} onValueChange={(v) => { setCategory(v); setSubcategory(''); }}>
                  <SelectTrigger><SelectValue placeholder="בחר קטגוריה" /></SelectTrigger>
                  <SelectContent>
                    {categories.filter(c => c.Category !== 'ארכיון').map(c => (
                      <SelectItem key={c.Category_ID} value={c.Category}>{c.Category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>תת-קטגוריה</Label>
                <Select value={subcategory} onValueChange={setSubcategory} disabled={!category}>
                  <SelectTrigger><SelectValue placeholder="בחר תת-קטגוריה" /></SelectTrigger>
                  <SelectContent>
                    {filteredSubcategories.map(s => (
                      <SelectItem key={s.Subcategory_ID} value={s.Subcategory}>{s.Subcategory}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Prompt Content */}
        <Card className="border border-border/60 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-display">תוכן הפרומפט *</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={previewText}
              onChange={e => setPreviewText(e.target.value)}
              placeholder="הדבק כאן את תוכן הפרומפט המלא..."
              rows={8}
              dir="ltr"
              className="font-mono text-sm"
            />
            <p className="text-[10px] text-muted-foreground mt-1">
              {previewText.length}/1,500 תווים (תצוגה מקדימה)
            </p>
          </CardContent>
        </Card>

        {/* Classification */}
        <Card className="border border-border/60 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-display">סיווג</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>סוג פרומפט</Label>
                <Select value={promptType} onValueChange={setPromptType}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {PROMPT_TYPES.map(t => (
                      <SelectItem key={t} value={t}>{TYPE_LABELS[t]}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>כלי יעד</Label>
                <Select value={toolTarget} onValueChange={setToolTarget}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {TOOL_TARGETS.map(t => (
                      <SelectItem key={t} value={t}>{TOOL_LABELS[t]}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>סטטוס</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {STATUSES.filter(s => s !== 'Archived').map(s => (
                      <SelectItem key={s} value={s}>{STATUS_LABELS[s]}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <Label>תגיות</Label>
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <button
                    key={tag.Tag_ID}
                    type="button"
                    onClick={() => toggleTag(tag.Tag_Name)}
                    className={`text-xs px-2.5 py-1 rounded-full border transition-smooth ${
                      selectedTags.includes(tag.Tag_Name)
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-muted/50 text-muted-foreground border-border hover:border-primary/50'
                    }`}
                  >
                    {tag.Tag_Name}
                  </button>
                ))}
              </div>
            </div>

            {/* Favorite */}
            <div className="flex items-center gap-3">
              <Switch checked={isFavorite} onCheckedChange={setIsFavorite} id="favorite" />
              <Label htmlFor="favorite" className="text-sm">סמן כמועדף</Label>
            </div>
          </CardContent>
        </Card>

        {/* Extra */}
        <Card className="border border-border/60 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-display">מידע נוסף</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="source">מקור</Label>
              <Input id="source" value={source} onChange={e => setSource(e.target.value)} placeholder="מקורי / מותאם / GitHub..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">הערות</Label>
              <Textarea id="notes" value={notes} onChange={e => setNotes(e.target.value)} placeholder="הערות פנימיות..." rows={2} />
            </div>
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex gap-3">
          <Button type="submit" className="flex-1 sm:flex-none sm:px-8">שמור פרומפט</Button>
          <Button type="button" variant="outline" onClick={() => setLocation('/prompts')}>ביטול</Button>
        </div>
      </form>
    </div>
  );
}
