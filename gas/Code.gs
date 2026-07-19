const PROMPTS_SHEET = 'Prompts';

function doGet() {
  return jsonResponse_({ ok: true, data: listPrompts_() });
}

function doPost(e) {
  try {
    const body = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    const action = body.action;
    let data;
    if (action === 'listPrompts') data = listPrompts_();
    else if (action === 'createPrompt') data = createPrompt_(body.prompt);
    else if (action === 'updatePrompt') data = updatePrompt_(body.prompt);
    else if (action === 'deletePrompt') data = deletePrompt_(body.promptId);
    else throw new Error('Unknown action: ' + action);
    log_(action, body.promptId || (body.prompt && body.prompt.Prompt_ID), 'Success', '');
    return jsonResponse_({ ok: true, data: data });
  } catch (error) {
    log_('API_ERROR', '', 'Error', String(error));
    return jsonResponse_({ ok: false, error: String(error.message || error) });
  }
}

function listPrompts_() {
  const sheet = requiredSheet_(PROMPTS_SHEET);
  const values = sheet.getDataRange().getDisplayValues();
  if (values.length < 2) return [];
  const headers = values[0];
  return values.slice(1).filter(row => row.some(Boolean)).map(row => {
    const item = {};
    headers.forEach((header, index) => item[header] = row[index]);
    item.Tags = item.Tags ? item.Tags.split(',').map(tag => tag.trim()).filter(Boolean) : [];
    item.Is_Favorite = String(item.Is_Favorite).toLowerCase() === 'true';
    return item;
  });
}

function createPrompt_(prompt) {
  if (!prompt || !prompt.Prompt_ID || !prompt.Title) throw new Error('Prompt_ID and Title are required');
  const sheet = requiredSheet_(PROMPTS_SHEET);
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  if (findRow_(sheet, prompt.Prompt_ID) !== -1) throw new Error('Prompt_ID already exists');
  sheet.appendRow(headers.map(header => serialize_(header, prompt[header])));
  return prompt;
}

function updatePrompt_(prompt) {
  if (!prompt || !prompt.Prompt_ID) throw new Error('Prompt_ID is required');
  const sheet = requiredSheet_(PROMPTS_SHEET);
  const row = findRow_(sheet, prompt.Prompt_ID);
  if (row === -1) throw new Error('Prompt not found');
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  sheet.getRange(row, 1, 1, headers.length).setValues([headers.map(header => serialize_(header, prompt[header]))]);
  return prompt;
}

function deletePrompt_(promptId) {
  const sheet = requiredSheet_(PROMPTS_SHEET);
  const row = findRow_(sheet, promptId);
  if (row === -1) throw new Error('Prompt not found');
  sheet.deleteRow(row);
  return { Prompt_ID: promptId };
}

function findRow_(sheet, promptId) {
  if (sheet.getLastRow() < 2) return -1;
  const ids = sheet.getRange(2, 1, sheet.getLastRow() - 1, 1).getDisplayValues().flat();
  const index = ids.indexOf(String(promptId));
  return index === -1 ? -1 : index + 2;
}

function serialize_(header, value) {
  if (header === 'Tags' && Array.isArray(value)) return value.join(', ');
  if (header === 'Is_Favorite') return Boolean(value);
  return value == null ? '' : value;
}

function requiredSheet_(name) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(name);
  if (!sheet) throw new Error('Missing sheet: ' + name);
  return sheet;
}

function log_(action, entityId, status, message) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Logs');
  if (sheet) sheet.appendRow(['LOG-' + Date.now(), new Date(), action, 'Prompt', entityId || '', status, message || '']);
}

function jsonResponse_(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
}
