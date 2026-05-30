// ===== Prompt Library Data Model & Mock Data =====
// Design: Warm Workspace — Notion-Inspired Productivity
// All UI labels in Hebrew, technical identifiers in English

export interface Prompt {
  Prompt_ID: string;
  Title: string;
  Category: string;
  Subcategory: string;
  Description: string;
  Preview_Text: string;
  Full_Doc_Link: string;
  Tags: string[];
  Is_Favorite: boolean;
  Tool_Target: string;
  Prompt_Type: string;
  Status: string;
  Version: string;
  Created_At: string;
  Updated_At: string;
  Source: string;
  Notes: string;
}

export interface Category {
  Category_ID: string;
  Category: string;
  Description: string;
  Folder_Name: string;
  Prompt_Count: number;
}

export interface Subcategory {
  Subcategory_ID: string;
  Category: string;
  Subcategory: string;
  Description: string;
  Date_Created: string;
  Date_Modified: string;
}

export interface Tag {
  Tag_ID: string;
  Tag_Name: string;
  Tag_Color: string;
  Description: string;
  Date_Created: string;
  Date_Modified: string;
}

export interface PromptTag {
  Prompt_ID: string;
  Tag_ID: string;
  Date_Created: string;
}

export interface MigrationStep {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'error';
  phase: string;
}

// ===== Controlled Values =====
export const STATUSES = ['Active', 'Draft', 'Deprecated', 'Archived'] as const;
export const PROMPT_TYPES = ['System', 'Template', 'Audit', 'Research', 'Teaching', 'Design', 'Code', 'Workflow', 'General'] as const;
export const TOOL_TARGETS = ['ChatGPT', 'Gemini', 'Claude', 'General'] as const;

// ===== Hebrew Labels =====
export const LABELS: Record<string, string> = {
  Prompt_ID: 'מזהה',
  Title: 'כותרת',
  Category: 'קטגוריה',
  Subcategory: 'תת-קטגוריה',
  Description: 'תיאור',
  Preview_Text: 'תצוגה מקדימה',
  Full_Doc_Link: 'קישור למסמך',
  Tags: 'תגיות',
  Is_Favorite: 'מועדף',
  Tool_Target: 'כלי יעד',
  Prompt_Type: 'סוג פרומפט',
  Status: 'סטטוס',
  Version: 'גרסה',
  Created_At: 'נוצר בתאריך',
  Updated_At: 'עודכן בתאריך',
  Source: 'מקור',
  Notes: 'הערות',
};

export const STATUS_LABELS: Record<string, string> = {
  Active: 'פעיל',
  Draft: 'טיוטה',
  Deprecated: 'מיושן',
  Archived: 'בארכיון',
};

export const TYPE_LABELS: Record<string, string> = {
  System: 'מערכת',
  Template: 'תבנית',
  Audit: 'ביקורת',
  Research: 'מחקר',
  Teaching: 'הוראה',
  Design: 'עיצוב',
  Code: 'קוד',
  Workflow: 'תהליך עבודה',
  General: 'כללי',
};

export const TOOL_LABELS: Record<string, string> = {
  ChatGPT: 'ChatGPT',
  Gemini: 'Gemini',
  Claude: 'Claude',
  General: 'כללי',
};

// ===== Mock Categories =====
export const CATEGORIES: Category[] = [
  { Category_ID: 'cat-01', Category: 'קוד ופיתוח', Description: 'פרומפטים לפיתוח תוכנה וקוד', Folder_Name: '01 - קוד ופיתוח', Prompt_Count: 5 },
  { Category_ID: 'cat-02', Category: 'עיצוב וממשק', Description: 'פרומפטים לעיצוב UI/UX', Folder_Name: '02 - עיצוב וממשק', Prompt_Count: 3 },
  { Category_ID: 'cat-03', Category: 'מסמכים וסיכומים', Description: 'פרומפטים ליצירת מסמכים וסיכומים', Folder_Name: '03 - מסמכים וסיכומים', Prompt_Count: 4 },
  { Category_ID: 'cat-04', Category: 'הוראה ולמידה', Description: 'פרומפטים להוראה ולמידה', Folder_Name: '04 - הוראה ולמידה', Prompt_Count: 2 },
  { Category_ID: 'cat-05', Category: 'מחקר ואימות', Description: 'פרומפטים למחקר ואימות מידע', Folder_Name: '05 - מחקר ואימות', Prompt_Count: 3 },
  { Category_ID: 'cat-06', Category: 'ניהול עבודה', Description: 'פרומפטים לניהול משימות ופרויקטים', Folder_Name: '06 - ניהול עבודה', Prompt_Count: 2 },
  { Category_ID: 'cat-07', Category: 'כתיבת פרומפטים', Description: 'פרומפטים לכתיבה ושיפור פרומפטים', Folder_Name: '07 - כתיבת פרומפטים', Prompt_Count: 3 },
  { Category_ID: 'cat-08', Category: 'כללי', Description: 'פרומפטים כלליים', Folder_Name: '08 - כללי', Prompt_Count: 2 },
  { Category_ID: 'cat-99', Category: 'ארכיון', Description: 'פרומפטים שהועברו לארכיון', Folder_Name: '99 - ארכיון', Prompt_Count: 1 },
];

