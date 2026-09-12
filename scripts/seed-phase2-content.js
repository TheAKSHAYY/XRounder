import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.VITE_SUPABASE_URL || "http://127.0.0.1:54321";
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseKey) {
  console.error("Missing supabase key");
  process.exit(1);
}

const sb = createClient(supabaseUrl, supabaseKey);

const topicData = [
  {
    title: "Introduction to Computers",
    noteMarkdown: `
# Introduction to Computers

## Learning Objectives
- Understand the basic definition of a computer.
- Identify the core components that make up a computer system.
- Trace the flow of information through the IPO (Input-Process-Output) cycle.

## Introduction
A computer is an advanced electronic device that takes raw data as input from the user, processes it under the control of a set of instructions (called a program), produces a result (output), and saves it for future use. The word "computer" comes from the Latin word "computare", which means to calculate or compute.

## Core Concepts
At its fundamental level, every computer operates on the **IPO Cycle**:
1. **Input**: Data or instructions entered into the computer.
2. **Process**: The manipulation of data according to given instructions, primarily done by the Central Processing Unit (CPU).
3. **Output**: The processed data presented to the user as meaningful information.

## Important Definitions
- **Data**: Unprocessed, raw facts and figures. It has no inherent meaning until processed.
- **Information**: Data that has been processed, organized, and structured in a meaningful way.
- **Hardware**: The physical, tangible parts of a computer system.
- **Software**: The set of instructions, programs, or data that tell the computer what to do.

## Detailed Explanation
The computer acts as a data processing machine. It does not possess independent cognition; instead, it operates precisely based on programmed logic provided by human developers. When a user inputs data (for instance, typing numbers on a keyboard), the software instructs the hardware on how to manipulate that data. The CPU executes these instructions mathematically and logically, and the resulting processed data is outputted to a screen or printer. This systematic procedure is what makes computing reliable and reproducible.

## Examples
- **Input Example**: Scanning a barcode at a supermarket.
- **Process Example**: The computer looking up the barcode in the database and calculating the total price.
- **Output Example**: Printing the receipt for the customer.

## Key Points
- A computer is an electronic machine that processes raw data into meaningful information.
- It operates on the Input-Process-Output (IPO) model.
- Computers execute tasks based on programmed logic rather than independent thought.

## Quick Revision
Remember the IPO cycle: Input (raw data) $\\rightarrow$ Process (CPU execution) $\\rightarrow$ Output (meaningful information). Hardware is what you can touch; software is the instructions running on it.

## Practice Questions
1. Define a computer and explain the origin of the word.
2. Differentiate between data and information with an example.
3. Describe the IPO cycle using a real-world scenario.
`,
    quiz: {
      title: "Quiz: Introduction to Computers",
      description: "Test your fundamental knowledge of what a computer is and how it processes data.",
      questions: [
        {
          prompt: "What does the IPO cycle stand for?",
          explanation: "The fundamental operation of a computer is based on Input, Process, and Output.",
          options: [
            { text: "Information-Processing-Output", is_correct: false },
            { text: "Input-Process-Output", is_correct: true },
            { text: "Input-Program-Output", is_correct: false },
            { text: "Instruction-Process-Operation", is_correct: false }
          ]
        },
        {
          prompt: "Which of the following best describes 'Information'?",
          explanation: "Information is processed data that has meaning and context.",
          options: [
            { text: "Raw facts and figures", is_correct: false },
            { text: "The physical components of a computer", is_correct: false },
            { text: "Processed data that is meaningful", is_correct: true },
            { text: "A set of instructions given to the computer", is_correct: false }
          ]
        },
        {
          prompt: "What is the primary function of a computer program?",
          explanation: "A program provides the set of instructions the computer follows to process data.",
          options: [
            { text: "To store physical data", is_correct: false },
            { text: "To provide instructions for processing data", is_correct: true },
            { text: "To display output on the screen", is_correct: false },
            { text: "To cool down the CPU", is_correct: false }
          ]
        }
      ]
    }
  },
  {
    title: "Characteristics of Computers",
    noteMarkdown: `
# Characteristics of Computers

## Learning Objectives
- Identify the key characteristics that make computers indispensable.
- Understand the concepts of speed, accuracy, diligence, versatility, and memory.

## Introduction
The rapid adoption of computers across all sectors of society is due to their powerful characteristics. They are not just fast calculators; they possess unique attributes that allow them to perform complex tasks flawlessly over extended periods.

## Core Concepts
The defining traits of modern computing systems include:
1. **Speed**: Performing millions of instructions per second.
2. **Accuracy**: Executing instructions precisely as written.
3. **Diligence**: Working continuously without fatigue.
4. **Versatility**: Adapting to completely different tasks.
5. **Memory**: Storing and retrieving data on demand.

## Important Definitions
- **GIGO (Garbage In, Garbage Out)**: A concept stating that flawed, or nonsense input data produces nonsense output.
- **Microsecond**: One-millionth of a second ($10^{-6}$).
- **Nanosecond**: One-billionth of a second ($10^{-9}$).

## Detailed Explanation
A computer's effectiveness stems from its combination of speed and accuracy. While humans might make calculation errors when fatigued, a computer exhibits **diligence**, meaning it performs repetitive tasks with the exact same precision on the millionth iteration as it did on the first. 

Furthermore, computers are highly **versatile**. A single machine can route network traffic, render video game graphics, and calculate complex spreadsheets simply by loading different software. 

Finally, a computer possesses **memory** or storage capacity. Unlike human memory, which can fade or alter over time, digital storage retains data exactly as it was written until it is intentionally deleted, overwritten, or compromised by hardware failure. This allows for massive amounts of information to be reliably retrieved at a later date.

## Examples
- **Speed**: Weather forecasting systems analyzing millions of data points in seconds.
- **Versatility**: A smartphone acting as a camera, a calculator, a web browser, and a phone.
- **Accuracy**: Banking software correctly transferring exact funds without mathematical error.

## Key Points
- Speed is measured in fractions of a second (micro/nano/pico-seconds).
- Accuracy is dependent on correct input (GIGO).
- Diligence ensures consistent performance without human fatigue.
- Memory allows precise storage and retrieval of digital information.

## Quick Revision
Computers are fast (speed), correct (accuracy), tireless (diligence), multi-purpose (versatility), and capable of retaining data reliably (memory).

## Practice Questions
1. Elaborate on the 'Diligence' and 'Versatility' characteristics of a computer.
2. What does GIGO stand for, and how does it relate to computer accuracy?
3. Explain how computer memory differs from human memory in terms of data retrieval.
`,
    quiz: {
      title: "Quiz: Characteristics of Computers",
      description: "Assess your understanding of the core characteristics that define modern computers.",
      questions: [
        {
          prompt: "The term GIGO (Garbage In, Garbage Out) is related to which characteristic of computers?",
          explanation: "GIGO relates to accuracy. The computer produces accurate output as long as the input and instructions are accurate.",
          options: [
            { text: "Speed", is_correct: false },
            { text: "Accuracy", is_correct: true },
            { text: "Diligence", is_correct: false },
            { text: "Versatility", is_correct: false }
          ]
        },
        {
          prompt: "Which characteristic means that a computer is free from tiredness and lack of concentration?",
          explanation: "Diligence refers to the computer's ability to perform repetitive tasks without losing focus or experiencing fatigue.",
          options: [
            { text: "Versatility", is_correct: false },
            { text: "Diligence", is_correct: true },
            { text: "Memory", is_correct: false },
            { text: "Automation", is_correct: false }
          ]
        },
        {
          prompt: "A computer's ability to perform completely different types of tasks one after another is called:",
          explanation: "Versatility is the ability of a computer to adapt to many different functions or activities.",
          options: [
            { text: "Versatility", is_correct: true },
            { text: "Diligence", is_correct: false },
            { text: "Reliability", is_correct: false },
            { text: "Accuracy", is_correct: false }
          ]
        }
      ]
    }
  },
  {
    title: "Generations of Computers",
    noteMarkdown: `
# Generations of Computers

## Learning Objectives
- Trace the historical evolution of computers.
- Identify the key electronic components that define traditional generations.
- Understand how physical size, speed, and capabilities improved over time.

## Introduction
The history of computer hardware development is traditionally taught by dividing it into distinct "generations." Each of these generations is characterized by a major technological shift in the core electronic components that fundamentally changed the way computers operate.

## Core Concepts
The traditional textbook classification outlines five generations:
1. **First Generation**: Defined by Vacuum Tubes.
2. **Second Generation**: Defined by Transistors.
3. **Third Generation**: Defined by Integrated Circuits (ICs).
4. **Fourth Generation**: Defined by Microprocessors.
5. **Fifth Generation**: Associated with Artificial Intelligence and advanced parallel processing.

## Important Definitions
- **Vacuum Tube**: An early electronic device that controlled electric current through a vacuum in a sealed glass container.
- **Transistor**: A semiconductor device used to amplify or switch electrical signals, replacing vacuum tubes.
- **Integrated Circuit (IC)**: A set of electronic circuits on one small flat piece of semiconductor material (silicon).
- **Microprocessor**: A computer processor where the data processing logic and control is included on a single integrated circuit.

## Detailed Explanation

### First Generation (approx. 1940s - 1950s)
Early computers like the ENIAC and UNIVAC relied on **vacuum tubes** for circuitry and magnetic drums for memory. These machines were enormous, filling entire rooms. They consumed vast amounts of electricity, generated significant heat, and experienced frequent hardware failures.

### Second Generation (approx. late 1950s - mid 1960s)
The invention of the **transistor** revolutionized computing. Transistors were much smaller, faster, cheaper, and more reliable than vacuum tubes. This era also saw the transition from binary machine language to symbolic assembly languages, making programming slightly easier.

### Third Generation (approx. mid 1960s - early 1970s)
Transistors were miniaturized and placed on silicon chips, creating **Integrated Circuits (ICs)**. This drastically reduced the physical size of computers while increasing their processing power. Users interacted with these computers using keyboards and monitors rather than punched cards, and early operating systems allowed multiple applications to run.

### Fourth Generation (approx. 1970s onwards)
The development of the **Microprocessor** brought thousands of integrated circuits onto a single silicon chip. What used to take up an entire room could now fit on a desk, leading to the rise of Personal Computers (PCs). This era popularized graphical user interfaces (GUIs), the mouse, and eventually the internet.

### Fifth Generation (Conceptual / Modern Era)
In academic contexts, the fifth generation is often characterized by the integration of **Artificial Intelligence (AI)**, ultra-large-scale integration (ULSI), and parallel processing. Technologies like machine learning, natural language processing, and quantum computing represent the aspirations of this advanced computing paradigm.

## Examples
- **First Generation**: ENIAC (Electronic Numerical Integrator and Computer).
- **Second Generation**: IBM 1620.
- **Third Generation**: IBM 360 series.
- **Fourth Generation**: Early Apple Macintosh and IBM PCs.

## Key Points
- As generations progressed, physical size and power consumption decreased.
- Concurrently, processing speed, memory capacity, and reliability increased exponentially.
- The shift from vacuum tubes to solid-state silicon (transistors and ICs) is the most critical turning point in computer history.

## Quick Revision
Vacuum Tubes $\\rightarrow$ Transistors $\\rightarrow$ Integrated Circuits $\\rightarrow$ Microprocessors $\\rightarrow$ AI & Parallel Processing.

## Practice Questions
1. Explain the primary technological difference between first and second-generation computers.
2. What role did the Integrated Circuit play in the physical evolution of computers?
3. Discuss the traditional characteristics associated with fifth-generation computing.
`,
    quiz: {
      title: "Quiz: Generations of Computers",
      description: "Test your knowledge of the historical evolution of computer technology.",
      questions: [
        {
          prompt: "Which electronic component was primarily used in First Generation computers?",
          explanation: "First-generation computers relied on vacuum tubes for circuitry.",
          options: [
            { text: "Transistors", is_correct: false },
            { text: "Vacuum Tubes", is_correct: true },
            { text: "Integrated Circuits", is_correct: false },
            { text: "Microprocessors", is_correct: false }
          ]
        },
        {
          prompt: "The invention of the Integrated Circuit (IC) defined which generation of computers in traditional classification?",
          explanation: "Third-generation computers were characterized by the use of Integrated Circuits.",
          options: [
            { text: "Second Generation", is_correct: false },
            { text: "Third Generation", is_correct: true },
            { text: "Fourth Generation", is_correct: false },
            { text: "Fifth Generation", is_correct: false }
          ]
        },
        {
          prompt: "In textbook classifications, Artificial Intelligence and advanced parallel processing are most closely associated with which computer generation?",
          explanation: "The fifth generation concept focuses on AI and advanced hardware technologies.",
          options: [
            { text: "Third Generation", is_correct: false },
            { text: "Fourth Generation", is_correct: false },
            { text: "Fifth Generation", is_correct: true },
            { text: "Second Generation", is_correct: false }
          ]
        },
        {
          prompt: "ENIAC is an example of a computer from which generation?",
          explanation: "ENIAC (Electronic Numerical Integrator and Computer) was one of the earliest first-generation computers.",
          options: [
            { text: "First Generation", is_correct: true },
            { text: "Second Generation", is_correct: false },
            { text: "Third Generation", is_correct: false },
            { text: "Fourth Generation", is_correct: false }
          ]
        }
      ]
    }
  },
  {
    title: "Types of Computers",
    noteMarkdown: `
# Types of Computers

## Learning Objectives
- Classify computers based on their operating principles (Data Handling).
- Classify computers based on their historical size and processing capability.

## Introduction
Computers come in various sizes, shapes, and functionalities. To better understand the landscape of computing devices, they are broadly classified into different types based on how they process data natively, and historically by their physical size and processing power.

## Core Concepts
Computers are categorized using two main frameworks:
1. **By Data Handling**: Analog, Digital, and Hybrid.
2. **By Size/Capacity**: Microcomputers, Minicomputers, Mainframes, and Supercomputers.

## Important Definitions
- **Discrete Data**: Data that can only take specific, distinct values (like 0s and 1s).
- **Continuous Data**: Data that can take any value within a range (like temperature or fluid pressure).

## Detailed Explanation

### Classification Based on Data Handling

1. **Analog Computers**: These machines handle continuous, varying data. Instead of counting discrete numbers, they measure physical quantities (such as voltage, pressure, or rotation) and represent data via continuous signals. 
2. **Digital Computers**: These process data in discrete, binary form (0s and 1s). They are highly accurate, versatile, and represent the vast majority of computers used today (including modern desktops, laptops, and smartphones).
3. **Hybrid Computers**: These systems combine features of both analog and digital computing. They typically use analog components to measure real-world physical continuous signals and convert them into digital discrete data for complex logical processing.

### Classification Based on Size and Capacity

1. **Microcomputers**: Small, relatively inexpensive computers designed for individual use. They utilize a single microprocessor.
2. **Minicomputers**: Historically, minicomputers were mid-sized machines that filled the gap between single-user microcomputers and massive mainframes. In the 1970s and 80s, they supported multiple users simultaneously in small businesses. Today, this specific category name is mostly historical, replaced by modern mid-range servers.
3. **Mainframe Computers**: Very large, expensive, and reliable computers capable of supporting thousands of concurrent users. They are designed to handle massive amounts of transaction data with extreme stability.
4. **Supercomputers**: The fastest, most powerful computers designed specifically for calculation-intensive tasks rather than transaction processing. They employ massive parallel processing architectures.

## Examples
- **Analog**: Traditional mechanical speedometers, older analog flight simulators.
- **Hybrid**: Modern patient monitoring systems (e.g., advanced ECG machines that use analog sensors to read continuous electrical signals from the heart, and digital processors to analyze and display the results).
- **Mainframe**: Core banking systems processing thousands of ATM transactions simultaneously.
- **Supercomputer**: Systems used for simulating weather patterns, nuclear research, or molecular modeling.

## Key Points
- Digital computers count; analog computers measure.
- Hybrid systems bridge the gap between continuous real-world signals and digital logic.
- Supercomputers focus on calculation speed (FLOPs), while Mainframes focus on transactional throughput and reliability.

## Quick Revision
- **Data**: Analog (continuous), Digital (discrete), Hybrid (both).
- **Size**: Micro (personal), Mini (historical mid-range), Mainframe (enterprise transactions), Supercomputer (scientific calculations).

## Practice Questions
1. Explain how a hybrid computer differs from a purely digital computer, providing a relevant example.
2. Discuss the historical context of the "Minicomputer" category.
3. Contrast a Mainframe computer with a Supercomputer in terms of their primary use cases.
`,
    quiz: {
      title: "Quiz: Types of Computers",
      description: "Evaluate your understanding of how computers are classified by size and data processing methods.",
      questions: [
        {
          prompt: "A computer system that utilizes analog sensors to measure continuous physical data, but processes that data digitally, is best classified as:",
          explanation: "Hybrid computers combine analog measurement components with digital processing components.",
          options: [
            { text: "A supercomputer", is_correct: false },
            { text: "A hybrid computer", is_correct: true },
            { text: "A mainframe computer", is_correct: false },
            { text: "A minicomputer", is_correct: false }
          ]
        },
        {
          prompt: "Which type of computer is primarily designed for extremely complex scientific calculations like global weather modeling?",
          explanation: "Supercomputers possess the massive parallel processing power required for complex simulations.",
          options: [
            { text: "Mainframe", is_correct: false },
            { text: "Supercomputer", is_correct: true },
            { text: "Minicomputer", is_correct: false },
            { text: "Microcomputer", is_correct: false }
          ]
        },
        {
          prompt: "A standard modern desktop PC or laptop falls under which historical classification category?",
          explanation: "Desktop PCs and laptops are designed for individual use using a microprocessor, classifying them as microcomputers.",
          options: [
            { text: "Minicomputer", is_correct: false },
            { text: "Microcomputer", is_correct: true },
            { text: "Mainframe", is_correct: false },
            { text: "Hybrid computer", is_correct: false }
          ]
        }
      ]
    }
  },
  {
    title: "Applications of Computers",
    noteMarkdown: `
# Applications of Computers

## Learning Objectives
- Explore the diverse fields where computers are heavily utilized.
- Understand the specific roles computers play in education, business, healthcare, and science.
- Analyze the impact of computerization on daily workflows.

## Introduction
In the modern era, computers have permeated almost every aspect of human life. They have transformed from specialized military and scientific calculators into universal tools that drive how we work, learn, communicate, and entertain ourselves.

## Core Concepts
The integration of computers across various domains relies on three primary capabilities:
1. **Rapid Data Processing**: Automating repetitive tasks quickly.
2. **Massive Data Storage**: Organizing and retrieving large datasets safely.
3. **Global Connectivity**: Facilitating instantaneous communication.

## Important Definitions
- **CBT (Computer-Based Training)**: Any course of learning that encompasses the use of computers in both instruction and management of the teaching and learning process.
- **CAD/CAM (Computer-Aided Design / Computer-Aided Manufacturing)**: Software used by architects, engineers, and manufacturers to design and manufacture products precisely.

## Detailed Explanation

### 1. Education
Computers are transforming classrooms and self-study. They facilitate online learning (E-learning) and provide vast repositories of information via the internet. Educational institutions also rely on computers to maintain student records, schedule classes, and process examination results efficiently.

### 2. Business and Finance
Modern businesses depend heavily on computers for daily operations. This includes payroll processing, accounting, and inventory management. The banking sector has been entirely revolutionized; ATMs, online banking portals, and electronic fund transfers (like NEFT and RTGS) rely on secure, interconnected computer networks.

### 3. Healthcare and Medicine
In the medical field, computers save lives and improve care. They are used for maintaining Electronic Health Records (EHRs), allowing instant access to patient histories. Complex diagnostic imaging techniques like CT scans and MRIs are entirely dependent on computer processing to construct readable images. Additionally, computers monitor vital signs in ICUs and assist surgeons in robotic surgeries.

### 4. Science and Engineering
Scientists and engineers use computers for complex tasks that would be otherwise impossible. CAD software allows for the precise 3D modeling of buildings, cars, and airplane components before they are built. Supercomputers run complex mathematical models to simulate weather patterns, track space probes, and conduct genetic sequencing.

### 5. Government, Defense, and Entertainment
Governments use computers to maintain massive citizen databases, process tax records, and manage census data. In defense, computers control sophisticated radar, secure communications, and missile tracking systems. Meanwhile, the entertainment industry utilizes powerful computers for rendering Computer Generated Imagery (CGI) in films and processing realistic physics in video games.

## Examples
- **Healthcare**: Using software to cross-reference a patient's new prescription against their known allergies.
- **Business**: E-commerce platforms automatically adjusting inventory levels when a customer makes a purchase.
- **Science**: Simulating the aerodynamic drag of a new car design using CAD software.

## Key Points
- Computers are universal tools applicable in almost every industry.
- Key impacts include automation of labor, secure data storage, and global communication.
- Complex industries like modern healthcare and engineering are heavily dependent on computer processing.

## Quick Revision
Applications span Education (CBT), Business (accounting/ATMs), Healthcare (MRI/EHR), Engineering (CAD/CAM), and Government/Defense.

## Practice Questions
1. Describe how computers are utilized in the healthcare sector, providing specific examples.
2. Explain the term CAD/CAM and its significance in engineering and manufacturing.
3. Discuss the impact of computers on modern banking systems.
`,
    quiz: {
      title: "Quiz: Applications of Computers",
      description: "Test your knowledge of the various ways computers are used in different industries.",
      questions: [
        {
          prompt: "What does CAD stand for in the context of engineering and design?",
          explanation: "CAD stands for Computer-Aided Design, used extensively by engineers and architects to draft designs.",
          options: [
            { text: "Computer Algorithm Design", is_correct: false },
            { text: "Computer-Aided Design", is_correct: true },
            { text: "Calculation And Drafting", is_correct: false },
            { text: "Computer Architecture Diagram", is_correct: false }
          ]
        },
        {
          prompt: "Which of the following represents a primary application of computers in the banking sector?",
          explanation: "ATMs (Automated Teller Machines) and secure online transaction processing rely entirely on interconnected computer networks.",
          options: [
            { text: "Diagnostic Imaging (MRI)", is_correct: false },
            { text: "Weather Forecasting", is_correct: false },
            { text: "Operating ATMs and processing transactions", is_correct: true },
            { text: "Rendering Computer Generated Imagery (CGI)", is_correct: false }
          ]
        },
        {
          prompt: "The use of computers to deliver instruction and learning materials in the education sector is often referred to by which acronym?",
          explanation: "CBT (Computer-Based Training) represents the application of computers in delivering instructional content.",
          options: [
            { text: "CBT", is_correct: true },
            { text: "CAD", is_correct: false },
            { text: "CGI", is_correct: false },
            { text: "RTGS", is_correct: false }
          ]
        }
      ]
    }
  }
];

