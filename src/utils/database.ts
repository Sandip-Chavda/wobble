import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("miley.db");

// Initialize a simple key-value table for state persistence
db.execSync(`
  CREATE TABLE IF NOT EXISTS kv_store (
    key TEXT PRIMARY KEY NOT NULL,
    value TEXT NOT NULL
  );
`);

export const setItem = (key: string, value: string) => {
  db.runSync(
    "INSERT OR REPLACE INTO kv_store (key, value) VALUES (?, ?)",
    key,
    value,
  );
};

export const getItem = (key: string): string | null => {
  const result = db.getFirstSync<{ value: string }>(
    "SELECT value FROM kv_store WHERE key = ?",
    key,
  );
  return result ? result.value : null;
};
