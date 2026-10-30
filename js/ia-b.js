export const topic = {
  id: "IA-B",
  title: "Criterion B · Planning",
  kicker: "Internal assessment · 4 marks · about 150 words",
  lede: "Planning shows how you break the Criterion A scenario into parts, and how you will design, build, test and evaluate against the success criteria. Diagrams do most of the work; the prose stays short.",
  chips: ["Criterion B", "4 marks", "≈ 150 words", "SL and HL"],
  mapTitle: "What Criterion B asks",
  mapLede: "Two constructions: a reasonable decomposition of the problem, and a plan that addresses the success criteria.",
  map: [
    ["#product", "B.1", "Product decomposition", "Modules or components, each tied to success criteria."],
    ["#tasks", "B.2", "Task decomposition", "Ordered work across planning, design, development, testing and evaluation."],
    ["#plan", "B.3", "The plan", "Chronology, estimates, and research such as libraries you will use."],
  ],
  sections: [
    {
      id: "bands",
      nav: "Markbands",
      kicker: "Criterion B · Planning · 4 marks",
      title: "Decompose, then plan against the criteria",
      lede: "The plan must stay consistent with Criterion A. Top marks need a reasonable decomposition and a plan that addresses the success criteria, not only some of them.",
      blocks: [
        {
          type: "pair",
          able: [
            "Break the problem into essential components that support a build plan.",
            "Show how each success criterion is covered by those components.",
            "Present a chronology for planning, designing, developing, testing and evaluating.",
          ],
          notes: [
            "Recommended length: about 150 words. Put weight into diagrams.",
            "Gantt or agile-style charts are accepted ways to show chronology.",
            "Research, such as libraries you will rely on, belongs here when it affects the plan.",
          ],
        },
        {
          type: "table",
          title: "Level descriptors",
          head: ["Marks", "The response"],
          rows: [
            ["0", "Does not reach the standard below."],
            ["1–2", "Constructs a partial decomposition; constructs a plan that addresses some of the success criteria."],
            ["3–4", "Constructs a reasonable decomposition; constructs a plan that addresses the success criteria."],
          ],
        },
        { type: "callout", kind: "note", label: "Source", text: "Criterion B markbands, the 150-word recommendation, the note that plans may include research such as code libraries, and the clarification of decomposition / reasonable decomposition are from the IB Diploma Programme Computer science guide (first assessment 2027), Internal assessment, Criterion B: Planning. The guide also names Gantt and agile-style charts as effective supports." },
      ],
    },
    {
      id: "product",
      nav: "Product",
      kicker: "Product decomposition",
      title: "What the system is made of",
      lede: "Product decomposition splits a complex product into subsystems, modules or components so you can design, analyse and build them. It is how you manage complexity and see the interactions.",
      blocks: [
        {
          type: "list",
          items: [
            "Identify the components the solution needs.",
            "Show how each Criterion A success criterion is addressed by one or more components.",
            "Keep components essential. A decorative split that does not support the plan is not reasonable.",
          ],
        },
        { type: "h3", text: "Useful artefacts" },
        {
          type: "list",
          items: [
            "A UML component diagram: modules and their dependencies.",
            "Use case diagrams: the solution from each stakeholder's view.",
            "A high-level flowchart of how modules connect.",
            "A structure diagram that breaks the solution into manageable parts.",
            "A short bulleted list of components with one-line descriptions, if a diagram needs a key.",
          ],
        },
        { type: "callout", kind: "note", label: "Source", text: "The requirement to decompose the problem scenario into components comes from the guide. The product-decomposition checklist and suggested diagram types are from class IA notes expanding that requirement." },
      ],
    },
    {
      id: "tasks",
      nav: "Tasks",
      kicker: "Task decomposition",
      title: "What you will do, in order",
      lede: "Task decomposition breaks the development process into subtasks. List the work so that design, development and testing of every component appear, across the five stages: planning, designing, developing, testing and evaluation.",
      blocks: [
        {
          type: "list",
          items: [
            "Cover all five stages: planning, designing, developing, testing, evaluation.",
            "Assign tasks for the design, development and testing of each component from the product decomposition.",
            "Order the tasks so dependencies make sense.",
            "Estimate the time each task needs.",
          ],
        },
        { type: "p", text: "A Gantt chart is a clear way to show order and duration. Keep an editable original. The documentation only needs screenshots, but you may need to update the chart as the project moves." },
        { type: "callout", kind: "note", label: "Source", text: "The guide requires a chronology for planning, designing, developing, testing and evaluating. The five-stage task checklist and the advice to keep an editable Gantt are from class IA notes." },
      ],
    },
    {
      id: "plan",
      nav: "Plan",
      kicker: "The plan",
      title: "Address every success criterion",
      lede: "The plan is the bridge from Criterion A into the build. A stranger should see when each criterion will be designed, implemented and tested.",
      blocks: [
        {
          type: "table",
          title: "Plan checks",
          head: ["Check", "Pass when"],
          rows: [
            ["Coverage", "Every success criterion appears in at least one design, build or test task"],
            ["Components", "Every component from the decomposition has design and test work"],
            ["Order", "Blocked work is not scheduled before its dependencies"],
            ["Research", "Libraries or tools you will use are named where they affect the schedule"],
            ["Realism", "Estimates fit the 35-hour recommendation and your actual access to hardware or data"],
          ],
        },
        { type: "callout", kind: "note", label: "Source", text: "Addressing the success criteria in the plan is required by the guide's Criterion B descriptors. The plan-checks table is class teaching material." },
        { type: "callout", kind: "exam", label: "Exam watch", text: "Partial decomposition plus a plan that only touches some criteria sits in 1–2. If SC7 never appears in the plan, Criterion B is already capped, and Criterion E will have nothing solid to evaluate for that criterion." },
        { type: "more", href: "ia-c-system-overview.html", label: "Next: Criterion C System overview" },
      ],
    },
  ],
  mcqs: [
    {
      q: "What does a reasonable decomposition do?",
      options: [
        "Lists every file name you might create",
        "Breaks the scenario into essential components that support a plan",
        "Retells Criterion A without naming parts",
        "Is only a Gantt chart with no components",
      ],
      answer: 1,
      why: "The syllabus clarification says a reasonable decomposition breaks the problem into essential components that support constructing a plan. Diagrams help, but a Gantt chart alone is the chronology, not the product split.",
    },
    {
      q: "Which plan weakness belongs in the 1–2 band?",
      options: [
        "Addresses every success criterion with a clear chronology",
        "Addresses only some success criteria",
        "Uses a Gantt chart",
        "Mentions a library you will research",
      ],
      answer: 1,
      why: "The lower band constructs a plan that addresses some of the success criteria. Top marks need the criteria covered. Charts and research are allowed tools, not penalties.",
    },
  ],
  checks: [
    "Draw or list the product components and map each success criterion onto them.",
    "Produce a task list or Gantt that covers design, develop and test for each component.",
    "Confirm every Criterion A success criterion appears in the plan.",
    "Keep an editable chart even if the PDF only shows a screenshot.",
  ],
};
