import { createClient } from "@supabase/supabase-js";
import fs from "fs";

// Read from env or assume local for script
const supabaseUrl = process.env.VITE_SUPABASE_URL || "http://127.0.0.1:54321";
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseKey) {
  console.error("Missing supabase key");
  process.exit(1);
}

const sb = createClient(supabaseUrl, supabaseKey);

async function run() {
  console.log("Seeding Semester 1 -> Computer Fundamentals -> Unit 1");

  // 1. Get Course (BCA)
  let { data: course } = await sb.from("courses").select("id").eq("slug", "bca").single();
  if (!course) {
    const { data: newCourse } = await sb.from("courses").insert({
      title: "Bachelor of Computer Applications",
      code: "BCA",
      slug: "bca",
      status: "published",
    }).select("id").single();
    course = newCourse;
  }

  // 2. Get Sem 1
  let { data: sem } = await sb.from("semesters").select("id").eq("course_id", course.id).eq("number", 1).single();
  if (!sem) {
    const { data: newSem } = await sb.from("semesters").insert({
      course_id: course.id,
      number: 1,
      title: "Semester 1",
      status: "published"
    }).select("id").single();
    sem = newSem;
  }

  // 3. Get Subject (BCA-101N)
  let { data: subject } = await sb.from("subjects").select("id").eq("semester_id", sem.id).eq("slug", "computer-fundamentals-and-pc-software").single();
  if (!subject) {
    const { data: newSubj } = await sb.from("subjects").insert({
      semester_id: sem.id,
      code: "BCA-101N",
      title: "Computer Fundamentals and PC Software",
      slug: "computer-fundamentals-and-pc-software",
      status: "published"
    }).select("id").single();
    subject = newSubj;
  }

  // 4. Get Unit 1
  let { data: unit } = await sb.from("units").select("id").eq("subject_id", subject.id).eq("number", 1).single();
  if (!unit) {
    const { data: newUnit } = await sb.from("units").insert({
      subject_id: subject.id,
      number: 1,
      title: "Introduction to Computer Systems",
      status: "published"
    }).select("id").single();
    unit = newUnit;
  }

  // 5. Seed Syllabus Topics for Pilot
  const pilotTopics = [
    "Introduction to Computers",
    "Characteristics of Computers",
    "Generations of Computers",
    "Types of Computers",
    "Applications of Computers"
  ];

  for (let i = 0; i < pilotTopics.length; i++) {
    const title = pilotTopics[i];
    const { data: existingTopic } = await sb.from("syllabus_topics").select("id").eq("unit_id", unit.id).eq("title", title).maybeSingle();
    if (!existingTopic) {
      await sb.from("syllabus_topics").insert({
        unit_id: unit.id,
        title,
        sort_order: i + 1,
        status: "published"
      });
      console.log(`Inserted topic: ${title}`);
    } else {
      console.log(`Topic already exists: ${title}`);
    }
  }

  console.log("Pilot seeding complete.");
}

run().catch(console.error);
