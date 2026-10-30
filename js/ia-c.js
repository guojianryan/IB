export const topic = {
  id: "IA-C",
  title: "Criterion C · System overview",
  kicker: "Internal assessment · 6 marks · about 150 words",
  lede: "Criterion C turns the plan into a model a third party could rebuild from: components, relationships, interaction rules, algorithms and the user interface, plus a testing strategy aligned with the success criteria.",
  chips: ["Criterion C", "6 marks", "≈ 150 words", "SL and HL"],
  mapTitle: "What Criterion C asks",
  mapLede: "Three strands rise together: a complete system model, algorithms for the components, and a testing strategy that matches the success criteria.",
  map: [
    ["#model", "C.1", "System model", "Diagrams of components, connections and the user interface."],
    ["#algorithms", "C.2", "Algorithms", "Natural language, flowcharts or pseudocode for each component that must run."],
    ["#testing", "C.3", "Testing strategy", "A systematic approach with proposed data and expected outcomes."],
  ],
  sections: [
    {
      id: "bands",
      nav: "Markbands",
      kicker: "Criterion C · System overview · 6 marks",
      title: "Model, algorithms, tests",
      lede: "The overview must stay consistent with Criteria A and B. Top marks need a complete model, algorithms that let the product perform, and a testing strategy aligned with the success criteria.",
      blocks: [
        {
          type: "pair",
          able: [
            "Construct a system model with components, relationships and UI design.",
            "Construct algorithms for those components.",
            "Describe a testing strategy that lines up with the success criteria.",
          ],
          notes: [
            "Recommended length: about 150 words. Clarity in diagrams matters more than long prose.",
            "A complete system model does not itself contain the algorithms. Algorithms are separate.",
            "The model should be clear enough that a third party could recreate the product.",
          ],
        },
        {
          type: "table",
          title: "Level descriptors",
          head: ["Marks", "The response"],
          rows: [
            ["0", "Does not reach the standard below."],
            ["1–2", "Outlines a limited system model; identifies algorithms for the components; identifies a testing strategy for at least one success criterion."],
            ["3–4", "Constructs a system model that is not complete; constructs algorithms that lead to partial functionality; outlines a testing strategy aligned with at least three success criteria."],
            ["5–6", "Constructs a complete system model; constructs algorithms that enable the product to perform; describes a testing strategy that aligns with the success criteria."],
          ],
        },
        { type: "callout", kind: "note", label: "Source", text: "Criterion C markbands and the 150-word recommendation are from the IB Diploma Programme Computer science guide (first assessment 2027), Internal assessment, Criterion C: System overview." },
      ],
    },
    {
      id: "model",
      nav: "Model",
      kicker: "System model",
      title: "Components, links, rules, interface",
      lede: "A system model is a set of diagrams that show the parts of the system and how they connect. It includes the design of the user interface. It also states the rules that govern how parts interact.",
      blocks: [
        {
          type: "list",
          items: [
            "Key components from your Criterion B decomposition.",
            "Relationships and data or control flow between them.",
            "Rules for interaction, such as when one module may call another.",
            "User interface design: screens, inputs, outputs, navigation.",
          ],
        },
        { type: "p", text: "UML class or component diagrams, sequence sketches and interface wireframes are all usable here when they earn their place. Prefer a small set of clear diagrams over many decorative ones." },
        { type: "callout", kind: "note", label: "Source", text: "Guide clarification: a system model consists of diagrams of components and how they are connected, including the user-interface design. A complete system model does not include the algorithms for each component. Those sit beside the model." },
      ],
    },
    {
      id: "algorithms",
      nav: "Algorithms",
      kicker: "Algorithms",
      title: "How each working part behaves",
      lede: "Algorithms address the individual components of the model. Present them in natural language, flowcharts or pseudocode. They should be detailed enough that Criterion D can implement them without inventing the logic from scratch.",
      blocks: [
        {
          type: "list",
          items: [
            "One algorithm per component that performs work, including UI behaviour that encodes rules.",
            "Inputs, outputs and main decisions visible.",
            "Edge cases you already know about, such as empty files or invalid login, named here when they matter.",
          ],
        },
        { type: "callout", kind: "note", label: "Source", text: "The guide allows algorithms in natural language, flow charts or pseudocode, addressing the individual components of the system model." },
        { type: "p", text: "Partial algorithms that only support some of the product sit in the middle band. Algorithms that enable the product to perform, matching the success criteria, sit at the top." },
      ],
    },
    {
      id: "testing",
      nav: "Testing",
      kicker: "Testing strategy",
      title: "A table of intent, before you code",
      lede: "A testing strategy is a systematic approach to checking whether the solution works as intended. It should cover correct behaviour and unexpected or incorrect inputs.",
      blocks: [
        {
          type: "table",
          title: "A usable test table",
          head: ["ID", "Success criterion", "Test data / action", "Expected outcome"],
          rows: [
            ["T1", "SC3 search under 1 s", "Query \"Chen\" on 5,000-row file", "Matching rows shown; timer under 1.0 s"],
            ["T2", "SC5 reject empty password", "Login with blank password", "Error message; no session created"],
            ["T3", "SC8 offline timetable", "Disable network, open app", "Last sync opens; day filter still works"],
          ],
        },
        { type: "callout", kind: "note", label: "Source", text: "Guide clarification: the testing strategy evaluates whether the solution works as intended, including unexpected or incorrect inputs, and can be shown effectively as a table of proposed test data and expected outcomes. The sample rows are class examples." },
        {
          type: "list",
          items: [
            "Align tests with the success criteria. Top marks need alignment with the criteria as a set, not a single sample.",
            "Include normal cases, boundary cases and deliberate bad input.",
            "This table becomes evidence later: Criterion D describes how testing went, and the video shows examples.",
          ],
        },
        { type: "more", href: "ia-d-development.html", label: "Next: Criterion D Development" },
      ],
    },
  ],
  mcqs: [
    {
      q: "What does a complete system model exclude, according to the syllabus clarification?",
      options: [
        "The user interface design",
        "The algorithms for each component",
        "The connections between components",
        "Any diagram at all",
      ],
      answer: 1,
      why: "A complete system model shows components and connections, including UI design. Algorithms are constructed separately for the components.",
    },
    {
      q: "A student outlines a thin model, names algorithms in one sentence each, and gives a test for one success criterion. Which band?",
      options: [
        "1–2",
        "3–4",
        "5–6",
        "These marks sit in Criterion D only",
      ],
      answer: 0,
      why: "That matches limited model, identified algorithms, and a testing strategy for at least one criterion.",
    },
  ],
  checks: [
    "Produce diagrams that name every essential component and how they connect, including the UI.",
    "Write algorithms for each working component in pseudocode or a flowchart.",
    "Build a test table mapped to the Criterion A success criteria.",
    "Check that a classmate could recreate the product from Criterion C alone.",
  ],
};
