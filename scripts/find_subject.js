import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.VITE_SUPABASE_URL || "http://127.0.0.1:54321";
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const sb = createClient(supabaseUrl, supabaseKey);

async function run() {
  const unitId = "0985c212-df92-48df-8412-93e7de4c34c8";
  
  // Pilot topics
  const { data: topics, error: tErr } = await sb
    .from("syllabus_topics")
    .select("*")
    .eq("unit_id", unitId)
    .order("sort_order");
  console.log("=== 1. SYLLABUS TOPICS ===");
  console.log("Count:", topics?.length, tErr || "");
  console.log(topics?.map(t => ({ id: t.id, title: t.title, sort_order: t.sort_order })));

  const topicIds = topics?.map(t => t.id) || [];

  // Content items
  const { data: contentItems, error: ciErr } = await sb
    .from("content_items")
    .select("id, title, topic_id, type, unit_id")
    .in("topic_id", topicIds);
  console.log("\n=== 2. PILOT CONTENT_ITEMS ===");
  console.log("Count:", contentItems?.length, ciErr || "");
  console.log(contentItems);

  // Notes
  const { data: notes, error: nErr } = await sb
    .from("notes")
    .select("id, title, topic_id, unit_id, slug")
    .in("topic_id", topicIds);
  console.log("\n=== 3. PILOT NOTES ===");
  console.log("Count:", notes?.length, nErr || "");
  console.log(notes);

  // Quizzes
  const { data: quizzes, error: qErr } = await sb
    .from("quizzes")
    .select("id, title, topic_id, unit_id")
    .in("topic_id", topicIds);
  console.log("\n=== 4. PILOT QUIZZES ===");
  console.log("Count:", quizzes?.length, qErr || "");
  console.log(quizzes);

  const quizIds = quizzes?.map(q => q.id) || [];

  // Quiz questions
  let questions = [];
  if (quizIds.length > 0) {
    const { data: qs, error: qsErr } = await sb
      .from("quiz_questions")
      .select("id, quiz_id, prompt, order_index")
      .in("quiz_id", quizIds);
    questions = qs || [];
    console.log("\n=== 5. PILOT QUIZ QUESTIONS ===");
    console.log("Count:", questions.length, qsErr || "");
  } else {
    console.log("\n=== 5. PILOT QUIZ QUESTIONS ===");
    console.log("Count: 0 (no quizzes found)");
  }

  const questionIds = questions.map(q => q.id);

  // Quiz options
  if (questionIds.length > 0) {
    const { data: opts, error: optErr } = await sb
      .from("quiz_options")
      .select("id, question_id, text, is_correct")
      .in("question_id", questionIds);
    console.log("\n=== 6. PILOT QUIZ OPTIONS ===");
    console.log("Count:", opts?.length, optErr || "");
  } else {
    console.log("\n=== 6. PILOT QUIZ OPTIONS ===");
    console.log("Count: 0 (no questions found)");
  }

  // Legacy content check
  const { count: totalContent, error: cntErr } = await sb
    .from("content_items")
    .select("id", { count: "exact", head: true });
  console.log("\n=== 7. TOTAL CONTENT ITEMS IN DB ===");
  console.log("Total count:", totalContent, cntErr || "");

  const { data: unit1Legacy, error: u1Err } = await sb
    .from("content_items")
    .select("id, title, topic_id, type")
    .eq("unit_id", unitId)
    .is("topic_id", null);
  console.log("\n=== 8. LEGACY CONTENT IN UNIT 1 (topic_id IS NULL) ===");
  console.log("Count:", unit1Legacy?.length, u1Err || "");
  console.log(unit1Legacy);
}

run().catch(console.error);