// ===== Mock Tags =====
export const TAGS: Tag[] = [
  { Tag_ID: 'tag-01', Tag_Name: 'SEO', Tag_Color: '#d97706', Description: 'קידום אתרים', Date_Created: '2024-01-15', Date_Modified: '2024-01-15' },
  { Tag_ID: 'tag-02', Tag_Name: 'רעיונות', Tag_Color: '#65a30d', Description: 'סיעור מוחות ורעיונות', Date_Created: '2024-01-15', Date_Modified: '2024-01-15' },
  { Tag_ID: 'tag-03', Tag_Name: 'דחוף', Tag_Color: '#dc2626', Description: 'פרומפטים בעדיפות גבוהה', Date_Created: '2024-02-01', Date_Modified: '2024-02-01' },
  { Tag_ID: 'tag-04', Tag_Name: 'JavaScript', Tag_Color: '#eab308', Description: 'פרומפטים ל-JavaScript', Date_Created: '2024-02-10', Date_Modified: '2024-02-10' },
  { Tag_ID: 'tag-05', Tag_Name: 'Python', Tag_Color: '#3b82f6', Description: 'פרומפטים ל-Python', Date_Created: '2024-03-01', Date_Modified: '2024-03-01' },
  { Tag_ID: 'tag-06', Tag_Name: 'תיעוד', Tag_Color: '#8b5cf6', Description: 'פרומפטים לתיעוד טכני', Date_Created: '2024-03-15', Date_Modified: '2024-03-15' },
  { Tag_ID: 'tag-07', Tag_Name: 'ביקורת קוד', Tag_Color: '#06b6d4', Description: 'פרומפטים לביקורת קוד', Date_Created: '2024-04-01', Date_Modified: '2024-04-01' },
  { Tag_ID: 'tag-08', Tag_Name: 'UX', Tag_Color: '#ec4899', Description: 'פרומפטים לחוויית משתמש', Date_Created: '2024-04-15', Date_Modified: '2024-04-15' },
];

