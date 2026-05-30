import { usePrompts } from '@/contexts/PromptContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { CheckCircle2, AlertCircle, Circle, Play, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

export default function MigrationAdmin() {
  const { migrationSteps, updateMigrationStep } = usePrompts();

  const completed = migrationSteps.filter(s => s.status === 'completed').length;
  const total = migrationSteps.length;
  const progress = (completed / total) * 100;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'in_progress': return <AlertCircle className="w-5 h-5 text-amber-500" />;
      case 'error': return <AlertCircle className="w-5 h-5 text-red-500" />;
      default: return <Circle className="w-5 h-5 text-muted-foreground/40" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed': return <Badge className="bg-green-100 text-green-700 text-[10px]">הושלם</Badge>;
      case 'in_progress': return <Badge className="bg-amber-100 text-amber-700 text-[10px]">בתהליך</Badge>;
      case 'error': return <Badge className="bg-red-100 text-red-700 text-[10px]">שגיאה</Badge>;
      default: return <Badge variant="secondary" className="text-[10px]">ממתין</Badge>;
    }
  };

  const runStep = (id: number) => {
    updateMigrationStep(id, 'in_progress');
    // Simulate completion after a delay
    setTimeout(() => {
      updateMigrationStep(id, 'completed');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">מיגרציה וניהול</h1>
        <p className="text-muted-foreground text-sm mt-1">ניהול תהליך המיגרציה לפי ה-SSOT</p>
      </div>

      {/* Progress Overview */}
      <Card className="border border-border/60 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-display font-semibold">התקדמות כללית</h3>
            <span className="text-sm font-medium">{completed}/{total} שלבים הושלמו</span>
          </div>
          <Progress value={progress} className="h-3" />
          <p className="text-xs text-muted-foreground mt-2">
            {progress === 100 ? 'המיגרציה הושלמה בהצלחה!' : `${Math.round(progress)}% הושלם — המשך לשלב הבא`}
          </p>
        </CardContent>
      </Card>

      {/* Migration Steps */}
      <div className="space-y-3">
        {migrationSteps.map((step, idx) => (
          <Card key={step.id} className={`border shadow-sm transition-smooth ${
            step.status === 'in_progress' ? 'border-amber-200 bg-amber-50/30' :
            step.status === 'completed' ? 'border-green-200/60' :
            'border-border/60'
          }`}>
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="shrink-0 mt-0.5">
                  {getStatusIcon(step.status)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-semibold">{step.title}</h3>
                    {getStatusBadge(step.status)}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{step.description}</p>
                  <p className="text-[10px] text-muted-foreground mt-1 font-mono" dir="ltr">{step.phase}</p>
                </div>
                <div className="shrink-0">
                  {step.status === 'pending' && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm" className="gap-1.5 text-xs" disabled={idx > 0 && migrationSteps[idx - 1].status !== 'completed'}>
                          <Play className="w-3 h-3" />
                          הפעל
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>הפעלת שלב מיגרציה</AlertDialogTitle>
                          <AlertDialogDescription>
                            האם להפעיל את השלב "{step.title}"?
                            {'\n'}פעולה זו תבצע: {step.description}
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>ביטול</AlertDialogCancel>
                          <AlertDialogAction onClick={() => runStep(step.id)}>הפעל</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                  {step.status === 'in_progress' && (
                    <div className="flex items-center gap-1.5 text-xs text-amber-600">
                      <div className="w-3 h-3 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                      מעבד...
                    </div>
                  )}
                  {step.status === 'completed' && (
                    <span className="text-xs text-green-600 font-medium">✓</span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Safety Notice */}
      <Card className="border border-amber-200 bg-amber-50/30 shadow-sm">
        <CardContent className="p-4">
          <h3 className="text-sm font-semibold text-amber-800 mb-1">⚠️ הערות בטיחות</h3>
          <ul className="text-xs text-amber-700 space-y-1 list-disc list-inside">
            <li>פעולות הרסניות דורשות אישור</li>
            <li>אין מחיקה של נתונים קיימים בשלב הראשון</li>
            <li>גיליונות כפולים מוסתרים בלבד — לא נמחקים</li>
            <li>שדה Content נשמר כגיבוי זמני</li>
            <li>כל שלב מתבצע רק אחרי השלמת השלב הקודם</li>
          </ul>
        </CardContent>
      </Card>

      {/* Open Decisions */}
      <Card className="border border-border/60 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-display">החלטות פתוחות וברירות מחדל</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-xs">
            <div className="flex gap-2 p-2 rounded bg-muted/30">
              <Badge variant="outline" className="text-[10px] shrink-0">OD-001</Badge>
              <span>הסתרת גיליונות כפולים — ללא מחיקה</span>
            </div>
            <div className="flex gap-2 p-2 rounded bg-muted/30">
              <Badge variant="outline" className="text-[10px] shrink-0">OD-002</Badge>
              <span>שמירת Content כשדה גיבוי זמני</span>
            </div>
            <div className="flex gap-2 p-2 rounded bg-muted/30">
              <Badge variant="outline" className="text-[10px] shrink-0">OD-003</Badge>
              <span>מגבלת Preview_Text: 1,500 תווים</span>
            </div>
            <div className="flex gap-2 p-2 rounded bg-muted/30">
              <Badge variant="outline" className="text-[10px] shrink-0">OD-004</Badge>
              <span>כותרות גיליון באנגלית, תוויות UI בעברית</span>
            </div>
            <div className="flex gap-2 p-2 rounded bg-muted/30">
              <Badge variant="outline" className="text-[10px] shrink-0">OD-005</Badge>
              <span>יצירת תיקיות קטגוריה אחרי שדרוג סכמה</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
