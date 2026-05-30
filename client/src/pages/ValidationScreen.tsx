import { useMemo } from 'react';
import { usePrompts } from '@/contexts/PromptContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { STATUSES, PROMPT_TYPES, TOOL_TARGETS } from '@/lib/data';
import { CheckCircle2, XCircle, AlertTriangle, RefreshCw, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

interface ValidationResult {
  prompt_id: string;
  title: string;
  issues: string[];
  status: 'valid' | 'warning' | 'error';
}

export default function ValidationScreen() {
  const { prompts, categories } = usePrompts();

  const validationResults = useMemo<ValidationResult[]>(() => {
    const categoryNames = categories.map(c => c.Category);

    return prompts.map(p => {
      const issues: string[] = [];

      // Required fields
      if (!p.Prompt_ID) issues.push('חסר Prompt_ID');
      if (!p.Title) issues.push('חסרה כותרת');
      if (!p.Category) issues.push('חסרה קטגוריה');
      if (!p.Full_Doc_Link) issues.push('חסר קישור למסמך');
      if (!p.Prompt_Type) issues.push('חסר סוג פרומפט');
      if (!p.Status) issues.push('חסר סטטוס');
      if (!p.Version) issues.push('חסרה גרסה');
      if (!p.Created_At) issues.push('חסר תאריך יצירה');
      if (!p.Updated_At) issues.push('חסר תאריך עדכון');

      // Category validation
      if (p.Category && !categoryNames.includes(p.Category)) {
        issues.push(`קטגוריה "${p.Category}" לא קיימת ברשימה`);
      }

      // Status validation
      if (p.Status && !(STATUSES as readonly string[]).includes(p.Status)) {
        issues.push(`סטטוס "${p.Status}" לא תקין`);
      }

      // Prompt_Type validation
      if (p.Prompt_Type && !(PROMPT_TYPES as readonly string[]).includes(p.Prompt_Type)) {
        issues.push(`סוג פרומפט "${p.Prompt_Type}" לא תקין`);
      }

      // Tool_Target validation
      if (p.Tool_Target && !(TOOL_TARGETS as readonly string[]).includes(p.Tool_Target)) {
        issues.push(`כלי יעד "${p.Tool_Target}" לא תקין`);
      }

      // Link validation (basic)
      if (p.Full_Doc_Link && !p.Full_Doc_Link.startsWith('https://')) {
        issues.push('קישור למסמך לא תקין (חייב להתחיל ב-https://)');
      }

      // Preview_Text length
      if (p.Preview_Text && p.Preview_Text.length > 1500) {
        issues.push('תצוגה מקדימה חורגת מ-1,500 תווים');
      }

      // Version format
      if (p.Version && !p.Version.match(/^v\d+\.\d+$/)) {
        issues.push('פורמט גרסה לא תקין (צריך להיות vX.Y)');
      }

      const status = issues.length === 0 ? 'valid' : issues.some(i => i.includes('חסר')) ? 'error' : 'warning';
      return { prompt_id: p.Prompt_ID, title: p.Title, issues, status };
    });
  }, [prompts, categories]);

  const validCount = validationResults.filter(r => r.status === 'valid').length;
  const warningCount = validationResults.filter(r => r.status === 'warning').length;
  const errorCount = validationResults.filter(r => r.status === 'error').length;

  const runValidation = () => {
    toast.success(`ולידציה הושלמה: ${validCount} תקינים, ${warningCount} אזהרות, ${errorCount} שגיאות`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold">ולידציה</h1>
          <p className="text-muted-foreground text-sm mt-1">בדיקת תקינות נתוני הפרומפטים</p>
        </div>
        <Button onClick={runValidation} className="gap-2">
          <RefreshCw className="w-4 h-4" />
          הרץ ולידציה
        </Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="border border-green-200 bg-green-50/30 shadow-sm">
          <CardContent className="p-4 text-center">
            <CheckCircle2 className="w-6 h-6 text-green-500 mx-auto mb-1" />
            <p className="text-2xl font-bold font-display text-green-700">{validCount}</p>
            <p className="text-xs text-green-600">תקינים</p>
          </CardContent>
        </Card>
        <Card className="border border-amber-200 bg-amber-50/30 shadow-sm">
          <CardContent className="p-4 text-center">
            <AlertTriangle className="w-6 h-6 text-amber-500 mx-auto mb-1" />
            <p className="text-2xl font-bold font-display text-amber-700">{warningCount}</p>
            <p className="text-xs text-amber-600">אזהרות</p>
          </CardContent>
        </Card>
        <Card className="border border-red-200 bg-red-50/30 shadow-sm">
          <CardContent className="p-4 text-center">
            <XCircle className="w-6 h-6 text-red-500 mx-auto mb-1" />
            <p className="text-2xl font-bold font-display text-red-700">{errorCount}</p>
            <p className="text-xs text-red-600">שגיאות</p>
          </CardContent>
        </Card>
      </div>

      {/* Validation Rules */}
      <Card className="border border-border/60 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-display flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            כללי ולידציה
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 gap-3 text-xs">
            <div className="space-y-1.5">
              <p className="font-medium text-foreground">שדות חובה בשורה:</p>
              <ul className="space-y-0.5 text-muted-foreground list-disc list-inside">
                <li>Prompt_ID, Title, Category</li>
                <li>Full_Doc_Link, Is_Favorite</li>
                <li>Prompt_Type, Status, Version</li>
                <li>Created_At, Updated_At</li>
              </ul>
            </div>
            <div className="space-y-1.5">
              <p className="font-medium text-foreground">בדיקות נוספות:</p>
              <ul className="space-y-0.5 text-muted-foreground list-disc list-inside">
                <li>קטגוריה חייבת להיות מהרשימה</li>
                <li>סטטוס חייב להיות ערך מבוקר</li>
                <li>קישור חייב להתחיל ב-https://</li>
                <li>Preview_Text עד 1,500 תווים</li>
                <li>פורמט גרסה: vX.Y</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <Card className="border border-border/60 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-display">תוצאות ולידציה</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {validationResults.map(result => (
              <div key={result.prompt_id} className={`p-3 rounded-lg border ${
                result.status === 'valid' ? 'border-green-200/60 bg-green-50/20' :
                result.status === 'warning' ? 'border-amber-200/60 bg-amber-50/20' :
                'border-red-200/60 bg-red-50/20'
              }`}>
                <div className="flex items-center gap-2">
                  {result.status === 'valid' ? (
                    <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                  ) : result.status === 'warning' ? (
                    <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-500 shrink-0" />
                  )}
                  <span className="text-sm font-medium">{result.title}</span>
                  <Badge variant="outline" className="text-[10px] mr-auto">{result.prompt_id}</Badge>
                </div>
                {result.issues.length > 0 && (
                  <ul className="mt-1.5 mr-6 space-y-0.5">
                    {result.issues.map((issue, i) => (
                      <li key={i} className="text-[11px] text-muted-foreground">• {issue}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