// ===== Mock Prompts =====
export const PROMPTS: Prompt[] = [
  {
    Prompt_ID: 'PRM-001',
    Title: 'Deep Code Quality Audit',
    Category: 'קוד ופיתוח',
    Subcategory: 'ביקורת קוד',
    Description: 'פרומפט מקיף לביקורת איכות קוד מעמיקה הכוללת בדיקת ביצועים, אבטחה, תחזוקתיות וסגנון',
    Preview_Text: 'You are a senior code reviewer. Analyze the following code for: 1) Performance issues 2) Security vulnerabilities 3) Maintainability concerns 4) Style consistency...',
    Full_Doc_Link: 'https://docs.google.com/document/d/example1',
    Tags: ['ביקורת קוד', 'JavaScript'],
    Is_Favorite: true,
    Tool_Target: 'ChatGPT',
    Prompt_Type: 'Audit',
    Status: 'Active',
    Version: 'v2.1',
    Created_At: '2024-01-20',
    Updated_At: '2024-05-15',
    Source: 'מקורי',
    Notes: 'עובד מצוין עם GPT-4. להוסיף דוגמאות ספציפיות לשפה.',
  },
  {
    Prompt_ID: 'PRM-002',
    Title: 'React Component Generator',
    Category: 'קוד ופיתוח',
    Subcategory: 'יצירת קוד',
    Description: 'יצירת קומפוננטות React מודולריות עם TypeScript, hooks, ו-Tailwind CSS',
    Preview_Text: 'Generate a React component with the following specifications: - TypeScript with proper type definitions - Custom hooks for logic separation - Tailwind CSS for styling...',
    Full_Doc_Link: 'https://docs.google.com/document/d/example2',
    Tags: ['JavaScript', 'רעיונות'],
    Is_Favorite: true,
    Tool_Target: 'ChatGPT',
    Prompt_Type: 'Template',
    Status: 'Active',
    Version: 'v1.3',
    Created_At: '2024-02-05',
    Updated_At: '2024-04-20',
    Source: 'מקורי',
    Notes: '',
  },
  {
    Prompt_ID: 'PRM-003',
    Title: 'Technical Documentation Writer',
    Category: 'מסמכים וסיכומים',
    Subcategory: 'תיעוד טכני',
    Description: 'כתיבת תיעוד טכני מקצועי לפרויקטים ו-APIs',
    Preview_Text: 'You are a technical documentation specialist. Create comprehensive documentation for the following project/API that includes: Overview, Getting Started, API Reference...',
    Full_Doc_Link: 'https://docs.google.com/document/d/example3',
    Tags: ['תיעוד'],
    Is_Favorite: false,
    Tool_Target: 'Claude',
    Prompt_Type: 'Template',
    Status: 'Active',
    Version: 'v1.0',
    Created_At: '2024-03-01',
    Updated_At: '2024-03-01',
    Source: 'מותאם מ-GitHub',
    Notes: 'Claude מייצר תיעוד מפורט יותר.',
  },
  {
    Prompt_ID: 'PRM-004',
    Title: 'UX Research Interview Guide',
    Category: 'עיצוב וממשק',
    Subcategory: 'מחקר UX',
    Description: 'יצירת מדריך ראיונות למחקר חוויית משתמש',
    Preview_Text: 'Create a UX research interview guide for [product/feature]. Include: warm-up questions, core exploration questions, task-based scenarios, and wrap-up...',
    Full_Doc_Link: 'https://docs.google.com/document/d/example4',
    Tags: ['UX', 'רעיונות'],
    Is_Favorite: false,
    Tool_Target: 'General',
    Prompt_Type: 'Research',
    Status: 'Active',
    Version: 'v1.1',
    Created_At: '2024-03-10',
    Updated_At: '2024-04-05',
    Source: 'מקורי',
    Notes: '',
  },
  {
    Prompt_ID: 'PRM-005',
    Title: 'SEO Content Optimizer',
    Category: 'כתיבת פרומפטים',
    Subcategory: 'אופטימיזציה',
    Description: 'אופטימיזציה של תוכן לקידום אורגני במנועי חיפוש',
    Preview_Text: 'Analyze and optimize the following content for SEO. Focus on: keyword density, meta description, header structure, internal linking opportunities...',
    Full_Doc_Link: 'https://docs.google.com/document/d/example5',
    Tags: ['SEO'],
    Is_Favorite: true,
    Tool_Target: 'ChatGPT',
    Prompt_Type: 'Template',
    Status: 'Active',
    Version: 'v2.0',
    Created_At: '2024-01-25',
    Updated_At: '2024-05-01',
    Source: 'מקורי',
    Notes: 'לעדכן עם הנחיות Google 2024.',
  },
  {
    Prompt_ID: 'PRM-006',
    Title: 'Python Data Pipeline Builder',
    Category: 'קוד ופיתוח',
    Subcategory: 'ארכיטקטורה',
    Description: 'בניית צינורות נתונים ב-Python עם טיפול בשגיאות ולוגינג',
    Preview_Text: 'Design a Python data pipeline that: 1) Reads from [source] 2) Transforms data using [logic] 3) Validates output schema 4) Writes to [destination]...',
    Full_Doc_Link: 'https://docs.google.com/document/d/example6',
    Tags: ['Python'],
    Is_Favorite: false,
    Tool_Target: 'ChatGPT',
    Prompt_Type: 'Code',
    Status: 'Active',
    Version: 'v1.2',
    Created_At: '2024-04-01',
    Updated_At: '2024-05-10',
    Source: 'מקורי',
    Notes: '',
  },
  {
    Prompt_ID: 'PRM-007',
    Title: 'Meeting Summary Generator',
    Category: 'מסמכים וסיכומים',
    Subcategory: 'סיכומים',
    Description: 'יצירת סיכומי פגישות מובנים עם פעולות נדרשות',
    Preview_Text: 'Summarize the following meeting transcript into a structured format: Key Decisions, Action Items (with owners and deadlines), Discussion Points, Next Steps...',
    Full_Doc_Link: 'https://docs.google.com/document/d/example7',
    Tags: ['תיעוד'],
    Is_Favorite: false,
    Tool_Target: 'Gemini',
    Prompt_Type: 'Template',
    Status: 'Active',
    Version: 'v1.0',
    Created_At: '2024-04-15',
    Updated_At: '2024-04-15',
    Source: 'מקורי',
    Notes: 'Gemini טוב בסיכום שיחות ארוכות.',
  },
  {
    Prompt_ID: 'PRM-008',
    Title: 'Prompt Engineering Meta-Prompt',
    Category: 'כתיבת פרומפטים',
    Subcategory: 'מטא-פרומפטים',
    Description: 'פרומפט לשיפור ואופטימיזציה של פרומפטים קיימים',
    Preview_Text: 'You are a prompt engineering expert. Analyze the following prompt and improve it by: 1) Adding clear role definition 2) Structuring output format 3) Adding constraints...',
    Full_Doc_Link: 'https://docs.google.com/document/d/example8',
    Tags: ['רעיונות'],
    Is_Favorite: true,
    Tool_Target: 'Claude',
    Prompt_Type: 'System',
    Status: 'Active',
    Version: 'v3.0',
    Created_At: '2024-02-01',
    Updated_At: '2024-05-20',
    Source: 'מקורי',
    Notes: 'הפרומפט הכי שימושי בספרייה.',
  },
  {
    Prompt_ID: 'PRM-009',
    Title: 'Task Prioritization Framework',
    Category: 'ניהול עבודה',
    Subcategory: 'תעדוף',
    Description: 'מסגרת לתעדוף משימות לפי דחיפות, חשיבות והשפעה',
    Preview_Text: 'Help me prioritize the following tasks using the Eisenhower Matrix combined with impact scoring. For each task, determine: Urgency (1-5), Importance (1-5)...',
    Full_Doc_Link: 'https://docs.google.com/document/d/example9',
    Tags: ['דחוף'],
    Is_Favorite: false,
    Tool_Target: 'General',
    Prompt_Type: 'Workflow',
    Status: 'Active',
    Version: 'v1.0',
    Created_At: '2024-05-01',
    Updated_At: '2024-05-01',
    Source: 'מקורי',
    Notes: '',
  },
  {
    Prompt_ID: 'PRM-010',
    Title: 'Legacy API Migration Guide',
    Category: 'קוד ופיתוח',
    Subcategory: 'מיגרציה',
    Description: 'מדריך למיגרציה של API ישן לגרסה חדשה',
    Preview_Text: 'Create a migration guide from [old API] to [new API]. Include: breaking changes analysis, endpoint mapping, data transformation steps...',
    Full_Doc_Link: 'https://docs.google.com/document/d/example10',
    Tags: ['JavaScript', 'תיעוד'],
    Is_Favorite: false,
    Tool_Target: 'ChatGPT',
    Prompt_Type: 'Code',
    Status: 'Draft',
    Version: 'v0.5',
    Created_At: '2024-05-20',
    Updated_At: '2024-05-25',
    Source: 'מקורי',
    Notes: 'עדיין בפיתוח.',
  },
  {
    Prompt_ID: 'PRM-011',
    Title: 'Old Marketing Prompt',
    Category: 'ארכיון',
    Subcategory: '',
    Description: 'פרומפט שיווקי ישן שהוחלף',
    Preview_Text: 'Write a marketing copy for...',
    Full_Doc_Link: 'https://docs.google.com/document/d/example11',
    Tags: ['SEO'],
    Is_Favorite: false,
    Tool_Target: 'ChatGPT',
    Prompt_Type: 'General',
    Status: 'Archived',
    Version: 'v1.0',
    Created_At: '2023-11-01',
    Updated_At: '2024-03-01',
    Source: 'מקורי',
    Notes: 'הוחלף ב-PRM-005.',
  },
  {
    Prompt_ID: 'PRM-012',
    Title: 'Research Paper Analyzer',
    Category: 'מחקר ואימות',
    Subcategory: 'ניתוח מאמרים',
    Description: 'ניתוח מאמרים אקדמיים וחילוץ תובנות מרכזיות',
    Preview_Text: 'Analyze the following research paper and extract: Main thesis, Methodology, Key findings, Limitations, Practical implications, Citation-worthy quotes...',
    Full_Doc_Link: 'https://docs.google.com/document/d/example12',
    Tags: ['רעיונות', 'תיעוד'],
    Is_Favorite: false,
    Tool_Target: 'Claude',
    Prompt_Type: 'Research',
    Status: 'Active',
    Version: 'v1.1',
    Created_At: '2024-04-10',
    Updated_At: '2024-05-05',
    Source: 'מותאם',
    Notes: '',
  },
];

