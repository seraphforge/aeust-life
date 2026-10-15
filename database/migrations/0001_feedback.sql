-- No IP, contact information, student ID or user account fields.
CREATE TABLE IF NOT EXISTS feedback (
  id TEXT PRIMARY KEY NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('idea', 'bug', 'other')),
  content TEXT NOT NULL CHECK (length(content) BETWEEN 10 AND 2000),
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
) STRICT;
