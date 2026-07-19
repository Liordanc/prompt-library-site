# July 2026 recovery

Recovered from the owner's live July deployment and the repository's May source.

## Included

- RTL July library home with grouped categories, compact cards and responsive navigation.
- Search, category/favorite filters, sorting, direct copy, edit and open actions.
- Persistent CRUD adapter: Google Apps Script when `VITE_PROMPT_API_URL` is set; localStorage fallback otherwise.
- GAS implementation for list, create, update and delete against the existing `Prompts` sheet, with `Logs` entries.

## Google Apps Script connection

1. Paste `gas/Code.gs` into the Apps Script project bound to `Prompts Library -2026`.
2. Deploy as a Web App and copy its `/exec` URL.
3. Set `VITE_PROMPT_API_URL` to that URL and rebuild/redeploy the site.
