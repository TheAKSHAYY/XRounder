DO $SEEDED_BLOCK$
DECLARE
  v_quiz_id UUID;
  v_q_id UUID;
BEGIN
  -- BCA-442E Unit 1 Quiz (50 Questions)
  INSERT INTO public.quizzes (
    unit_id, title, slug, description, instructions, passing_pct,
    time_limit_minutes, status, is_public, order_index, created_at, updated_at
  ) VALUES (
    '304ea51d-c15d-587f-beb4-a82087b80385', 'BCA-442E Unit 1: JavaScript Fundamentals and Modern ECMAScript Practice Quiz (50 MCQs)', 'bca-442e-u1-practice-quiz',
    'Official MJPRU BCA exam preparation practice quiz for BCA-442E Unit 1. 50 verified questions covering all syllabus topics with detailed explanations.', 'Select the best answer for each question. You will receive immediate feedback and full conceptual explanations.', 60,
    60, 'published', true, 1, now(), now()
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
    v_quiz_id, 'single', 'What is the primary role of JavaScript in web development?', 'JavaScript provides programmatic logic, DOM manipulation, asynchronous network calls, and application state control.',
    'easy', 1, 0, 1, ARRAY['BCA-442E', 'Unit-1', 'BCA-442E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A lightweight, interpreted, object-oriented programming language with first-class functions used to create dynamic, interactive web pages and server applications', true, 1, now(), now()),
    (v_q_id, 'A styling language used to color text', false, 2, now(), now()),
    (v_q_id, 'A markup language for defining headings and paragraphs', false, 3, now(), now()),
    (v_q_id, 'A database management system like Oracle', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Who invented JavaScript in 1995 while working at Netscape Communications?', 'Brendan Eich developed JavaScript in just 10 days in May 1995 under the initial name Mocha, later renamed LiveScript and finally JavaScript.',
    'easy', 1, 0, 2, ARRAY['BCA-442E', 'Unit-1', 'BCA-442E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Brendan Eich', true, 1, now(), now()),
    (v_q_id, 'James Gosling', false, 2, now(), now()),
    (v_q_id, 'Guido van Rossum', false, 3, now(), now()),
    (v_q_id, 'Bjarne Stroustrup', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the formal international standard specification for the JavaScript language?', 'ECMAScript defines the core language syntax, types, and semantics governed by Ecma International Technical Committee 39 (TC39).',
    'easy', 1, 0, 3, ARRAY['BCA-442E', 'Unit-1', 'BCA-442E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'ECMAScript (ECMA-262)', true, 1, now(), now()),
    (v_q_id, 'W3C HTML5', false, 2, now(), now()),
    (v_q_id, 'ISO C++20', false, 3, now(), now()),
    (v_q_id, 'IEEE 802.11', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the difference between `var`, `let`, and `const` regarding variable scoping?', 'Variables declared with `var` escape `if`/`for` blocks to the enclosing function; `let` and `const` are strictly bound to their enclosing `{}` block.',
    'easy', 1, 0, 4, ARRAY['BCA-442E', 'Unit-1', 'BCA-442E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, '`var` is function-scoped; `let` and `const` are block-scoped (`{ ... }`)', true, 1, now(), now()),
    (v_q_id, '`var` is block-scoped; `let` is function-scoped', false, 2, now(), now()),
    (v_q_id, 'All three have identical global scope', false, 3, now(), now()),
    (v_q_id, '`const` can only be used inside loops', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the ''Temporal Dead Zone'' (TDZ) in ES6 JavaScript?', 'Unlike `var` (which is hoisted and initialized to `undefined`), `let`/`const` are hoisted uninitialized into the TDZ.',
    'medium', 1, 0, 5, ARRAY['BCA-442E', 'Unit-1', 'BCA-442E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The zone from the start of a block until a `let` or `const` declaration is evaluated, during which accessing the variable throws a `ReferenceError`', true, 1, now(), now()),
    (v_q_id, 'The time it takes for a web page to download', false, 2, now(), now()),
    (v_q_id, 'A zone where computer monitors turn black', false, 3, now(), now()),
    (v_q_id, 'The time taken by garbage collection', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What occurs if you attempt to reassign a variable declared with `const`?', '`const` creates an immutable variable binding: once assigned, the identifier cannot be reassigned to a new memory reference.',
    'easy', 1, 0, 6, ARRAY['BCA-442E', 'Unit-1', 'BCA-442E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A `TypeError: Assignment to constant variable` is thrown at runtime', true, 1, now(), now()),
    (v_q_id, 'The variable silently accepts the new value', false, 2, now(), now()),
    (v_q_id, 'The computer restarts automatically', false, 3, now(), now()),
    (v_q_id, 'The variable becomes `null`', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Does `const obj = { a: 1 }; obj.a = 2;` throw a TypeError?', 'Mutating properties of a `const` object is completely valid; only reassigning the variable itself (`obj = {}`) is prohibited.',
    'medium', 1, 0, 7, ARRAY['BCA-442E', 'Unit-1', 'BCA-442E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'No, because `const` protects the object reference pointer, not the internal properties of the object itself', true, 1, now(), now()),
    (v_q_id, 'Yes, because properties cannot be modified', false, 2, now(), now()),
    (v_q_id, 'Yes, in strict mode only', false, 3, now(), now()),
    (v_q_id, 'It deletes the object', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'How can you make an object completely immutable in JavaScript so properties cannot be added, deleted, or modified?', '`Object.freeze()` shallowly freezes an object, preventing adding, removing, or changing property values.',
    'medium', 1, 0, 8, ARRAY['BCA-442E', 'Unit-1', 'BCA-442E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, '`Object.freeze(obj)`', true, 1, now(), now()),
    (v_q_id, '`Object.seal(obj)`', false, 2, now(), now()),
    (v_q_id, '`Object.preventExtensions(obj)`', false, 3, now(), now()),
    (v_q_id, '`const obj`', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What are the 7 primitive data types in modern ECMAScript?', 'All primitive values are immutable; everything else in JavaScript (including Arrays and Functions) is an Object.',
    'medium', 1, 0, 9, ARRAY['BCA-442E', 'Unit-1', 'BCA-442E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Number, BigInt, String, Boolean, Symbol, Undefined, Null', true, 1, now(), now()),
    (v_q_id, 'Integer, Float, Double, Char, Boolean, Array, Object', false, 2, now(), now()),
    (v_q_id, 'Byte, Short, Int, Long, Float, Double, Boolean', false, 3, now(), now()),
    (v_q_id, 'Text, Number, Date, Time, Currency, Blob, Null', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What does `typeof null` evaluate to in JavaScript, and why is this famous?', 'In early JS, values were tagged with a 3-bit type tag; objects had tag `000`, and `null` was represented as null pointer `0x00`, resulting in `typeof null === ''object''`.',
    'medium', 1, 0, 10, ARRAY['BCA-442E', 'Unit-1', 'BCA-442E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, '`"object"` - a legacy bug dating back to JavaScript''s first 1995 implementation that was never fixed for backwards compatibility', true, 1, now(), now()),
    (v_q_id, '`"null"`', false, 2, now(), now()),
    (v_q_id, '`"undefined"`', false, 3, now(), now()),
    (v_q_id, '`"boolean"`', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the difference between `null` and `undefined` in JavaScript?', '`undefined` is the default system state of uninitialized variables; `null` is explicitly assigned by developers to signify absence.',
    'easy', 1, 0, 11, ARRAY['BCA-442E', 'Unit-1', 'BCA-442E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, '`undefined` means a variable has been declared but not assigned a value; `null` is an intentional assignment representing empty value', true, 1, now(), now()),
    (v_q_id, '`undefined` is an object; `null` is a string', false, 2, now(), now()),
    (v_q_id, '`null` is thrown by compilers; `undefined` is user input', false, 3, now(), now()),
    (v_q_id, 'They are exact synonyms', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the output of `0.1 + 0.2 === 0.3` in JavaScript?', 'Binary computers cannot accurately represent decimal fractions like 0.1 and 0.2, yielding $0.30000000000000004$.',
    'medium', 1, 0, 12, ARRAY['BCA-442E', 'Unit-1', 'BCA-442E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, '`false`, because IEEE 754 double-precision floating-point arithmetic introduces tiny binary rounding inaccuracies ($0.30000000000000004$)', true, 1, now(), now()),
    (v_q_id, '`true`', false, 2, now(), now()),
    (v_q_id, '`TypeError`', false, 3, now(), now()),
    (v_q_id, '`NaN`', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is `NaN` in JavaScript and what is unique about `NaN === NaN`?', 'Because `NaN === NaN` is `false`, developers must use `Number.isNaN(val)` to reliably test for Not-a-Number.',
    'medium', 1, 0, 13, ARRAY['BCA-442E', 'Unit-1', 'BCA-442E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, '`NaN` stands for ''Not a Number''; it is the only value in JavaScript that is NOT equal to itself (`NaN === NaN` evaluates to `false`)', true, 1, now(), now()),
    (v_q_id, '`NaN` is a string; it equals itself', false, 2, now(), now()),
    (v_q_id, '`NaN` represents infinity', false, 3, now(), now()),
    (v_q_id, '`NaN` is equal to `0`', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Type Coercion in JavaScript?', 'JavaScript coercively converts types when using loose operators: `''5'' - 2 === 3` converts string to number, but `''5'' + 2 === ''52''` converts to string concatenation.',
    'easy', 1, 0, 14, ARRAY['BCA-442E', 'Unit-1', 'BCA-442E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The automatic or implicit conversion of values from one data type to another during operations (e.g., `''5'' + 2 === ''52''`)', true, 1, now(), now()),
    (v_q_id, 'A technique for forcing programmers to write strict code', false, 2, now(), now()),
    (v_q_id, 'Encrypting text strings into numbers', false, 3, now(), now()),
    (v_q_id, 'Deleting variables from memory', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the difference between `==` and `===`?', '`''5'' == 5` is `true` because string is coerced to number; `''5'' === 5` is `false` because types differ (string vs number).',
    'easy', 1, 0, 15, ARRAY['BCA-442E', 'Unit-1', 'BCA-442E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, '`==` (Loose Equality) performs implicit type coercion; `===` (Strict Equality) compares value and type without coercion', true, 1, now(), now()),
    (v_q_id, '`==` is for numbers; `===` is for strings', false, 2, now(), now()),
    (v_q_id, '`===` is obsolete in ES6', false, 3, now(), now()),
    (v_q_id, 'There is no difference', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a JavaScript Closure?', 'Closures allow functions to maintain stateful private variables across multiple execution calls.',
    'easy', 1, 0, 16, ARRAY['BCA-442E', 'Unit-1', 'BCA-442E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A function bundled together with references to its surrounding lexical scope, allowing access to outer variables even after the outer function has returned', true, 1, now(), now()),
    (v_q_id, 'Closing a web browser window', false, 2, now(), now()),
    (v_q_id, 'A syntax error that terminates script execution', false, 3, now(), now()),
    (v_q_id, 'A method for encrypting code', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Variable Hoisting in JavaScript?', 'Function declarations and `var` bindings are hoisted to the top of the function/global scope during the creation phase of the Execution Context.',
    'medium', 1, 0, 17, ARRAY['BCA-442E', 'Unit-1', 'BCA-442E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The behavior where variable and function declarations are moved to the top of their containing scope during compilation before execution', true, 1, now(), now()),
    (v_q_id, 'Uploading code to a remote server', false, 2, now(), now()),
    (v_q_id, 'Increasing the font size of text in code', false, 3, now(), now()),
    (v_q_id, 'A tool for debugging memory leaks', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is an Immediately Invoked Function Expression (IIFE)?', 'Prior to ES6 block scoping, IIFEs were the primary mechanism for preventing variable pollution of the global `window` object.',
    'medium', 1, 0, 18, ARRAY['BCA-442E', 'Unit-1', 'BCA-442E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A JavaScript function that runs as soon as it is defined: `(function() { ... })();`, traditionally used to create private scope', true, 1, now(), now()),
    (v_q_id, 'A function that runs once a year', false, 2, now(), now()),
    (v_q_id, 'A function that has no name', false, 3, now(), now()),
    (v_q_id, 'A function that takes zero parameters', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the `this` keyword in JavaScript?', '`this` is dynamically bound at call-time depending on invocation: method call (`obj.fn()`), standalone function, `call()`/`apply()`, or constructor (`new`).',
    'medium', 1, 0, 19, ARRAY['BCA-442E', 'Unit-1', 'BCA-442E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A special keyword whose value refers to the current execution context object that called or invoked the function', true, 1, now(), now()),
    (v_q_id, 'A keyword pointing strictly to the current line of code', false, 2, now(), now()),
    (v_q_id, 'A variable holding the computer''s IP address', false, 3, now(), now()),
    (v_q_id, 'A keyword that imports external libraries', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'How do Arrow Functions (`() => {}`) handle the `this` binding?', 'Lexical `this` makes arrow functions ideal for callbacks, eliminating `var self = this;` and `.bind(this)` boilerplate.',
    'easy', 1, 0, 20, ARRAY['BCA-442E', 'Unit-1', 'BCA-442E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Arrow functions do NOT possess their own `this`; they lexically inherit `this` from the enclosing outer scope where they were defined', true, 1, now(), now()),
    (v_q_id, 'Arrow functions set `this` to `null`', false, 2, now(), now()),
    (v_q_id, 'Arrow functions create a brand new global `this`', false, 3, now(), now()),
    (v_q_id, 'Arrow functions cannot access `this`', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the difference between `call()`, `apply()`, and `bind()`?', '`fn.call(ctx, 1, 2)`; `fn.apply(ctx, [1, 2])`; `const bound = fn.bind(ctx); bound(1, 2)`.',
    'medium', 1, 0, 21, ARRAY['BCA-442E', 'Unit-1', 'BCA-442E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, '`call()` invokes function with comma arguments; `apply()` invokes with an array of arguments; `bind()` returns a new function with bound `this`', true, 1, now(), now()),
    (v_q_id, 'They are identical in every way', false, 2, now(), now()),
    (v_q_id, '`call()` is synchronous; `apply()` is asynchronous', false, 3, now(), now()),
    (v_q_id, '`bind()` deletes the function', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Prototypal Inheritance in JavaScript?', 'Unlike classical class-based languages (Java/C++), JavaScript uses dynamic object prototypes; ES6 `class` syntax is merely syntactic sugar over prototypes.',
    'medium', 1, 0, 22, ARRAY['BCA-442E', 'Unit-1', 'BCA-442E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'An inheritance model where objects inherit properties and methods directly from other objects linked via an internal prototype chain (`[[Prototype]]`)', true, 1, now(), now()),
    (v_q_id, 'An inheritance model identical to Java class compilation', false, 2, now(), now()),
    (v_q_id, 'A method for inheriting physical computer hardware', false, 3, now(), now()),
    (v_q_id, 'A tool for backing up source code', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the top of the JavaScript Prototype Chain?', 'Traversing the prototype chain ends when `Object.getPrototypeOf(Object.prototype)` returns `null`.',
    'medium', 1, 0, 23, ARRAY['BCA-442E', 'Unit-1', 'BCA-442E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, '`Object.prototype`, whose prototype is `null`', true, 1, now(), now()),
    (v_q_id, '`Function.prototype`', false, 2, now(), now()),
    (v_q_id, '`window`', false, 3, now(), now()),
    (v_q_id, '`null.prototype`', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the Event Loop in the JavaScript runtime environment?', 'The Event Loop continuously checks if the Call Stack is empty; when empty, it processes pending microtasks, then pushes waiting callbacks from the queue.',
    'easy', 1, 0, 24, ARRAY['BCA-442E', 'Unit-1', 'BCA-442E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The single-threaded concurrency mechanism that orchestrates execution between the Call Stack, Microtask Queue, and Callback Queue', true, 1, now(), now()),
    (v_q_id, 'A while loop that never terminates', false, 2, now(), now()),
    (v_q_id, 'A loop that plays audio files continuously', false, 3, now(), now()),
    (v_q_id, 'A hardware timer inside the CPU', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In what order does the Event Loop process tasks when the Call Stack becomes empty?', 'Microtasks have absolute priority: if a microtask schedules another microtask, both execute before any `setTimeout` macrotask runs.',
    'hard', 1, 0, 25, ARRAY['BCA-442E', 'Unit-1', 'BCA-442E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Microtasks (Promise callbacks, `queueMicrotask`) first until drained, then Render updates, then One Macrotask (`setTimeout`, I/O)', true, 1, now(), now()),
    (v_q_id, 'Macrotasks first, then Microtasks', false, 2, now(), now()),
    (v_q_id, 'Randomly depending on operating system load', false, 3, now(), now()),
    (v_q_id, 'It alternates one microtask and one macrotask', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the output order of: `console.log(1); setTimeout(() => console.log(2), 0); Promise.resolve().then(() => console.log(3)); console.log(4);`?', 'Synchronous code (1, 4) executes immediately on stack; Promise microtask (3) runs next; `setTimeout` macrotask (2) runs last.',
    'medium', 1, 0, 26, ARRAY['BCA-442E', 'Unit-1', 'BCA-442E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, '`1, 4, 3, 2`', true, 1, now(), now()),
    (v_q_id, '`1, 2, 3, 4`', false, 2, now(), now()),
    (v_q_id, '`1, 3, 4, 2`', false, 3, now(), now()),
    (v_q_id, '`4, 3, 2, 1`', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Callback Hell'' (The Pyramid of Doom)?', 'Solved by ES6 Promises and ES8 `async`/`await`, which flatten nested callbacks into sequential linear code structures.',
    'easy', 1, 0, 27, ARRAY['BCA-442E', 'Unit-1', 'BCA-442E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Deeply nested asynchronous callbacks making code unreadable, difficult to maintain, and prone to error-handling bugs', true, 1, now(), now()),
    (v_q_id, 'A computer virus that infects JavaScript files', false, 2, now(), now()),
    (v_q_id, 'An infinite loop that crashes web browsers', false, 3, now(), now()),
    (v_q_id, 'A program that makes thousands of telephone calls', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What are the three possible states of an ES6 Promise?', 'A Promise begins in the `Pending` state and transitions irreversibly to either `Fulfilled` with a value or `Rejected` with an error.',
    'easy', 1, 0, 28, ARRAY['BCA-442E', 'Unit-1', 'BCA-442E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Pending, Fulfilled (Resolved), and Rejected', true, 1, now(), now()),
    (v_q_id, 'Start, Running, and Stopped', false, 2, now(), now()),
    (v_q_id, 'Open, Processing, and Closed', false, 3, now(), now()),
    (v_q_id, 'Input, Output, and Error', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What does `Promise.all([p1, p2, p3])` do?', 'Used when multiple concurrent requests must all succeed before proceeding (e.g., loading user profile, courses, and notifications).',
    'medium', 1, 0, 29, ARRAY['BCA-442E', 'Unit-1', 'BCA-442E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Fulfills when all input promises resolve successfully; rejects immediately if ANY single promise rejects (''fail-fast'')', true, 1, now(), now()),
    (v_q_id, 'Runs only the first promise that finishes', false, 2, now(), now()),
    (v_q_id, 'Runs promises one after another sequentially', false, 3, now(), now()),
    (v_q_id, 'Deletes all failed promises', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What does `Promise.allSettled([p1, p2, p3])` introduced in ES2020 do?', 'Unlike `Promise.all()`, `allSettled()` never short-circuits on rejection, allowing developers to see which specific requests succeeded or failed.',
    'medium', 1, 0, 30, ARRAY['BCA-442E', 'Unit-1', 'BCA-442E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Waits for all input promises to settle (either resolve OR reject) and returns an array of outcome objects with statuses', true, 1, now(), now()),
    (v_q_id, 'Rejects if any promise rejects', false, 2, now(), now()),
    (v_q_id, 'Settles the legal debts of a company', false, 3, now(), now()),
    (v_q_id, 'Runs only resolved promises', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What does `Promise.race([p1, p2])` do?', 'Ideal for implementing network timeouts: racing a `fetch(url)` against a `timeout(5000)` promise.',
    'medium', 1, 0, 31, ARRAY['BCA-442E', 'Unit-1', 'BCA-442E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Resolves or rejects as soon as the first promise in the iterable settles, adopting its value or error', true, 1, now(), now()),
    (v_q_id, 'Runs a car racing video game', false, 2, now(), now()),
    (v_q_id, 'Tests which promise uses less memory', false, 3, now(), now()),
    (v_q_id, 'Rejects all promises', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What does the `async` keyword placed before a function declaration guarantee?', '`async` functions enable using the `await` expression inside their body, pausing execution until the awaited Promise resolves.',
    'easy', 1, 0, 32, ARRAY['BCA-442E', 'Unit-1', 'BCA-442E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The function automatically returns a Promise (wrapping non-promise returns in `Promise.resolve()`)', true, 1, now(), now()),
    (v_q_id, 'The function executes in another thread', false, 2, now(), now()),
    (v_q_id, 'The function executes twice as fast', false, 3, now(), now()),
    (v_q_id, 'The function cannot use variables', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What does the `await` operator do inside an `async` function?', '`await` pauses only the local async function execution context non-blockingly, allowing the rest of the page to handle other events.',
    'easy', 1, 0, 33, ARRAY['BCA-442E', 'Unit-1', 'BCA-442E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Pauses execution of the async function until the Promise resolves or rejects, unwrapping the resolved value', true, 1, now(), now()),
    (v_q_id, 'Pauses the entire operating system', false, 2, now(), now()),
    (v_q_id, 'Blocks the main browser UI thread from scrolling', false, 3, now(), now()),
    (v_q_id, 'Deletes the promise', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Event Bubbling in the browser Document Object Model (DOM)?', 'Enables the **Event Delegation** pattern: attaching a single event listener to a parent `<ul>` rather than dozens of child `<li>` items.',
    'medium', 1, 0, 34, ARRAY['BCA-442E', 'Unit-1', 'BCA-442E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'When an event triggers on a DOM element, it executes on that element, then bubbles upwards through ancestor parents to `document` and `window`', true, 1, now(), now()),
    (v_q_id, 'Creating soap bubbles on the screen using CSS', false, 2, now(), now()),
    (v_q_id, 'An event deleting elements from the DOM', false, 3, now(), now()),
    (v_q_id, 'An event that only runs on mobile phones', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What does `event.stopPropagation()` do?', 'Stops the event from triggering listeners registered on parent ancestor elements.',
    'medium', 1, 0, 35, ARRAY['BCA-442E', 'Unit-1', 'BCA-442E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Prevents the event from traversing further up (or down) the DOM tree during bubbling or capturing phases', true, 1, now(), now()),
    (v_q_id, 'Prevents the default browser action (like following a link)', false, 2, now(), now()),
    (v_q_id, 'Closes the web browser window', false, 3, now(), now()),
    (v_q_id, 'Deletes the target HTML element', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What does `event.preventDefault()` do?', 'Allows JavaScript SPA frameworks to intercept form submit events or anchor tag clicks without full page reloads.',
    'easy', 1, 0, 36, ARRAY['BCA-442E', 'Unit-1', 'BCA-442E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Cancels the default browser action associated with the event (e.g., stops a form from submitting or a link from navigating)', true, 1, now(), now()),
    (v_q_id, 'Stops the event from bubbling', false, 2, now(), now()),
    (v_q_id, 'Disables the computer mouse', false, 3, now(), now()),
    (v_q_id, 'Closes the current webpage tab', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the Spread Operator (`...`) in modern JavaScript?', 'Used for shallow cloning (`const clone = { ...original };`) and concatenating arrays without mutation.',
    'easy', 1, 0, 37, ARRAY['BCA-442E', 'Unit-1', 'BCA-442E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Expands an iterable (array, string, object) into individual elements or key-value pairs (e.g., `[...arr1, ...arr2]`)', true, 1, now(), now()),
    (v_q_id, 'A mathematical division operator', false, 2, now(), now()),
    (v_q_id, 'A tool for deleting items from arrays', false, 3, now(), now()),
    (v_q_id, 'An operator that multiplies numbers by three', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the Rest Parameter (`...`) in a function signature?', 'Replaces the legacy, non-array `arguments` object with a genuine JavaScript array that supports `map()`, `filter()`, etc.',
    'easy', 1, 0, 38, ARRAY['BCA-442E', 'Unit-1', 'BCA-442E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Collects an indefinite number of trailing arguments into a single formal Array: `function fn(a, b, ...rest) {}`', true, 1, now(), now()),
    (v_q_id, 'Pauses a function for five seconds', false, 2, now(), now()),
    (v_q_id, 'Deletes all arguments passed to a function', false, 3, now(), now()),
    (v_q_id, 'A parameter that is optional', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Destructuring Assignment in ES6?', 'Drastically reduces boilerplate code when accessing multiple properties from API response objects.',
    'easy', 1, 0, 39, ARRAY['BCA-442E', 'Unit-1', 'BCA-442E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A syntax expression that unpacks values from arrays, or properties from objects, into distinct variables: `const { name, age } = user;`', true, 1, now(), now()),
    (v_q_id, 'Deleting an object from memory', false, 2, now(), now()),
    (v_q_id, 'Decompiling JavaScript code into machine code', false, 3, now(), now()),
    (v_q_id, 'A tool for destroying computer hardware', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What are Template Literals in ES6?', 'Supports string interpolation: `` `Hello, ${user.name}! You have ${items.length} items.` `` without messy string concatenation.',
    'easy', 1, 0, 40, ARRAY['BCA-442E', 'Unit-1', 'BCA-442E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'String literals delimited with backticks (`` ` ``) allowing multi-line strings and embedded expressions via `${expression}`', true, 1, now(), now()),
    (v_q_id, 'HTML templates stored on a server', false, 2, now(), now()),
    (v_q_id, 'Text files stored in a database', false, 3, now(), now()),
    (v_q_id, 'Strings that can only contain capital letters', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Optional Chaining (`?.`) introduced in ES2020?', '`user?.address?.city` safely evaluates to `undefined` if `user.address` is `null` or `undefined`, preventing crashes.',
    'easy', 1, 0, 41, ARRAY['BCA-442E', 'Unit-1', 'BCA-442E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'An operator that accesses nested object properties safely, returning `undefined` instead of throwing a TypeError if a reference is nullish', true, 1, now(), now()),
    (v_q_id, 'A tool for chaining multiple mathematical operations', false, 2, now(), now()),
    (v_q_id, 'A method for linking multiple web pages together', false, 3, now(), now()),
    (v_q_id, 'An operator that deletes missing properties', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the Nullish Coalescing Operator (`??`) in ES2020?', 'Unlike `||` (which treats `0`, `""`, and `false` as falsy), `??` treats `0` and `""` as valid values, replacing only `null` and `undefined`.',
    'medium', 1, 0, 42, ARRAY['BCA-442E', 'Unit-1', 'BCA-442E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A logical operator that returns its right-hand operand when its left-hand operand is `null` or `undefined`, and otherwise returns its left operand', true, 1, now(), now()),
    (v_q_id, 'An operator that checks whether two numbers are equal', false, 2, now(), now()),
    (v_q_id, 'A tool for deleting null values from databases', false, 3, now(), now()),
    (v_q_id, 'An operator that turns text into null', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a JavaScript Map object?', 'Unlike plain objects (which coerce all keys to strings or symbols), `Map` preserves key types, remembers insertion order, and has an $O(1)$ `.size` property.',
    'medium', 1, 0, 43, ARRAY['BCA-442E', 'Unit-1', 'BCA-442E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A keyed collection of key-value pairs where keys can be of ANY type (including objects, functions, and primitives)', true, 1, now(), now()),
    (v_q_id, 'A geographical map displayed in a web browser', false, 2, now(), now()),
    (v_q_id, 'A method that iterates over arrays', false, 3, now(), now()),
    (v_q_id, 'A tool for locating lost computer files', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a JavaScript Set object?', 'Useful for rapid deduplication of arrays: `const unique = [...new Set(array)];`.',
    'easy', 1, 0, 44, ARRAY['BCA-442E', 'Unit-1', 'BCA-442E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A collection of values where each value must be unique; duplicate values are automatically ignored and discarded', true, 1, now(), now()),
    (v_q_id, 'A mathematical equation', false, 2, now(), now()),
    (v_q_id, 'A tool for setting computer dates and times', false, 3, now(), now()),
    (v_q_id, 'A list of employee phone numbers', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a WeakMap in JavaScript?', 'Prevents memory leaks when associating metadata with DOM nodes; when the DOM node is removed, its WeakMap entry is collected automatically.',
    'hard', 1, 0, 45, ARRAY['BCA-442E', 'Unit-1', 'BCA-442E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A collection of key-value pairs where keys must be objects and are held weakly, allowing unreferenced objects to be garbage collected', true, 1, now(), now()),
    (v_q_id, 'A map that has very few items stored in it', false, 2, now(), now()),
    (v_q_id, 'A map that is slow to query', false, 3, now(), now()),
    (v_q_id, 'A map that can only be accessed on weekends', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What are JavaScript Generator Functions (`function*`) and `yield`?', 'Used in Redux Saga and streaming pipelines to produce iterable sequences on demand without loading all data into memory at once.',
    'hard', 1, 0, 46, ARRAY['BCA-442E', 'Unit-1', 'BCA-442E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Functions that can be paused at `yield` statements and resumed later by calling `.next()`, maintaining execution state across pauses', true, 1, now(), now()),
    (v_q_id, 'Functions that generate electricity inside computers', false, 2, now(), now()),
    (v_q_id, 'Functions that generate random numbers', false, 3, now(), now()),
    (v_q_id, 'Functions that compile code into machine language', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Strict Mode (`"use strict";`) in JavaScript?', 'Disallows creating undeclared variables (`foo = 1;` throws `ReferenceError`), prohibits duplicate parameter names, and secures `this`.',
    'easy', 1, 0, 47, ARRAY['BCA-442E', 'Unit-1', 'BCA-442E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A feature that opts into a restricted variant of JavaScript, eliminating silent errors, preventing accidental globals, and throwing errors on bad syntax', true, 1, now(), now()),
    (v_q_id, 'A mode that makes programmers type very carefully', false, 2, now(), now()),
    (v_q_id, 'A setting that turns off computer monitors', false, 3, now(), now()),
    (v_q_id, 'A tool for checking employee attendance', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the difference between `Array.prototype.map()` and `Array.prototype.forEach()`?', '`map()` is a pure functional transformation; `forEach()` is an imperative iteration loop.',
    'easy', 1, 0, 48, ARRAY['BCA-442E', 'Unit-1', 'BCA-442E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, '`map()` returns a brand new transformed array without mutating the original; `forEach()` executes a callback for side-effects and returns `undefined`', true, 1, now(), now()),
    (v_q_id, '`map()` is for numbers; `forEach()` is for strings', false, 2, now(), now()),
    (v_q_id, '`forEach()` is faster than `map()` in every case', false, 3, now(), now()),
    (v_q_id, 'There is no difference', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What does `Array.prototype.reduce()` do?', 'Used to sum numbers, group objects by category, or flatten arrays: `arr.reduce((acc, val) => acc + val, 0)`.',
    'medium', 1, 0, 49, ARRAY['BCA-442E', 'Unit-1', 'BCA-442E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Executes a user-supplied reducer callback function on each element of the array, resulting in a single composite output value', true, 1, now(), now()),
    (v_q_id, 'Reduces the font size of text in arrays', false, 2, now(), now()),
    (v_q_id, 'Deletes half of the elements in an array', false, 3, now(), now()),
    (v_q_id, 'Compresses an array into a zip file', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What are Symbols in JavaScript (`Symbol(''desc'')`)?', 'Every `Symbol()` call returns a completely unique token: `Symbol(''id'') !== Symbol(''id'')`, preventing property key collision in libraries.',
    'medium', 1, 0, 50, ARRAY['BCA-442E', 'Unit-1', 'BCA-442E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A unique and immutable primitive data type often used to add hidden, non-enumerable private object property keys that never collide', true, 1, now(), now()),
    (v_q_id, 'Graphic icons displayed on websites', false, 2, now(), now()),
    (v_q_id, 'Mathematical punctuation marks', false, 3, now(), now()),
    (v_q_id, 'Letters in foreign alphabets', false, 4, now(), now());

END $SEEDED_BLOCK$;
