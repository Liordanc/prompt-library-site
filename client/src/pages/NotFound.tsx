import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
      <div className="text-6xl font-display font-bold text-muted-foreground/30 mb-4">404</div>
      <h1 className="font-display text-xl font-bold mb-2">הדף לא נמצא</h1>
      <p className="text-muted-foreground text-sm mb-6">הדף שחיפשת לא קיים או שהוסר</p>
      <Link href="/">
        <Button className="gap-2">
          <Home className="w-4 h-4" />
          חזרה לדף הבית
        </Button>
      </Link>
    </div>
  );
}
