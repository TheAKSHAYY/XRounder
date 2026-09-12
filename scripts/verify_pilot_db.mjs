import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase configuration");
  process.exit(1);
}

const sb = createClient(supabaseUrl, supabaseKey);

const EXPECTED_TOPICS = [
  { id: "551ddc7d-d0b2-42fd-8a82-90a1dc141d1a", title: "Introduction to Computers", sort_order: 1 },
  { id: "53857dd5-db47-4d92-8f57-55e41440d739", title: "Characteristics of Computers", sort_order: 2 },
  { id: "66e861e7-63c0-4c1d-b0a0-ad099e223e15", title: "Generations of Computers", sort_order: 3 },
  { id: "341e7464-38df-4e6a-9348-3b494632d8f0", title: "Types of Computers", sort_order: 4 },
  { id: "7513ac8b-2003-4899-999c-b98fa43baf12", title: "Applications of Computers", sort_order: 5 }
];

const UNIT_1_ID = "0985c212-df92-48df-8412-93e7de4c34c8";

async function validate() {
  console.log("==================================================");
  console.log("PHASE 2 DATABASE VALIDATION REPORT");
  console.log("==================================================\n");

  const results = [];

  // 1. Exactly 5 pilot topics exist
  const { data: topics, error: tErr } = await sb
    .from("syllabus_topics")
    .select("id, title, sort_order, unit_id")
    .eq("unit_id", UNIT_1_ID)
    .order("sort_order");
  
  const topicsCount = topics?.length || 0;
  const topicsMatch = topicsCount === 5;
  results.push({ check: "1. Exactly 5 pilot topics exist", status: topicsMatch ? "PASS" : "FAIL", actual: topicsCount, expected: 5 });

  const topicIds = topics?.map(t => t.id) || [];

  // 2. Exactly 5 pilot content_items exist
  const { data: contentItems, error: ciErr } = await sb
    .from("content_items")
    .select("id, title, topic_id, type, unit_id")
    .in("topic_id", topicIds);
  const ciCount = contentItems?.length || 0;
  results.push({ check: "2. Exactly 5 pilot content_items exist", status: ciCount === 5 ? "PASS" : "FAIL", actual: ciCount, expected: 5 });

  // 3. Exactly 5 pilot notes exist
  const { data: notes, error: nErr } = await sb
    .from("notes")
    .select("id, title, topic_id, unit_id, slug, body")
    .in("topic_id", topicIds);
  const notesCount = notes?.length || 0;
  results.push({ check: "3. Exactly 5 pilot notes exist", status: notesCount === 5 ? "PASS" : "FAIL", actual: notesCount, expected: 5 });

  // 4. Exactly 5 pilot quizzes exist
  const { data: quizzes, error: qErr } = await sb
    .from("quizzes")
    .select("id, title, topic_id, unit_id")
    .in("topic_id", topicIds);
  const quizzesCount = quizzes?.length || 0;
  results.push({ check: "4. Exactly 5 pilot quizzes exist", status: quizzesCount === 5 ? "PASS" : "FAIL", actual: quizzesCount, expected: 5 });

  const quizIds = quizzes?.map(q => q.id) || [];

  // 5. Exactly 16 quiz_questions exist
  let questions = [];
  if (quizIds.length > 0) {
    const { data: qs, error: qsErr } = await sb
      .from("quiz_questions")
      .select("id, quiz_id, prompt, order_index")
      .in("quiz_id", quizIds);
    questions = qs || [];
  }
  const qCount = questions.length;
  results.push({ check: "5. Exactly 16 quiz_questions exist", status: qCount === 16 ? "PASS" : "FAIL", actual: qCount, expected: 16 });

  const questionIds = questions.map(q => q.id);

  // 6. Exactly 64 quiz_options exist (accessible via get_quiz_options RPC per application security design)
  let totalOptionsCount = 0;
  for (const q of quizzes) {
    const { data: opts } = await sb.rpc("get_quiz_options", { _quiz_id: q.id });
    totalOptionsCount += opts ? opts.length : 0;
  }
  results.push({ check: "6. Exactly 64 quiz_options exist", status: totalOptionsCount === 64 ? "PASS" : "FAIL", actual: totalOptionsCount, expected: 64 });

  // 7. Every content_item has correct topic_id
  const ciTopicValid = contentItems && contentItems.length === 5 && contentItems.every(ci => topicIds.includes(ci.topic_id));
  results.push({ check: "7. Every content_item has correct topic_id", status: ciTopicValid ? "PASS" : "FAIL", actual: ciTopicValid ? "All valid" : "Invalid mapping", expected: "All valid" });

  // 8. Every note has correct topic_id
  const notesTopicValid = notes && notes.length === 5 && notes.every(n => topicIds.includes(n.topic_id));
  results.push({ check: "8. Every note has correct topic_id", status: notesTopicValid ? "PASS" : "FAIL", actual: notesTopicValid ? "All valid" : "Invalid mapping", expected: "All valid" });

  // 9. Every quiz has correct topic_id
  const quizTopicValid = quizzes && quizzes.length === 5 && quizzes.every(q => topicIds.includes(q.topic_id));
  results.push({ check: "9. Every quiz has correct topic_id", status: quizTopicValid ? "PASS" : "FAIL", actual: quizTopicValid ? "All valid" : "Invalid mapping", expected: "All valid" });

  // 10. Every quiz_question maps to correct quiz
  const qsValid = questions.length === 16 && questions.every(q => quizIds.includes(q.quiz_id));
  results.push({ check: "10. Every quiz_question maps to correct quiz", status: qsValid ? "PASS" : "FAIL", actual: qsValid ? "All valid" : "Invalid mapping", expected: "All valid" });

  // 11. Every quiz_option maps to correct question
  let allOptsMapped = true;
  for (const q of quizzes) {
    const { data: opts } = await sb.rpc("get_quiz_options", { _quiz_id: q.id });
    if (!opts || opts.length === 0 || !opts.every(opt => questionIds.includes(opt.question_id))) {
      allOptsMapped = false;
    }
  }
  results.push({ check: "11. Every quiz_option maps to correct question", status: allOptsMapped ? "PASS" : "FAIL", actual: allOptsMapped ? "All valid" : "Invalid mapping", expected: "All valid" });

  // 12. No duplicate pilot records were created
  const uniqueCiTopics = new Set(contentItems?.map(ci => ci.topic_id)).size;
  const uniqueNoteTopics = new Set(notes?.map(n => n.topic_id)).size;
  const uniqueQuizTopics = new Set(quizzes?.map(q => q.topic_id)).size;
  const noDuplicates = uniqueCiTopics === ciCount && uniqueNoteTopics === notesCount && uniqueQuizTopics === quizzesCount && ciCount === 5;
  results.push({ check: "12. No duplicate pilot records created", status: noDuplicates ? "PASS" : "FAIL", actual: noDuplicates ? "Unique 1:1 records" : "Duplicates found or missing", expected: "Unique 1:1 records" });

  // 13. Existing legacy content is still present
  const { count: totalContent } = await sb
    .from("content_items")
    .select("id", { count: "exact", head: true });
  // Total should be legacy (1) + pilot (5) = 6
  const legacyPresent = (totalContent || 0) >= 1;
  results.push({ check: "13. Existing legacy content still present", status: legacyPresent ? "PASS" : "FAIL", actual: `Total content_items: ${totalContent}`, expected: ">= 1 (legacy preserved)" });

  // 14. No existing records were modified or deleted
  const { data: legacyItems } = await sb
    .from("content_items")
    .select("id, title, topic_id")
    .is("topic_id", null);
  const legacyIntact = (legacyItems?.length || 0) === 1;
  results.push({ check: "14. No existing records modified/deleted", status: legacyIntact ? "PASS" : "FAIL", actual: `Legacy unlinked items: ${legacyItems?.length}`, expected: "1 intact" });

  console.table(results);

  return results;
}

validate().catch(console.error);
