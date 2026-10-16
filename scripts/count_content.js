import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_PUBLISHABLE_KEY;

const sb = createClient(supabaseUrl, supabaseKey);

async function inspect() {
  const tables = ["content_items", "notes", "quiz_attempts", "progress_tracking", "quizzes", "quiz_questions"];
  for (const t of tables) {
    const { count, error } = await sb.from(t).select("*", { count: "exact", head: true });
    console.log(`${t}: ${count} rows (error: ${error ? error.message : "none"})`);
  }
}

inspect().catch(console.error);
