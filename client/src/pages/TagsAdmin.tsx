import { useState } from 'react';
import { usePrompts } from '@/contexts/PromptContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Plus, Tag } from 'lucide-react';
import { toast } from 'sonner';

const TAG_COLORS = ['#d97706', '#65a30d', '#dc2626', '#eab308', '#3b82f6', '#8b5cf6', '#06b6d4', '#ec4899', '#14b8a6', '#f97316'];

export default function TagsAdmin() {
  const { tags, prompts, addTag } = usePrompts();
  const [newName, setNewName] = useState('');
  const [newColor, setNewColor] = useState(TAG_COLORS[0]);
  const [newDescription, setNewDescription] = useState('');

  const handleAdd = () => {
    if (!newName.trim()) { toast.error('שם התגית הוא שדה חובה'); return; }
    if (tags.some(t => t.Tag_Name === newName.trim())) { toast.error('תגית עם שם זה כבר קיימת'); return; }
    addTag({ Tag_Name: newName.trim(), Tag_Color: newColor, Description: newDescription.trim() });
    setNewName('');
    setNewDescription('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold">ניהול תגיות</h1>
          <p className="text-muted-foreground text-sm mt-1">{tags.length} תגיות בספרייה</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              תגית חדשה
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>הוספת תגית חדשה</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>שם התגית *</Label>
                <Input value={newName} onChange={e => setNewName(e.target.value)} placeholder="שם התגית..." />
              </div>
              <div className="space-y-2">
                <Label>צבע</Label>
                <div className="flex flex-wrap gap-2">
                  {TAG_COLORS.map(color => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setNewColor(color)}
                      className={`w-7 h-7 rounded-full border-2 transition-smooth ${
                        newColor === color ? 'border-foreground scale-110' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>תיאור</Label>
                <Input value={newDescription} onChange={e => setNewDescription(e.target.value)} placeholder="תיאור קצר..." />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">ביטול</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button onClick={handleAdd}>הוסף תגית</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tags Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tags.map(tag => {
          const count = prompts.filter(p => p.Tags.includes(tag.Tag_Name)).length;
          return (
            <Card key={tag.Tag_ID} className="border border-border/60 shadow-sm hover:shadow-md transition-smooth">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-4 h-4 rounded-full shrink-0" style={{ backgroundColor: tag.Tag_Color }} />
                    <h3 className="font-semibold text-sm">{tag.Tag_Name}</h3>
                  </div>
                  <Badge variant="secondary" className="text-[10px]">{count} פרומפטים</Badge>
                </div>
                {tag.Description && (
                  <p className="text-xs text-muted-foreground mt-2">{tag.Description}</p>
                )}
                <p className="text-[10px] text-muted-foreground mt-2">נוצר: {tag.Date_Created}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Prompt_Tags Info */}
      <Card className="border border-border/60 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-display">קשרי תגיות-פרומפטים (Prompt_Tags)</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground mb-3">
            טבלת Prompt_Tags מנהלת קשרי many-to-many בין פרומפטים לתגיות.
            כל קשר כולל: Prompt_ID, Tag_ID, Date_Created.
          </p>
          <div className="overflow-x-auto rounded-lg border border-border/40">
            <table className="w-full text-xs">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-right p-2 font-medium">פרומפט</th>
                  <th className="text-right p-2 font-medium">תגיות</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {prompts.filter(p => p.Tags.length > 0).slice(0, 8).map(p => (
                  <tr key={p.Prompt_ID}>
                    <td className="p-2 font-medium">{p.Title}</td>
                    <td className="p-2">
                      <div className="flex flex-wrap gap-1">
                        {p.Tags.map(t => (
                          <Badge key={t} variant="outline" className="text-[10px] px-1.5 py-0">{t}</Badge>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
