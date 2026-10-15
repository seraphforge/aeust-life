import type { FeedbackInput } from '../../../shared/feedback.ts';
import { validateFeedback } from '../../../shared/feedback.ts';
export type SubmitResult = { ok: boolean; message: string };
export async function submitFeedback(input: FeedbackInput, fetcher: typeof fetch = fetch): Promise<SubmitResult> {
  const validation = validateFeedback(input);
  if (!validation.ok) return { ok: false, message: validation.message };
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12_000);
  try {
    const response = await fetcher('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'omit',
      body: JSON.stringify(validation.value),
      signal: controller.signal,
    });
    if (response.status === 429) return { ok: false, message: '送得有點快，請至少等一分鐘後再試。你的內容還在。' };
    if (response.status === 400 || response.status === 413) return { ok: false, message: '請確認內容為 10–2000 字，且沒有不支援的字元。' };
    if (response.status !== 201) return { ok: false, message: '目前無法確認回饋已儲存。你的內容已保留，請稍後再試。' };
    const data: unknown = await response.json();
    if (typeof data !== 'object' || data === null || !('ok' in data) || data.ok !== true) throw new Error('unexpected_response');
    return { ok: true, message: '收到了，謝謝你！你的想法已儲存，會成為改進這裡的參考。' };
  } catch {
    return { ok: false, message: '連線中斷或服務尚未啟動，無法確認是否已儲存。內容已保留，請先稍候；重試可能造成重複回饋。' };
  } finally { clearTimeout(timeout); }
}
