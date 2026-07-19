import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "wouter";
import { usePrompts } from "@/contexts/PromptContext";
import { toast } from "sonner";

const marks: Record<string, string> = {
  "כתיבת פרומפטים": "↗", "הוראה ולמידה": "◇", "עיצוב וממשק": "□",
  "מחקר ואימות": "≋", "יצירת תמונות": "✦", "קוד ופיתוח": "⌘",
  "מסמכים וסיכומים": "▤", "ניהול עבודה": "✓", "כללי": "○",
};
const colors = ["cobalt", "mint", "amber", "violet", "coral"];

export default function JulyLibrary() {
  const { prompts, toggleFavorite, loading, syncMode } = usePrompts();
  const [, navigate] = useLocation();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("recommended");
  const [menuOpen, setMenuOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault(); searchRef.current?.focus();
      }
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const active = useMemo(() => {
    const q = query.trim().toLowerCase();
    const result = prompts.filter(p => p.Status !== "Archived")
      .filter(p => category === "all" || category === "favorites" ? category !== "favorites" || p.Is_Favorite : p.Category === category)
      .filter(p => !q || `${p.Title} ${p.Description} ${p.Preview_Text} ${p.Tags.join(" ")}`.toLowerCase().includes(q));
    return sort === "alphabetical" ? result.sort((a, b) => a.Title.localeCompare(b.Title, "he")) : result;
  }, [prompts, query, category, sort]);

  const categories = useMemo(() => Array.from(new Set(prompts.filter(p => p.Status !== "Archived").map(p => p.Category))), [prompts]);
  const grouped = useMemo(() => categories.map(name => ({ name, items: active.filter(p => p.Category === name) })).filter(g => g.items.length), [categories, active]);

  async function copy(text: string) {
    await navigator.clipboard.writeText(text);
    toast.success("הפרומפט הועתק");
  }

  return <main className="july-shell" dir="rtl">
    <aside className={`july-sidebar ${menuOpen ? "open" : ""}`}>
      <div className="july-brand"><small>PL / 01</small><strong>ספריית<br/>הפרומפטים<span>.</span></strong></div>
      <nav aria-label="קטגוריות בספרייה">
        <p>ניווט לפי נושא</p>
        <button className={category === "all" ? "active" : ""} onClick={() => {setCategory("all");setMenuOpen(false)}}><i>●</i>כל הספרייה<b>{prompts.length}</b></button>
        <button className={category === "favorites" ? "active" : ""} onClick={() => {setCategory("favorites");setMenuOpen(false)}}><i>★</i>שמורים<b>{prompts.filter(p => p.Is_Favorite).length}</b></button>
        {categories.map(name => <button key={name} className={category === name ? "active" : ""} onClick={() => {setCategory(name);setMenuOpen(false)}}><i>{marks[name] || "○"}</i>{name}<b>{prompts.filter(p => p.Category === name).length}</b></button>)}
      </nav>
      <div className="july-note"><small>עיקרון מארגן</small><p>כל פרומפט מתחיל בתוצאה הרצויה, ורק אחר כך בתהליך.</p></div>
    </aside>
    {menuOpen && <button className="july-scrim" aria-label="סגירת תפריט" onClick={() => setMenuOpen(false)} />}
    <section className="july-workspace">
      <header className="july-topbar">
        <button className="july-menu" onClick={() => setMenuOpen(true)} aria-label="פתיחת תפריט">☰</button>
        <label className="july-search"><span>⌕</span><input ref={searchRef} value={query} onChange={e => setQuery(e.target.value)} placeholder="חיפוש לפי מטרה, נושא או תגית..."/><kbd>Ctrl K</kbd></label>
        <span className={`july-sync ${loading ? "loading" : ""}`}><i/>{loading ? "מתחבר..." : syncMode === "google-sheets" ? "Google Sheets" : "שמירה מקומית"}</span>
        <button className="july-new" onClick={() => navigate("/add")}>＋ הוספת פרומפט</button>
      </header>
      <div className="july-content">
        <section className="july-hero"><div><small>אוסף עבודה אישי · גרסה משוחזרת</small><h1>למצוא את הפרומפט<br/><em>הנכון לרגע הנכון.</em></h1></div><div><p>פרומפטים, תהליכי חשיבה ותבניות עבודה—מסודרים לפי המטרה שהם עוזרים להשיג.</p><span><b>{active.length}</b> פרומפטים　 <b>{grouped.length}</b> תחומים</span></div></section>
        <section className="july-collection">
          <header><div><small>אוסף נבחר</small><h2>{category === "all" ? "כל הספרייה" : category === "favorites" ? "שמורים" : category}</h2></div><label>מיון <select value={sort} onChange={e => setSort(e.target.value)}><option value="recommended">מומלצים תחילה</option><option value="alphabetical">לפי א׳–ת׳</option></select></label></header>
          {!active.length && <div className="july-empty">לא נמצאו פרומפטים המתאימים לחיפוש.</div>}
          <div className="july-groups">{grouped.map(group => <section key={group.name} className="july-group"><header><div><span>{marks[group.name] || "○"}</span><h3>{group.name}</h3></div><small>{group.items.length} פרומפטים</small></header><div className="july-grid">{group.items.map((prompt, index) => <article key={prompt.Prompt_ID} className={`july-card ${colors[index % colors.length]}`}><div className="july-cardtop"><span>{String(index + 1).padStart(2,"0")}</span><div><button onClick={() => copy(prompt.Preview_Text)} title="העתקה">⧉</button><button onClick={() => navigate(`/edit/${prompt.Prompt_ID}`)} title="עריכה">✎</button><button onClick={() => toggleFavorite(prompt.Prompt_ID)} title="מועדפים">{prompt.Is_Favorite ? "★" : "☆"}</button></div></div><div className="july-cardbody"><h3>{prompt.Title}</h3><p>{prompt.Description}</p></div><div className="july-tags">{prompt.Tags.slice(0,3).map(tag => <span key={tag}>{tag}</span>)}</div><footer><button onClick={() => navigate(`/prompts/${prompt.Prompt_ID}`)}>פתיחה <b>←</b></button></footer></article>)}</div></section>)}</div>
        </section>
      </div>
    </section>
  </main>;
}