// ===== Migration Steps =====
export const MIGRATION_STEPS: MigrationStep[] = [
  { id: 1, title: 'גיבוי גיליון קיים', description: 'יצירת עותק גיבוי בשם: prompts Library - backup before restructure', status: 'completed', phase: 'Phase 1 — Backup' },
  { id: 2, title: 'סקירת גיליונות כפולים ומוסתרים', description: 'בדיקת כל הגיליונות הכפולים והמוסתרים ללא מחיקה', status: 'completed', phase: 'Phase 2 — Sheet Review' },
  { id: 3, title: 'שדרוג סכמת Prompts', description: 'עדכון גיליון Prompts לסכמה הנדרשת תוך שמירה על שדות קיימים', status: 'completed', phase: 'Phase 3 — Prompts Schema Upgrade' },
  { id: 4, title: 'שדרוג טקסונומיה', description: 'עדכון קטגוריות ויצירת תת-קטגוריות', status: 'in_progress', phase: 'Phase 4 — Taxonomy Upgrade' },
  { id: 5, title: 'סקירת תגיות', description: 'סקירת Tags ו-Prompt_Tags ושמירה על קשרים קיימים', status: 'pending', phase: 'Phase 5 — Tags Review' },
  { id: 6, title: 'יצירת תבנית Google Docs', description: 'יצירת תבנית מסמך פרומפט בשם: Prompt Template - Google Docs', status: 'pending', phase: 'Phase 6 — Google Docs Template' },
  { id: 7, title: 'בדיקת מסמך פרומפט ראשון', description: 'יצירת מסמך פרומפט לבדיקה ואימות תהליך מלא', status: 'pending', phase: 'Phase 7 — First Prompt Document Test' },
];

