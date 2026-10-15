// Minimal structural contracts shared by Workers and the local SQLite test adapter.
// Deployment bindings are configured in wrangler.jsonc; no Node APIs in production.
export interface PreparedStatement {
  bind(...values: (string | number | null)[]): PreparedStatement;
  run(): Promise<{ success: boolean }>;
}
export interface FeedbackDatabase { prepare(sql: string): PreparedStatement }
export interface RateLimiter { limit(options: { key: string }): Promise<{ success: boolean }> }
export interface Env {
  DB: FeedbackDatabase;
  ALLOWED_ORIGINS: string;
  ENVIRONMENT: 'local' | 'production';
  FEEDBACK_LIMITER: RateLimiter;
  GLOBAL_LIMITER: RateLimiter;
}
