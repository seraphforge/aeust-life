import { validateFeedback } from '../../../shared/feedback.ts';
import type { FeedbackInput } from '../../../shared/feedback.ts';
import { submitFeedback } from './submit-feedback.ts';

export function setupFeedbackForm() {
  const form = document.querySelector<HTMLFormElement>('#feedback-form');
  const content = document.querySelector<HTMLTextAreaElement>('#content');
  const count = document.querySelector<HTMLElement>('#content-count');
  const status = document.querySelector<HTMLElement>('#feedback-status');
  const button = document.querySelector<HTMLButtonElement>('#feedback-submit');
  if (!form || !content || !count || !status || !button) return;
  let pending = false;
  function updateCount() {
    if (count && content) count.textContent = `${[...content.value.trim()].length} / 2000 字`;
  }
  content.addEventListener('input', () => {
    updateCount();
    content.removeAttribute('aria-invalid');
  });
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (pending) return;
    const fields = new FormData(form);
    const input = { type: fields.get('type'), content: fields.get('content'), website: fields.get('website') };
    const validation = validateFeedback(input);
    if (!validation.ok) {
      status.textContent = validation.message;
      status.className = 'form-status error';
      content.setAttribute('aria-invalid', 'true');
      content.focus();
      return;
    }
    pending = true;
    button.disabled = true;
    button.textContent = '正在送出⋯';
    form.setAttribute('aria-busy', 'true');
    // Freeze the snapshot so success cannot erase text typed during the request.
    content.readOnly = true;
    form.querySelectorAll<HTMLInputElement>('input').forEach(input => { input.disabled = true; });
    status.className = 'form-status';
    status.textContent = '正在確認儲存結果⋯';
    try {
      const result = await submitFeedback(validation.value as FeedbackInput);
      status.textContent = result.message;
      status.className = result.ok ? 'form-status success' : 'form-status error';
      if (result.ok) { form.reset(); updateCount(); }
      status.focus();
    } finally {
      pending = false;
      button.disabled = false;
      button.textContent = '送出我的想法 ↗';
      content.readOnly = false;
      form.querySelectorAll<HTMLInputElement>('input').forEach(input => { input.disabled = false; });
      form.removeAttribute('aria-busy');
    }
  });
  // The HTML button starts disabled so failed/disabled JavaScript cannot submit natively.
  button.disabled = false;
}
