import { usePrompts } from '@/contexts/PromptContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FolderOpen, Layers } from 'lucide-react';

export default function CategoriesAdmin() {
  const { categories, subcategories, prompts } = usePrompts();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">ניהול קטגוריות</h1>
        <p className="text-muted-foreground text-sm mt-1">קטגוריות ותת-קטגוריות לארגון הפרומפטים</p>
      </div>

      <Tabs defaultValue="categories" dir="rtl">
        <TabsList>
          <TabsTrigger value="categories" className="gap-1.5">
            <FolderOpen className="w-3.5 h-3.5" />
            קטגוריות
          </TabsTrigger>
          <TabsTrigger value="subcategories" className="gap-1.5">
            <Layers className="w-3.5 h-3.5" />
            תת-קטגוריות
          </TabsTrigger>
        </TabsList>

        <TabsContent value="categories" className="mt-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map(cat => {
              const count = prompts.filter(p => p.Category === cat.Category).length;
              return (
                <Card key={cat.Category_ID} className="border border-border/60 shadow-sm hover:shadow-md transition-smooth">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <FolderOpen className="w-5 h-5 text-primary" />
                      </div>
                      <Badge variant="secondary" className="text-[10px]">{count} פרומפטים</Badge>
                    </div>
                    <h3 className="font-semibold text-sm mt-3">{cat.Category}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{cat.Description}</p>
                    <p className="text-[10px] text-muted-foreground mt-2 font-mono" dir="ltr">{cat.Folder_Name}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Drive Architecture Info */}
          <Card className="mt-6 border border-border/60 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-display">ארכיטקטורת תיקיות Google Drive</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/40 rounded-lg p-4 font-mono text-xs space-y-1" dir="ltr">
                <p className="font-semibold text-foreground">📁 Prompt Library</p>
                {categories.map(cat => (
                  <p key={cat.Category_ID} className="pr-6 text-muted-foreground">
                    📂 {cat.Folder_Name}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subcategories" className="mt-4">
          <div className="space-y-4">
            {categories.filter(c => c.Category !== 'ארכיון').map(cat => {
              const subs = subcategories.filter(s => s.Category === cat.Category);
              if (subs.length === 0) return null;
              return (
                <Card key={cat.Category_ID} className="border border-border/60 shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-display flex items-center gap-2">
                      <FolderOpen className="w-4 h-4 text-primary" />
                      {cat.Category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      {subs.map(sub => (
                        <div key={sub.Subcategory_ID} className="p-3 rounded-lg bg-muted/30 border border-border/40">
                          <p className="text-sm font-medium">{sub.Subcategory}</p>
                          <p className="text-[10px] text-muted-foreground mt-0.5">{sub.Description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
