export const feedbackTypes = ['idea', 'bug', 'other'] as const;
export type FeedbackType = typeof feedbackTypes[number];
export interface FeedbackInput { type: FeedbackType; content: string; website: string }
export type ValidationResult = { ok: true; value: FeedbackInput } | { ok: false; message: string };
export function validateFeedback(input: unknown): ValidationResult {
  const invalid = { ok: false, message: '請確認回饋類型與內容，內容需為 10–2000 字。' } as const;
  if (typeof input !== 'object' || input === null || Array.isArray(input)) return invalid;
  const value = input as Record<string, unknown>;
  if (Object.keys(value).length !== 3 || Object.keys(value).some(key => !['type', 'content', 'website'].includes(key))) return invalid;
  if (!feedbackTypes.includes(value.type as FeedbackType) || typeof value.content !== 'string' || value.website !== '') return invalid;
  const content = value.content.trim();
  const length = [...content].length;
  if (length < 10 || length > 2000 || !content.isWellFormed() || /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/u.test(content)) return invalid;
  return { ok: true, value: { type: value.type as FeedbackType, content, website: '' } };
}
