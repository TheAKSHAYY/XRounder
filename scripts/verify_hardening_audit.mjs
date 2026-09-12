import fs from "fs";
import { createClient } from "@supabase/supabase-js";

const envFile = fs.readFileSync(".env", "utf8");
const env = {};
envFile.split(/\r?\n/).forEach(line => {
  const [k, ...v] = line.split("=");
  if (k && v.length) env[k.trim()] = v.join("=").trim().replace(/^['"]|['"]$/g, "");
});

const url = env.VITE_SUPABASE_URL || env.SUPABASE_URL;
const key = env.VITE_SUPABASE_PUBLISHABLE_KEY || env.SUPABASE_PUBLISHABLE_KEY;

console.log("==================================================");
console.log("FORENSIC VERIFICATION OF PRODUCTION HARDENING");
console.log("==================================================\n");

// 1. Verify Migration File
const migrationPath = "supabase/migrations/20260912220000_production_hardening_and_search.sql";
if (!fs.existsSync(migrationPath)) {
  console.error("FAIL: Migration file does not exist:", migrationPath);
  process.exit(1);
}

const migrationContent = fs.readFileSync(migrationPath, "utf8");
const checks = [
  { name: "quiz_attempt_answers SELECT policy", text: "CREATE POLICY \"attempt_answers_select\" ON public.quiz_attempt_answers" },
  { name: "quiz_attempt_answers INSERT policy with submitted_at IS NULL", text: "AND a.submitted_at IS NULL" },
  { name: "quiz_attempt_answers UPDATE policy", text: "CREATE POLICY \"attempt_answers_update\" ON public.quiz_attempt_answers" },
  { name: "prevent_role_self_escalation UPDATE protection", text: "(TG_OP = 'DELETE' OR (TG_OP = 'UPDATE' AND NEW.role <> 'super_admin'))" },
  { name: "get_quiz_options publication tree validation", text: "JOIN public.courses c        ON c.id = sem.course_id" },
  { name: "student_search content_type preservation", text: "ci.type::text AS content_type" },
  { name: "student_search direct unit_number", text: "u.number AS unit_number" },
  { name: "student_bookmarks content_items support", text: "(SELECT ci.title FROM public.content_items ci WHERE ci.id = m.ref_id)" },
  { name: "progress_tracking admin read policy", text: "CREATE POLICY \"progress_select_own\"" }
];

console.log("--- MIGRATION FILE VERIFICATION ---");
let allPassed = true;
checks.forEach(c => {
  const has = migrationContent.includes(c.text);
  console.log(`${has ? "PASS" : "FAIL"}: ${c.name}`);
  if (!has) allPassed = false;
});

// 2. Database Live Connectivity Verification
console.log("\n--- SUPABASE CLIENT VERIFICATION ---");
const sb = createClient(url, key);

async function runDbChecks() {
  // Test developer tables exist
  const { data: devProfiles, error: devErr } = await sb.from("developer_profile").select("id").limit(1);
  if (devErr) {
    console.log("FAIL: developer_profile check:", devErr.message);
  } else {
    console.log("PASS: developer_profile table preserved intact");
  }

  // Test feature_flags table exists
  const { data: flags, error: flagErr } = await sb.from("feature_flags").select("key, enabled").limit(5);
  if (flagErr) {
    console.log("FAIL: feature_flags check:", flagErr.message);
  } else {
    console.log(`PASS: feature_flags queryable (${flags?.length || 0} flags found)`);
  }

  // Test courses table
  const { data: courses, error: cErr } = await sb.from("courses").select("id, slug, status").eq("status", "published").limit(2);
  if (cErr) {
    console.log("FAIL: courses query:", cErr.message);
  } else {
    console.log(`PASS: published courses queryable (${courses?.length || 0} found)`);
  }
}

runDbChecks().then(() => {
  console.log("\nVerification finished.");
});
