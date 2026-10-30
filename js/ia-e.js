export const topic = {
  id: "IA-E",
  title: "Criterion E · Evaluation",
  kicker: "Internal assessment · 4 marks · about 400 words",
  lede: "Criterion E closes the loop with Criterion A. Judge how far the success criteria were met, and justify improvements. Evidence from testing and the video should support the judgement.",
  chips: ["Criterion E", "4 marks", "≈ 400 words", "SL and HL"],
  mapTitle: "What Criterion E asks",
  mapLede: "Two moves: evaluate the success criteria, then justify improvements to the product.",
  map: [
    ["#extent", "E.1", "Extent met", "Criterion-by-criterion judgement with evidence."],
    ["#improve", "E.2", "Improvements", "Justified next steps, not a wish list."],
  ],
  sections: [
    {
      id: "bands",
      nav: "Markbands",
      kicker: "Criterion E · Evaluation · 4 marks",
      title: "Evaluate, then justify",
      lede: "The evaluation must stay consistent with the problem specification and success criteria in Criterion A. Top marks evaluate the extent to which those criteria were met and justify improvements.",
      blocks: [
        {
          type: "pair",
          able: [
            "Evaluate each success criterion with evidence from testing or the video.",
            "Justify concrete improvements linked to weaknesses you found.",
            "Keep the tone honest: unmet criteria belong in the evaluation, not hidden.",
          ],
          notes: [
            "Recommended length: about 400 words.",
            "State and describe sit in 1–2. Evaluate and justify sit in 3–4.",
            "Improvements should follow from the evaluation, not appear as unrelated new features.",
          ],
        },
        {
          type: "table",
          title: "Level descriptors",
          head: ["Marks", "The response"],
          rows: [
            ["0", "Does not reach the standard below."],
            ["1–2", "States the extent to which the success criteria were met; describes improvements to the product."],
            ["3–4", "Evaluates the extent to which the success criteria were met; justifies improvements to the product."],
          ],
        },
      ],
    },
    {
      id: "extent",
      nav: "Extent met",
      kicker: "Extent to which criteria were met",
      title: "Judge against Criterion A, with evidence",
      lede: "Work through the success criteria. For each one, say whether it was met, partially met or not met, and point to the test or video moment that shows why.",
      blocks: [
        {
          type: "table",
          title: "Evaluation pattern",
          head: ["Criterion", "Result", "Evidence", "Judgement"],
          rows: [
            ["SC3 search under 1 s", "Met", "T1 on video at 01:12; 0.4 s on test file", "Meets the requirement on the agreed data size"],
            ["SC5 blank password rejected", "Met", "T2; error path in appendix excerpt D4", "Reliable handling of invalid login"],
            ["SC8 offline timetable", "Partial", "Opens offline; day filter crashes on empty cache", "Core requirement holds; filter needs a guard"],
          ],
        },
        { type: "p", text: "Evaluating means weighing strengths and limits, not only listing passes. If a criterion was met only on small data, say so. If you changed the product after a failed test, say what changed and what the retest showed." },
        { type: "callout", kind: "exam", label: "Exam watch", text: "\"All criteria were met\" with no evidence is a statement, not an evaluation. The 3–4 band expects appraisal. Failed or partial criteria, handled honestly with evidence, support a high mark more than empty praise." },
      ],
    },
    {
      id: "improve",
      nav: "Improvements",
      kicker: "Improvements",
      title: "Justify what you would change next",
      lede: "Improvements are the forward half of the evaluation. Describe is not enough at the top: justify why each improvement would matter for the success criteria or for a clear limitation you found.",
      blocks: [
        {
          type: "list",
          items: [
            "Link each improvement to a weakness in the evaluation, a partial criterion, or a scalability limit you measured.",
            "Say what you would change in the product or process, and why that change is the right response.",
            "Prefer a few justified improvements over a long backlog of ideas.",
          ],
        },
        {
          type: "table",
          title: "Describe versus justify",
          head: ["Describes", "Justifies"],
          rows: [
            ["Add a better UI", "Replace the day filter's unguarded empty-cache path so SC8 is fully met when offline data is missing"],
            ["Make it faster", "Index lessons by day in a file-backed store so SC3 still holds when the export grows past 50,000 rows"],
            ["Add more features", "Add conflict detection for overlapping lessons, because teachers currently resolve clashes by hand and that gap sits outside the original criteria"],
          ],
        },
        { type: "more", href: "ia-computational-solution.html", label: "Back to IA overview" },
      ],
    },
  ],
  mcqs: [
    {
      q: "Which evaluation comment fits the 3–4 band?",
      options: [
        "The product is good and users will like it",
        "SC3 was met; SC8 was partial because the offline filter crashes on an empty cache, shown at 02:01 in the video; a null-cache guard would complete SC8",
        "All success criteria were met",
        "Future work includes machine learning",
      ],
      answer: 1,
      why: "It evaluates extent with evidence and justifies a concrete improvement. Bare statements or unrelated future ideas stay weaker.",
    },
    {
      q: "Criterion E must stay consistent with which earlier work?",
      options: [
        "Only Criterion D's video length",
        "The problem specification and success criteria in Criterion A",
        "Theme A case study material",
        "Whoever moderated last year's sample",
      ],
      answer: 1,
      why: "The syllabus says the evaluation must be consistent with the problem specification and success criteria in Criterion A.",
    },
  ],
  checks: [
    "Evaluate every Criterion A success criterion with evidence.",
    "Admit partial or unmet criteria where the evidence says so.",
    "Justify a short set of improvements linked to those judgements.",
    "Keep the section near the 400-word recommendation.",
  ],
};