// ===== Subcategories =====
export const SUBCATEGORIES: Subcategory[] = [
  { Subcategory_ID: 'sub-01', Category: 'קוד ופיתוח', Subcategory: 'ביקורת קוד', Description: 'בדיקת איכות קוד', Date_Created: '2024-01-15', Date_Modified: '2024-01-15' },
  { Subcategory_ID: 'sub-02', Category: 'קוד ופיתוח', Subcategory: 'יצירת קוד', Description: 'יצירת קוד חדש', Date_Created: '2024-01-15', Date_Modified: '2024-01-15' },
  { Subcategory_ID: 'sub-03', Category: 'קוד ופיתוח', Subcategory: 'ארכיטקטורה', Description: 'תכנון ארכיטקטורת מערכת', Date_Created: '2024-01-15', Date_Modified: '2024-01-15' },
  { Subcategory_ID: 'sub-04', Category: 'קוד ופיתוח', Subcategory: 'מיגרציה', Description: 'מיגרציה ושדרוג', Date_Created: '2024-01-15', Date_Modified: '2024-01-15' },
  { Subcategory_ID: 'sub-05', Category: 'עיצוב וממשק', Subcategory: 'מחקר UX', Description: 'מחקר חוויית משתמש', Date_Created: '2024-01-15', Date_Modified: '2024-01-15' },
  { Subcategory_ID: 'sub-06', Category: 'עיצוב וממשק', Subcategory: 'עיצוב ויזואלי', Description: 'עיצוב גרפי וויזואלי', Date_Created: '2024-01-15', Date_Modified: '2024-01-15' },
  { Subcategory_ID: 'sub-07', Category: 'מסמכים וסיכומים', Subcategory: 'תיעוד טכני', Description: 'כתיבת תיעוד טכני', Date_Created: '2024-01-15', Date_Modified: '2024-01-15' },
  { Subcategory_ID: 'sub-08', Category: 'מסמכים וסיכומים', Subcategory: 'סיכומים', Description: 'סיכומי פגישות ותוכן', Date_Created: '2024-01-15', Date_Modified: '2024-01-15' },
  { Subcategory_ID: 'sub-09', Category: 'מחקר ואימות', Subcategory: 'ניתוח מאמרים', Description: 'ניתוח מאמרים אקדמיים', Date_Created: '2024-01-15', Date_Modified: '2024-01-15' },
  { Subcategory_ID: 'sub-10', Category: 'כתיבת פרומפטים', Subcategory: 'אופטימיזציה', Description: 'שיפור פרומפטים קיימים', Date_Created: '2024-01-15', Date_Modified: '2024-01-15' },
  { Subcategory_ID: 'sub-11', Category: 'כתיבת פרומפטים', Subcategory: 'מטא-פרומפטים', Description: 'פרומפטים על פרומפטים', Date_Created: '2024-01-15', Date_Modified: '2024-01-15' },
  { Subcategory_ID: 'sub-12', Category: 'ניהול עבודה', Subcategory: 'תעדוף', Description: 'תעדוף משימות ופרויקטים', Date_Created: '2024-01-15', Date_Modified: '2024-01-15' },
];
