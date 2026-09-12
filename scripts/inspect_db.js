import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing supabase URL or Key in env");
  process.exit(1);
}

const sb = createClient(supabaseUrl, supabaseKey);

async function run() {
  console.log("Fetching Courses...");
  const { data: courses } = await sb.from("courses").select("*");
  console.log(courses);

  if (courses && courses.length > 0) {
    const courseId = courses[0].id;
    console.log("\nFetching Semesters for Course:", courseId);
    const { data: semesters } = await sb.from("semesters").select("*").eq("course_id", courseId);
    console.log(semesters);

    if (semesters && semesters.length > 0) {
      const semId = semesters[0].id;
      console.log("\nFetching Subjects for Semester:", semId);
      const { data: subjects } = await sb.from("subjects").select("*").eq("semester_id", semId);
      console.log(subjects);

      if (subjects && subjects.length > 0) {
        // Find computer fundamentals
        const subject = subjects.find(s => s.code === 'BCA-101N' || s.title.includes('Fundamentals') || s.slug.includes('fundamentals'));
        if (subject) {
          console.log("\nFetching Units for Subject:", subject.id);
          const { data: units } = await sb.from("units").select("*").eq("subject_id", subject.id);
          console.log(units);
        } else {
            console.log("\nCould not find Computer Fundamentals subject!");
        }
      }
    }
  }
}

run().catch(console.error);