async function run() {
  console.log("Starting Phase 2 Content Seeding for Pilot Topics...");

  // 1. Get Course (BCA)
  const { data: course } = await sb.from("courses").select("id").eq("slug", "bca").single();
  if (!course) throw new Error("BCA Course not found");

  // 2. Get Sem 1
  const { data: sem } = await sb.from("semesters").select("id").eq("course_id", course.id).eq("number", 1).single();
  if (!sem) throw new Error("Semester 1 not found");

  // 3. Get Subject (Computer Fundamentals)
  const { data: subject } = await sb.from("subjects").select("id").eq("semester_id", sem.id).eq("slug", "computer-fundamentals-and-pc-software-theory").single();
  if (!subject) throw new Error("Subject not found");

  // 4. Get Unit 1
  const { data: unit } = await sb.from("units").select("id").eq("subject_id", subject.id).eq("number", 1).single();
  if (!unit) throw new Error("Unit 1 not found");

  console.log("Verified path: BCA -> Sem 1 -> Computer Fundamentals -> Unit 1");

  // Fetch topics in unit 1
  const { data: existingTopics } = await sb.from("syllabus_topics").select("*").eq("unit_id", unit.id);
  
  if (!existingTopics || existingTopics.length === 0) {
     throw new Error("No syllabus topics found! Run seed-pilot.js first or ensure topics are seeded.");
  }

  for (const item of topicData) {
    const topic = existingTopics.find(t => t.title === item.title);
    if (!topic) {
      console.warn(\`Topic \${item.title} not found in DB. Skipping...\`);
      continue;
    }
    
    console.log(\`\\n--- Processing Topic: \${topic.title} ---\`);

    // --- Content Items ---
    const { data: existingContent } = await sb.from("content_items").select("id").eq("topic_id", topic.id).eq("type", "note").maybeSingle();
    
    let contentItemId = null;
    if (!existingContent) {
      const { data: newContent, error } = await sb.from("content_items").insert({
        unit_id: unit.id,
        subject_id: subject.id,
        topic_id: topic.id,
        title: \`\${topic.title} - Notes\`,
        description: \`Comprehensive study material for \${topic.title}\`,
        type: "note",
        status: "published", // Moving through workflow generated -> needs-review -> reviewed -> published
        visibility: "public",
        // We will insert into the notes table as well to preserve the architecture.
      }).select("id").single();
      if (error) console.error("Error inserting content_item:", error);
      else {
        console.log("Created content_items record.");
        contentItemId = newContent.id;
      }
    } else {
      console.log("content_items record already exists.");
      contentItemId = existingContent.id;
    }

    // --- Notes Table ---
    const { data: existingNote } = await sb.from("notes").select("id").eq("topic_id", topic.id).maybeSingle();
    let noteId = null;
    if (!existingNote) {
      const { data: newNote, error } = await sb.from("notes").insert({
        unit_id: unit.id,
        topic_id: topic.id,
        title: \`\${topic.title} - Full Notes\`,
        slug: \`\${topic.title.toLowerCase().replace(/ /g, '-')}-full-notes\`,
        body: item.noteMarkdown,
        status: "published",
        visibility: "public",
        summary: \`Study notes covering \${topic.title}\`,
        sort_order: 1
      }).select("id").single();
      if (error) console.error("Error inserting note:", error);
      else {
        console.log("Created notes record with markdown body.");
        noteId = newNote.id;
      }
    } else {
      console.log("notes record already exists.");
      noteId = existingNote.id;
    }

    // --- Quizzes Table ---
    const { data: existingQuiz } = await sb.from("quizzes").select("id").eq("topic_id", topic.id).maybeSingle();
    let quizId = null;
    if (!existingQuiz) {
      const { data: newQuiz, error } = await sb.from("quizzes").insert({
        unit_id: unit.id,
        topic_id: topic.id,
        title: item.quiz.title,
        slug: \`\${item.quiz.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}\`,
        description: item.quiz.description,
        status: "published",
        is_public: true,
        max_attempts: 10,
        passing_pct: 40,
        order_index: 1,
        negative_marking: false
      }).select("id").single();
      if (error) console.error("Error inserting quiz:", error);
      else {
        console.log("Created quizzes record.");
        quizId = newQuiz.id;
      }
    } else {
      console.log("quizzes record already exists.");
      quizId = existingQuiz.id;
    }

    // --- Quiz Questions and Options ---
    if (quizId) {
      const { data: existingQs } = await sb.from("quiz_questions").select("id").eq("quiz_id", quizId);
      if (existingQs && existingQs.length > 0) {
        console.log("Quiz questions already exist.");
      } else {
        for (let i = 0; i < item.quiz.questions.length; i++) {
          const q = item.quiz.questions[i];
          const { data: newQ, error: qErr } = await sb.from("quiz_questions").insert({
            quiz_id: quizId,
            prompt: q.prompt,
            explanation: q.explanation,
            type: "single",
            points: 1,
            order_index: i + 1,
            negative_marks: 0
          }).select("id").single();

          if (qErr) {
            console.error("Error inserting question:", qErr);
            continue;
          }

          // Insert Options
          const optionsToInsert = q.options.map((opt, optIdx) => ({
            question_id: newQ.id,
            text: opt.text,
            is_correct: opt.is_correct,
            order_index: optIdx + 1
          }));

          const { error: optErr } = await sb.from("quiz_options").insert(optionsToInsert);
          if (optErr) console.error("Error inserting options:", optErr);
        }
        console.log(\`Inserted \${item.quiz.questions.length} questions and options.\`);
      }
    }
  }

  console.log("\\nPhase 2 Pilot Seeding Complete.");
}

run().catch(console.error);
