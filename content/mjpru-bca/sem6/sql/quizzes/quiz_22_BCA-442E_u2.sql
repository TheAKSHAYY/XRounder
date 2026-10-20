DO $SEEDED_BLOCK$
DECLARE
  v_quiz_id UUID;
  v_q_id UUID;
BEGIN
  -- BCA-442E Unit 2 Quiz (50 Questions)
  INSERT INTO public.quizzes (
    unit_id, title, slug, description, instructions, passing_pct,
    time_limit_minutes, status, is_public, order_index, created_at, updated_at
  ) VALUES (
    '9ede825c-c2bb-5edd-8258-c240dd59905f', 'BCA-442E Unit 2: React.js Framework, State Management and Tooling Practice Quiz (50 MCQs)', 'bca-442e-u2-practice-quiz',
    'Official MJPRU BCA exam preparation practice quiz for BCA-442E Unit 2. 50 verified questions covering all syllabus topics with detailed explanations.', 'Select the best answer for each question. You will receive immediate feedback and full conceptual explanations.', 60,
    60, 'published', true, 2, now(), now()
  )
  ON CONFLICT (unit_id, slug) DO UPDATE SET
    title = EXCLUDED.title, description = EXCLUDED.description, instructions = EXCLUDED.instructions,
    status = 'published', is_public = true, updated_at = now()
  RETURNING id INTO v_quiz_id;

  DELETE FROM public.quiz_questions WHERE quiz_id = v_quiz_id;

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is React.js and who created it?', 'React popularized component-based architecture, declarative state rendering, and the Virtual DOM.',
    'easy', 1, 0, 1, ARRAY['BCA-442E', 'Unit-2', 'BCA-442E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'An open-source frontend JavaScript library for building user interfaces, developed by Jordan Walke at Facebook in 2013', true, 1, now(), now()),
    (v_q_id, 'A relational database management system developed by Oracle', false, 2, now(), now()),
    (v_q_id, 'An operating system developed by Microsoft', false, 3, now(), now()),
    (v_q_id, 'A web browser developed by Google', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is JSX (JavaScript XML) in React?', 'JSX is transpiled by Babel or Vite into standard `React.createElement()` JavaScript function calls.',
    'easy', 1, 0, 2, ARRAY['BCA-442E', 'Unit-2', 'BCA-442E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A syntax extension to JavaScript that allows writing HTML-like markup directly inside JavaScript files', true, 1, now(), now()),
    (v_q_id, 'A new version of XML developed by the W3C', false, 2, now(), now()),
    (v_q_id, 'A tool for compressing JavaScript files', false, 3, now(), now()),
    (v_q_id, 'A database query language like SQL', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the Virtual DOM in React architecture?', 'Manipulating real browser DOM is slow; React modifies the fast in-memory Virtual DOM, calculates minimal diffs, and batches real DOM updates.',
    'easy', 1, 0, 3, ARRAY['BCA-442E', 'Unit-2', 'BCA-442E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A lightweight, in-memory representation of the real DOM tree kept in memory and synced with real DOM via reconciliation', true, 1, now(), now()),
    (v_q_id, 'A virtual reality computer monitor', false, 2, now(), now()),
    (v_q_id, 'A backup copy of an HTML page saved on disk', false, 3, now(), now()),
    (v_q_id, 'A simulated operating system', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the Reconciliation algorithm in React?', 'React''s Fiber reconciliation uses heuristics (element types and unique `key` props) to achieve linear $O(N)$ tree updates.',
    'medium', 1, 0, 4, ARRAY['BCA-442E', 'Unit-2', 'BCA-442E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The diffing algorithm that compares two Virtual DOM trees and determines the minimal set of real DOM mutations required to update the screen', true, 1, now(), now()),
    (v_q_id, 'A legal mediation process between software companies', false, 2, now(), now()),
    (v_q_id, 'A method for reconciling financial bank statements', false, 3, now(), now()),
    (v_q_id, 'A tool for formatting hard drives', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Why must every item in a dynamically rendered list in React have a unique `key` prop?', 'Without stable keys, React must re-render the entire list from scratch on every update, causing severe performance degradation and state bugs.',
    'medium', 1, 0, 5, ARRAY['BCA-442E', 'Unit-2', 'BCA-442E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'To give React a stable identity for each element, allowing it to determine which items were added, removed, or reordered during diffing', true, 1, now(), now()),
    (v_q_id, 'Because HTML requires keys to display text', false, 2, now(), now()),
    (v_q_id, 'To sort the list in alphabetical order', false, 3, now(), now()),
    (v_q_id, 'To encrypt the list items with AES', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Why should array index (`index`) NOT be used as a `key` prop if the list can be reordered, sorted, or filtered?', 'Using `key={index}` causes input field state or checkboxes to stay bound to the wrong items when items are deleted or rearranged.',
    'hard', 1, 0, 6, ARRAY['BCA-442E', 'Unit-2', 'BCA-442E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Because reordering items causes array indices to change, confusing React''s diffing algorithm and leading to corrupted component state', true, 1, now(), now()),
    (v_q_id, 'Because array indices are illegal in JSX', false, 2, now(), now()),
    (v_q_id, 'Because array indices only work for numbers', false, 3, now(), now()),
    (v_q_id, 'Because index keys crash the web browser', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the primary difference between Props and State in React?', 'Props are like function parameters (read-only); State is like local variables that trigger re-rendering when updated.',
    'easy', 1, 0, 7, ARRAY['BCA-442E', 'Unit-2', 'BCA-442E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Props are immutable data passed downward from parent to child; State is mutable data managed locally within the component', true, 1, now(), now()),
    (v_q_id, 'Props are mutable; State is immutable', false, 2, now(), now()),
    (v_q_id, 'Props are for functions; State is for classes', false, 3, now(), now()),
    (v_q_id, 'There is no difference', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Props Drilling'' in React component hierarchies?', 'Mitigated using the React Context API, Redux, or Zustand to provide global state access without manual intermediate forwarding.',
    'medium', 1, 0, 8, ARRAY['BCA-442E', 'Unit-2', 'BCA-442E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The cumbersome process of passing props down through multiple layers of intermediate components that do not need the data themselves', true, 1, now(), now()),
    (v_q_id, 'Drilling physical holes into computer motherboards', false, 2, now(), now()),
    (v_q_id, 'Writing props using a very small font size', false, 3, now(), now()),
    (v_q_id, 'A tool for finding errors in props', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What are React Hooks introduced in React 16.8?', 'Hooks (`useState`, `useEffect`, `useContext`) revolutionized React by eliminating the verbose ceremony and `this` bugs of class components.',
    'easy', 1, 0, 9, ARRAY['BCA-442E', 'Unit-2', 'BCA-442E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Functions that allow functional components to use state and other React features without writing ES6 class components', true, 1, now(), now()),
    (v_q_id, 'Hardware hooks used to mount computers on walls', false, 2, now(), now()),
    (v_q_id, 'Tools for intercepting network packets', false, 3, now(), now()),
    (v_q_id, 'Functions that delete components from memory', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What does the `useState` hook return in React?', 'Destructured as: `const [count, setCount] = useState(0);`.',
    'easy', 1, 0, 10, ARRAY['BCA-442E', 'Unit-2', 'BCA-442E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'An array containing exactly two elements: the current state value and a state updater function: `[state, setState]`', true, 1, now(), now()),
    (v_q_id, 'A single object with all state variables', false, 2, now(), now()),
    (v_q_id, 'A boolean indicating if state changed', false, 3, now(), now()),
    (v_q_id, 'A Promise that resolves to state', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What happens when you call `setState(newValue)` in a React component?', 'State updates are asynchronous and batched; React queues the update and re-renders the component during the next render cycle.',
    'easy', 1, 0, 11, ARRAY['BCA-442E', 'Unit-2', 'BCA-442E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'React schedules a re-render of the component with the new state value, batches updates, and diffs the Virtual DOM', true, 1, now(), now()),
    (v_q_id, 'The component is deleted immediately', false, 2, now(), now()),
    (v_q_id, 'The browser reloads the entire HTML page from the server', false, 3, now(), now()),
    (v_q_id, 'The state variable is deleted', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the purpose of the `useEffect` Hook in React?', 'Unifies `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` lifecycle operations into a declarative API.',
    'easy', 1, 0, 12, ARRAY['BCA-442E', 'Unit-2', 'BCA-442E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'To perform side-effects (data fetching, DOM subscriptions, manual timers) in functional components', true, 1, now(), now()),
    (v_q_id, 'To style HTML elements with CSS', false, 2, now(), now()),
    (v_q_id, 'To create new HTML tags', false, 3, now(), now()),
    (v_q_id, 'To encrypt user passwords', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'How does the dependency array `[deps]` affect `useEffect` execution?', 'Providing an empty dependency array `[]` ensures API fetching effects run strictly once when the component initially mounts.',
    'medium', 1, 0, 13, ARRAY['BCA-442E', 'Unit-2', 'BCA-442E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'No array: runs on every render; Empty array `[]`: runs once on mount; Array with variables: runs only when those specific variables change', true, 1, now(), now()),
    (v_q_id, 'Empty array makes the effect run forever in an infinite loop', false, 2, now(), now()),
    (v_q_id, 'The dependency array is optional and has zero effect', false, 3, now(), now()),
    (v_q_id, 'It determines the font size of the component', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'How do you clean up a timer or subscription in a `useEffect` hook to prevent memory leaks?', 'React invokes the returned cleanup function before re-running the effect and when the component unmounts from the DOM.',
    'medium', 1, 0, 14, ARRAY['BCA-442E', 'Unit-2', 'BCA-442E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Return a cleanup function from the `useEffect` callback: `return () => clearInterval(timer);`', true, 1, now(), now()),
    (v_q_id, 'Call `delete useEffect;`', false, 2, now(), now()),
    (v_q_id, 'Call `useEffect.stop()`', false, 3, now(), now()),
    (v_q_id, 'Turn off the computer', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the `useMemo` Hook used for in React performance optimization?', '`const sortedList = useMemo(() => expensiveSort(list), [list]);` prevents heavy calculations on every unrelated render.',
    'medium', 1, 0, 15, ARRAY['BCA-442E', 'Unit-2', 'BCA-442E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Memoizes the result of an expensive calculation, recomputing it only when specified dependencies change', true, 1, now(), now()),
    (v_q_id, 'Memorizes text typed by users', false, 2, now(), now()),
    (v_q_id, 'A tool for saving files to hard drives', false, 3, now(), now()),
    (v_q_id, 'A hook that measures computer memory', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the `useCallback` Hook used for?', 'Used to pass stable function references to memoized child components (`React.memo`) to prevent unnecessary child re-renders.',
    'medium', 1, 0, 16, ARRAY['BCA-442E', 'Unit-2', 'BCA-442E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Returns a memoized version of a callback function that only changes if one of the dependencies has changed', true, 1, now(), now()),
    (v_q_id, 'Calls a telephone number automatically', false, 2, now(), now()),
    (v_q_id, 'A hook that calls another hook', false, 3, now(), now()),
    (v_q_id, 'A tool for deleting functions', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the `useRef` Hook in React?', 'Used for accessing real DOM elements directly (`inputRef.current.focus()`) and storing timer IDs or mutable values that don''t need to trigger re-renders.',
    'medium', 1, 0, 17, ARRAY['BCA-442E', 'Unit-2', 'BCA-442E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Returns a mutable ref object whose `.current` property persists across renders without causing a re-render when mutated', true, 1, now(), now()),
    (v_q_id, 'A hook that refers users to external websites', false, 2, now(), now()),
    (v_q_id, 'A tool for checking academic references', false, 3, now(), now()),
    (v_q_id, 'A hook that deletes variables', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is an Error Boundary in React?', 'Implemented via `componentDidCatch` or `getDerivedStateFromError`; prevents an unhandled UI error from crashing the entire application.',
    'medium', 1, 0, 18, ARRAY['BCA-442E', 'Unit-2', 'BCA-442E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A class component that catches JavaScript errors anywhere in its child component tree, logs errors, and renders a fallback UI', true, 1, now(), now()),
    (v_q_id, 'A boundary drawn around a computer screen with CSS', false, 2, now(), now()),
    (v_q_id, 'A firewall that blocks invalid web requests', false, 3, now(), now()),
    (v_q_id, 'An error that occurs when a hard drive is full', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What are React Portals (`ReactDOM.createPortal`)?', 'Essential for modal dialogs, tooltips, and hover cards that need to escape parent CSS `overflow: hidden` or `z-index` stacking contexts.',
    'medium', 1, 0, 19, ARRAY['BCA-442E', 'Unit-2', 'BCA-442E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A mechanism to render children into a DOM node that exists outside the DOM hierarchy of the parent component', true, 1, now(), now()),
    (v_q_id, 'A science-fiction teleportation device', false, 2, now(), now()),
    (v_q_id, 'A doorway into a server data center', false, 3, now(), now()),
    (v_q_id, 'A tool for transferring files across networks', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the React Context API?', 'Comprises `createContext()`, `<Provider value={data}>`, and `useContext(MyContext)` to avoid props drilling.',
    'easy', 1, 0, 20, ARRAY['BCA-442E', 'Unit-2', 'BCA-442E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A built-in feature designed to share data that can be considered ''global'' for a tree of React components (e.g., current authenticated user, UI theme, language)', true, 1, now(), now()),
    (v_q_id, 'A tool for analyzing the context of text articles', false, 2, now(), now()),
    (v_q_id, 'A database management system built into React', false, 3, now(), now()),
    (v_q_id, 'A dictionary of computer terms', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Redux in frontend state management?', 'Redux manages complex, frequently changing application state with strict unidirectional data flow and powerful time-travel debugging.',
    'easy', 1, 0, 21, ARRAY['BCA-442E', 'Unit-2', 'BCA-442E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A predictable state container for JavaScript apps based on a centralized global store, unidirectional data flow, and pure reducer functions', true, 1, now(), now()),
    (v_q_id, 'A new version of React developed by Facebook', false, 2, now(), now()),
    (v_q_id, 'A tool for styling web pages with CSS', false, 3, now(), now()),
    (v_q_id, 'A database engine like MongoDB', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What are the Three Core Principles of Redux?', 'Guarantees that state mutations are deterministic, traceable, and easily serializable across the application lifecycle.',
    'medium', 1, 0, 22, ARRAY['BCA-442E', 'Unit-2', 'BCA-442E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, '1. Single source of truth (one global store); 2. State is read-only (mutated only via actions); 3. Changes are made with pure functions (reducers)', true, 1, now(), now()),
    (v_q_id, '1. Fast; 2. Cheap; 3. Easy', false, 2, now(), now()),
    (v_q_id, '1. Input; 2. Output; 3. Storage', false, 3, now(), now()),
    (v_q_id, '1. Model; 2. View; 3. Controller', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is an ''Action'' in Redux architecture?', 'Example: `{ type: ''courses/add'', payload: { id: 1, title: ''Data Science'' } }`.',
    'easy', 1, 0, 23, ARRAY['BCA-442E', 'Unit-2', 'BCA-442E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A plain JavaScript object that describes what happened, containing a mandatory `type` property and an optional `payload`', true, 1, now(), now()),
    (v_q_id, 'A physical movement of a computer mouse', false, 2, now(), now()),
    (v_q_id, 'A video file playing on a website', false, 3, now(), now()),
    (v_q_id, 'A function that deletes state', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a ''Reducer'' in Redux?', 'Reducers must be pure: zero side-effects, zero API calls, and zero in-place mutations (must return a newly copied state object).',
    'medium', 1, 0, 24, ARRAY['BCA-442E', 'Unit-2', 'BCA-442E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A pure function that takes the previous state and an action as arguments, and returns the next state: `(state, action) => newState`', true, 1, now(), now()),
    (v_q_id, 'A tool that reduces file sizes on disk', false, 2, now(), now()),
    (v_q_id, 'A component that makes fonts smaller', false, 3, now(), now()),
    (v_q_id, 'A function that deletes old state', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the Redux Store?', 'Exposes `getState()`, `dispatch(action)`, and `subscribe(listener)` methods.',
    'easy', 1, 0, 25, ARRAY['BCA-442E', 'Unit-2', 'BCA-442E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The single centralized JavaScript object that holds the complete global application state tree', true, 1, now(), now()),
    (v_q_id, 'A physical retail store selling computers', false, 2, now(), now()),
    (v_q_id, 'An online app store where plugins are bought', false, 3, now(), now()),
    (v_q_id, 'A database installed on a server', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Redux Toolkit (RTK)?', 'RTK introduces `createSlice()`, `createAsyncThunk()`, and integrates Immer to eliminate 80% of legacy Redux boilerplate code.',
    'easy', 1, 0, 26, ARRAY['BCA-442E', 'Unit-2', 'BCA-442E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The official, opinionated, batteries-included standard toolset for efficient Redux development, simplifying store setup and reducers', true, 1, now(), now()),
    (v_q_id, 'A hardware toolkit for opening computer cases', false, 2, now(), now()),
    (v_q_id, 'A separate programming language from JavaScript', false, 3, now(), now()),
    (v_q_id, 'A visual graphics design software', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'How does Immer library work inside Redux Toolkit `createSlice`?', 'Eliminates cumbersome manual object spreading (`{ ...state, nested: { ...state.nested } }`) while preserving immutability guarantees.',
    'medium', 1, 0, 27, ARRAY['BCA-442E', 'Unit-2', 'BCA-442E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Allows developers to write mutating syntax (e.g., `state.items.push(x)`), while internally producing a safe immutable copy using JavaScript Proxies', true, 1, now(), now()),
    (v_q_id, 'Deletes all duplicate state records', false, 2, now(), now()),
    (v_q_id, 'Compresses state memory using gzip', false, 3, now(), now()),
    (v_q_id, 'Encrypts state variables with AES', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Redux Thunk in asynchronous state management?', 'Thunk functions receive `(dispatch, getState)`, allowing them to dispatch a ''loading'' action, fetch an API, and dispatch a ''success'' action.',
    'medium', 1, 0, 28, ARRAY['BCA-442E', 'Unit-2', 'BCA-442E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A middleware that allows action creators to return a function instead of a plain action object, enabling delayed dispatch and async API calls', true, 1, now(), now()),
    (v_q_id, 'A sound effect played when a test fails', false, 2, now(), now()),
    (v_q_id, 'A tool for compressing Redux code', false, 3, now(), now()),
    (v_q_id, 'A database developed for Redux', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Redux Saga?', 'Provides sophisticated asynchronous orchestration (race conditions, task cancellation, debounce) using declarative generator effects.',
    'hard', 1, 0, 29, ARRAY['BCA-442E', 'Unit-2', 'BCA-442E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A middleware library that uses ES6 Generator functions (`yield`, `takeEvery`, `put`) to manage complex, concurrent asynchronous side-effects', true, 1, now(), now()),
    (v_q_id, 'A historical documentary about computer science', false, 2, now(), now()),
    (v_q_id, 'A video game developed with Redux', false, 3, now(), now()),
    (v_q_id, 'A database management system', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Server-Side Rendering (SSR) in modern React (e.g., Next.js)?', 'Delivers instantaneous First Contentful Paint (FCP) and superior SEO because search engine web crawlers receive fully rendered HTML text.',
    'medium', 1, 0, 30, ARRAY['BCA-442E', 'Unit-2', 'BCA-442E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Rendering React components into static HTML strings on the server on each request and sending complete HTML to the browser', true, 1, now(), now()),
    (v_q_id, 'Rendering web pages on the client''s graphic card', false, 2, now(), now()),
    (v_q_id, 'Printing web pages on a laser printer', false, 3, now(), now()),
    (v_q_id, 'Running React without an internet connection', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Static Site Generation (SSG) in React?', 'Offers ultra-fast performance and near-zero server hosting costs, ideal for blogs, documentation, and academic course catalogs.',
    'medium', 1, 0, 31, ARRAY['BCA-442E', 'Unit-2', 'BCA-442E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Compiling all web pages into static HTML, CSS, and JS files ahead of time at build-time, served instantly from global edge CDNs', true, 1, now(), now()),
    (v_q_id, 'Generating static electricity with computer hardware', false, 2, now(), now()),
    (v_q_id, 'A website that cannot be modified', false, 3, now(), now()),
    (v_q_id, 'Writing HTML by hand without using React', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Hydration in React SSR?', 'The browser displays the HTML immediately; React''s bundle downloads in the background and ''hydrates'' the DOM, turning it into a dynamic SPA.',
    'medium', 1, 0, 32, ARRAY['BCA-442E', 'Unit-2', 'BCA-442E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The process where client-side React attaches event listeners, boots hooks, and takes over static HTML sent by the server to make it interactive', true, 1, now(), now()),
    (v_q_id, 'Pouring water over computer processors to cool them', false, 2, now(), now()),
    (v_q_id, 'Downloading images on a web page', false, 3, now(), now()),
    (v_q_id, 'Compressing HTML files with gzip', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Webpack in frontend web tooling?', 'Webpack uses Loaders (Babel, CSS loader) and Plugins to transpile, bundle, and optimize modern front-end assets for production.',
    'easy', 1, 0, 33, ARRAY['BCA-442E', 'Unit-2', 'BCA-442E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A static module bundler for modern JavaScript applications that analyzes dependency graphs and packages assets into bundles', true, 1, now(), now()),
    (v_q_id, 'A package delivery truck for software', false, 2, now(), now()),
    (v_q_id, 'A web browser developed by Netscape', false, 3, now(), now()),
    (v_q_id, 'A database query engine', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Vite in modern frontend engineering?', 'Replaces legacy slow Webpack dev servers: launches in $< 300\,\text{ms}$ by serving unbundled ESM directly to the browser on demand.',
    'easy', 1, 0, 34, ARRAY['BCA-442E', 'Unit-2', 'BCA-442E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A next-generation frontend build tool providing near-instantaneous dev server startup using native browser ES Modules (ESM) and Rollup bundling', true, 1, now(), now()),
    (v_q_id, 'A video editing software application', false, 2, now(), now()),
    (v_q_id, 'A brand of computer monitors', false, 3, now(), now()),
    (v_q_id, 'A relational database like PostgreSQL', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Hot Module Replacement (HMR)?', 'Retains component state in memory while instantly reflecting source code edits in the browser, accelerating UI development.',
    'easy', 1, 0, 35, ARRAY['BCA-442E', 'Unit-2', 'BCA-442E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A dev server capability that exchanges, adds, or removes individual modules while an application is running without reloading the entire page', true, 1, now(), now()),
    (v_q_id, 'Replacing computer hardware parts while the machine is on', false, 2, now(), now()),
    (v_q_id, 'A tool that cools down hot computer processors', false, 3, now(), now()),
    (v_q_id, 'Restarting a server when it overheats', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is React Router?', 'Uses the HTML5 History API (`pushState`) to dynamically swap out component views matching the current URL path.',
    'easy', 1, 0, 36, ARRAY['BCA-442E', 'Unit-2', 'BCA-442E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The standard routing library for React, enabling dynamic, client-side routing without triggering full browser page reloads', true, 1, now(), now()),
    (v_q_id, 'A physical Wi-Fi router manufactured by Cisco', false, 2, now(), now()),
    (v_q_id, 'A hardware cable connecting two computers', false, 3, now(), now()),
    (v_q_id, 'A tool for measuring internet speeds', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In React Router v6, what does the `<Outlet />` component do?', 'Enables nested persistent layouts (e.g., persistent navigation bar and sidebar) while rendering child page views inside the `<Outlet />`.',
    'medium', 1, 0, 37, ARRAY['BCA-442E', 'Unit-2', 'BCA-442E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Renders the child route component matched in nested routing layouts', true, 1, now(), now()),
    (v_q_id, 'An electrical wall socket in an office', false, 2, now(), now()),
    (v_q_id, 'An exit door on a building floorplan', false, 3, now(), now()),
    (v_q_id, 'A component that terminates the application', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is `React.memo` (Higher-Order Component)?', 'Prevents unnecessary re-rendering of pure child components when a parent component''s unrelated state changes.',
    'medium', 1, 0, 38, ARRAY['BCA-442E', 'Unit-2', 'BCA-442E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A performance optimization wrapper that shallowly compares props and skips re-rendering a component if its props have not changed', true, 1, now(), now()),
    (v_q_id, 'A tool for writing sticky notes on the screen', false, 2, now(), now()),
    (v_q_id, 'A function that saves components to local storage', false, 3, now(), now()),
    (v_q_id, 'A hook that measures computer memory', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a Controlled Component in React form handling?', 'React state acts as the single source of truth for the input; the UI always mirrors current state.',
    'easy', 1, 0, 39, ARRAY['BCA-442E', 'Unit-2', 'BCA-442E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A form input element whose value is strictly bound to and controlled by React component state (`value={state}` and `onChange={e => setState(...)}`)', true, 1, now(), now()),
    (v_q_id, 'A component controlled by a remote manager', false, 2, now(), now()),
    (v_q_id, 'A component that has a physical remote control', false, 3, now(), now()),
    (v_q_id, 'A component that cannot be edited by users', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is an Uncontrolled Component in React?', 'Resembles traditional HTML inputs: `<input type="text" ref={inputRef} />`, reading `inputRef.current.value` only upon form submission.',
    'medium', 1, 0, 40, ARRAY['BCA-442E', 'Unit-2', 'BCA-442E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A form element that maintains its own internal DOM state, where values are accessed on-demand using a `useRef` reference', true, 1, now(), now()),
    (v_q_id, 'A component that runs out of control and crashes the page', false, 2, now(), now()),
    (v_q_id, 'A component written by an unauthorized developer', false, 3, now(), now()),
    (v_q_id, 'A component with zero CSS styling', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Code Splitting in React applications?', 'Prevents users from having to download the entire multi-megabyte admin portal bundle just to view the public landing page.',
    'medium', 1, 0, 41, ARRAY['BCA-442E', 'Unit-2', 'BCA-442E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Dividing the monolithic application bundle into smaller chunks loaded on-demand via `React.lazy()` and dynamic `import()` to improve load times', true, 1, now(), now()),
    (v_q_id, 'Splitting a code file into two halves with a text editor', false, 2, now(), now()),
    (v_q_id, 'Deleting half of the code in a software project', false, 3, now(), now()),
    (v_q_id, 'Allowing two programmers to work on the same file', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What does the `<Suspense>` component do in React?', '`<Suspense fallback={<Spinner />}> <LazyAdminDashboard /> </Suspense>` provides clean declarative loading states.',
    'medium', 1, 0, 42, ARRAY['BCA-442E', 'Unit-2', 'BCA-442E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Wraps dynamically loaded lazy components and specifies a fallback UI (like a loading spinner) while child components are downloading', true, 1, now(), now()),
    (v_q_id, 'Suspends an employee from working', false, 2, now(), now()),
    (v_q_id, 'Pauses the operating system indefinitely', false, 3, now(), now()),
    (v_q_id, 'A tool for catching fatal crashes', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is TanStack Query (React Query)?', 'Eliminates boilerplate `useEffect` data fetching; automates background refetching, caching, pagination, and optimistic updates.',
    'easy', 1, 0, 43, ARRAY['BCA-442E', 'Unit-2', 'BCA-442E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'An asynchronous state management library for managing, fetching, caching, and synchronizing server state in React applications', true, 1, now(), now()),
    (v_q_id, 'A database query engine like SQL', false, 2, now(), now()),
    (v_q_id, 'A tool for querying network DNS servers', false, 3, now(), now()),
    (v_q_id, 'A search engine developed by TanStack', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is SyntheticEvent in React?', 'React normalizes differences between Chrome, Firefox, and Safari event architectures using a consistent `SyntheticEvent` interface.',
    'medium', 1, 0, 44, ARRAY['BCA-442E', 'Unit-2', 'BCA-442E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A cross-browser wrapper around the browser’s native DOM event, ensuring identical event property behavior across all web browsers', true, 1, now(), now()),
    (v_q_id, 'A fake event created by computer hackers', false, 2, now(), now()),
    (v_q_id, 'A musical synthesizer program in JavaScript', false, 3, now(), now()),
    (v_q_id, 'An event generated by artificial intelligence', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the difference between Shallow Copy and Deep Copy of an object in JavaScript?', '`{ ...obj }` is shallow; `structuredClone(obj)` produces a true independent deep clone.',
    'medium', 1, 0, 45, ARRAY['BCA-442E', 'Unit-2', 'BCA-442E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Shallow copy duplicates top-level properties but copies references to nested objects; Deep copy recursively duplicates all nested objects', true, 1, now(), now()),
    (v_q_id, 'Shallow copy is for numbers; Deep copy is for strings', false, 2, now(), now()),
    (v_q_id, 'Shallow copy creates smaller files on disk', false, 3, now(), now()),
    (v_q_id, 'There is no difference between them', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the purpose of the `dangerouslySetInnerHTML` attribute in React?', 'Bypasses React''s automatic string escaping: should only be used with sanitized HTML to prevent arbitrary script injection.',
    'medium', 1, 0, 46, ARRAY['BCA-442E', 'Unit-2', 'BCA-442E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'React''s replacement for using `innerHTML` in the browser DOM, deliberately named to warn developers of Cross-Site Scripting (XSS) hazards', true, 1, now(), now()),
    (v_q_id, 'An attribute that sets dangerous computer viruses', false, 2, now(), now()),
    (v_q_id, 'An attribute that damages the monitor screen', false, 3, now(), now()),
    (v_q_id, 'An attribute that makes text appear red', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is CSS Modules in React component styling?', 'Generates unique hashed class names (e.g., `button_btn__3x7k2`), completely preventing global CSS namespace collision bugs.',
    'easy', 1, 0, 47, ARRAY['BCA-442E', 'Unit-2', 'BCA-442E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A CSS file where all class names and animation names are scoped locally to the component by default at build time', true, 1, now(), now()),
    (v_q_id, 'A tool for writing CSS using JavaScript', false, 2, now(), now()),
    (v_q_id, 'A module that adds colors to HTML', false, 3, now(), now()),
    (v_q_id, 'A library developed by Facebook for CSS', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Styled Components (CSS-in-JS)?', 'Enables dynamic prop-driven CSS styling: `const Button = styled.button` `background: ${props => props.primary ? ''blue'' : ''gray''};` ``.',
    'medium', 1, 0, 48, ARRAY['BCA-442E', 'Unit-2', 'BCA-442E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A library that utilizes ES6 tagged template literals to write actual CSS code scoped directly inside React component definitions', true, 1, now(), now()),
    (v_q_id, 'A physical component made of stylish metal', false, 2, now(), now()),
    (v_q_id, 'A tool for editing CSS files in an IDE', false, 3, now(), now()),
    (v_q_id, 'A fashion magazine for software engineers', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the difference between Client-Side Routing and Server-Side Routing?', 'Client-side routing gives SPAs instant page transitions and native-app feel, fetching only raw JSON data in the background.',
    'easy', 1, 0, 49, ARRAY['BCA-442E', 'Unit-2', 'BCA-442E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Client-side routing updates views dynamically via JS without full page reload; Server-side routing makes a full HTTP request for a new HTML page on every URL change', true, 1, now(), now()),
    (v_q_id, 'Client-side routing is for mobile; Server-side is for desktop', false, 2, now(), now()),
    (v_q_id, 'Client-side routing does not use URLs', false, 3, now(), now()),
    (v_q_id, 'There is no difference', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Progressive Web App (PWA) in modern web development?', 'Combines the reach of the open web with the offline resilience and engagement of native smartphone apps.',
    'easy', 1, 0, 50, ARRAY['BCA-442E', 'Unit-2', 'BCA-442E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Web applications that use service workers, manifests, and responsive design to deliver native app-like capabilities (offline access, push notifications, home screen installation)', true, 1, now(), now()),
    (v_q_id, 'A software application that works on progressive political websites', false, 2, now(), now()),
    (v_q_id, 'A web page that downloads very slowly', false, 3, now(), now()),
    (v_q_id, 'An application written strictly in Python', false, 4, now(), now());

END $SEEDED_BLOCK$;
