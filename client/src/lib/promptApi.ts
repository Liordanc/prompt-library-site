import type { Prompt } from "./data";

const STORAGE_KEY = "lior-prompt-library-v1";
const API_URL = (import.meta.env.VITE_PROMPT_API_URL || "").replace(/\/$/, "");

export type SyncMode = "google-sheets" | "local";

function readLocal(fallback: Prompt[]): Prompt[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function writeLocal(prompts: Prompt[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prompts));
}

async function request<T>(action: string, payload: Record<string, unknown> = {}): Promise<T> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ action, ...payload }),
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();
  if (data?.ok === false) throw new Error(data.error || "פעולת השרת נכשלה");
  return (data.data ?? data) as T;
}

export const promptApi = {
  mode: (API_URL ? "google-sheets" : "local") as SyncMode,

  async list(fallback: Prompt[]) {
    if (!API_URL) return readLocal(fallback);
    return request<Prompt[]>("listPrompts");
  },

  async create(prompt: Prompt, current: Prompt[]) {
    if (API_URL) return request<Prompt>("createPrompt", { prompt });
    writeLocal([prompt, ...current]);
    return prompt;
  },

  async update(prompt: Prompt, current: Prompt[]) {
    if (API_URL) return request<Prompt>("updatePrompt", { prompt });
    writeLocal(current.map(item => item.Prompt_ID === prompt.Prompt_ID ? prompt : item));
    return prompt;
  },

  async remove(id: string, current: Prompt[]) {
    if (API_URL) await request("deletePrompt", { promptId: id });
    else writeLocal(current.filter(item => item.Prompt_ID !== id));
  },
};
