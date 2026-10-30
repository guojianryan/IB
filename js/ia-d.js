export const topic = {
  id: "IA-D",
  title: "Criterion D · Development",
  kicker: "Internal assessment · 12 marks · about 1,000 words",
  lede: "Criterion D is the largest mark. Build a product that implements the Criterion C algorithms, justify the techniques you used, and show that testing for correctness, reliability and efficiency worked. The video is part of the evidence.",
  chips: ["Criterion D", "12 marks", "≈ 1,000 words", "SL and HL"],
  mapTitle: "What Criterion D asks",
  mapLede: "Four strands: a functional product, appropriate implementation techniques, evaluated choices, and a justified testing strategy with video evidence.",
  map: [
    ["#product", "D.1", "The product", "Fully functional against the planned algorithms and success criteria."],
    ["#techniques", "D.2", "Techniques", "How you coded the algorithms: structures, libraries, tools."],
    ["#testing", "D.3", "Testing and video", "Correctness, reliability, efficiency, shown in the documentation and the video."],
  ],
  sections: [
    {
      id: "bands",
      nav: "Markbands",
      kicker: "Criterion D · Development · 12 marks",
      title: "Function, techniques, choices, testing",
      lede: "Development must stay consistent with A, B and C. The top band needs a fully functional product, appropriate techniques, evaluated choices, and a justified testing strategy.",
      blocks: [
        {
          type: "pair",
          able: [
            "Construct a product that implements the planned algorithms.",
            "Evaluate the coding techniques and structural choices you made.",
            "Justify testing for correctness, reliability and efficiency, with examples in the video.",
          ],
          notes: [
            "Recommended length: about 1,000 words. This is where most of the word budget sits.",
            "Techniques means the programming process: how algorithms became code.",
            "Code excerpts in the documentation must point to the full source in the appendices.",
          ],
        },
        {
          type: "table",
          title: "Level descriptors",
          head: ["Marks", "The response"],
          rows: [
            ["0", "Does not reach the standard below."],
            ["1–3", "Very limited functionality; no appropriate techniques; states choices; states the testing strategy."],
            ["4–6", "Limited functionality; at least one appropriate technique; outlines choices; states the effectiveness of testing."],
            ["7–9", "Partial functionality; some appropriate techniques; explains choices; describes the effectiveness of testing."],
            ["10–12", "Fully functional product; appropriate techniques; evaluates choices; justifies the effectiveness of testing."],
          ],
        },
        { type: "callout", kind: "note", label: "Source", text: "Criterion D markbands, the 1,000-word recommendation, and the requirement that testing cover correctness, reliability and efficiency are from the IB Diploma Programme Computer science guide (first assessment 2027), Internal assessment, Criterion D: Development." },
        { type: "callout", kind: "exam", label: "Command terms", text: "State → outline → explain → evaluate / justify. The same project can sit mid-band on functionality and higher on testing, or the reverse. Best-fit looks at the balance across all four bullets." },
      ],
    },
    {
      id: "product",
      nav: "Build",
      kicker: "The product",
      title: "Build what Criterion C described",
      lede: "The product is the completed software. Fully functional means it performs as the system overview and success criteria required, not that every stretch goal you imagined on day one shipped.",
      blocks: [
        {
          type: "list",
          items: [
            "Implement the algorithms from Criterion C.",
            "Keep structure justified: why these modules, classes or files.",
            "Highlight key excerpts in the documentation, with comments, consistent style and a reference into the appendix.",
            "If you extend an existing system, document clearly which parts are yours.",
          ],
        },
        { type: "p", text: "Without a full-source appendix, you cannot be awarded full marks for the techniques demonstrated in Criterion D. Put the complete code in the appendices PDF even though examiners are not required to read it as evidence." },
        { type: "callout", kind: "note", label: "Source", text: "Guide clarification: techniques means programming the algorithms in code; documentation must highlight key excerpts with comments; excerpts must reference the full source in the appendix. Solutions without that appendix cannot receive full marks for techniques in Criterion D." },
      ],
    },
    {
      id: "techniques",
      nav: "Techniques",
      kicker: "Techniques and choices",
      title: "Show the programming, not only the screens",
      lede: "Techniques are how you programmed the algorithms. Loops, data structures, libraries and integrated tools all count when you use them to implement the design.",
      blocks: [
        {
          type: "list",
          items: [
            "Name the techniques that matter for efficiency and correctness.",
            "Evaluate alternatives you rejected, for example a list versus a dictionary, or a library call versus your own parser.",
            "Tie each major choice back to a Criterion C algorithm or a success criterion.",
          ],
        },
        { type: "callout", kind: "note", label: "Source", text: "The guide lists techniques that may include loops, data structures, existing libraries and the integration of software tools. The state → evaluate progression table is class teaching material keyed to the Criterion D command terms." },
        {
          type: "table",
          title: "How depth of discussion rises",
          head: ["Band language", "What to write"],
          rows: [
            ["States", "\"I used a dictionary for the timetable.\""],
            ["Outlines", "\"I used a dictionary keyed by day so lookups skip a linear scan.\""],
            ["Explains", "\"A list of lessons needed a scan per query; the day key makes SC3's one-second search realistic on 5,000 rows.\""],
            ["Evaluates", "\"The dictionary meets SC3 on the test file. It costs extra memory and complicates edits that move a lesson across days; a small relational table would scale further, but for this dataset the dictionary is enough and simpler to test.\""],
          ],
        },
      ],
    },
    {
      id: "testing",
      nav: "Testing",
      kicker: "Testing and video",
      title: "Correctness, reliability, efficiency",
      lede: "Describe and justify the testing strategy in the documentation. Show examples in the video. The video also demonstrates the product's functionality within five minutes.",
      blocks: [
        {
          type: "table",
          title: "Three kinds of test",
          head: ["Kind", "Asks", "Example"],
          rows: [
            ["Correctness", "Does it produce the right result?", "Known input file yields the expected sorted output"],
            ["Reliability", "Does it cope with bad or missing input?", "Corrupt row skipped with a logged warning; app stays up"],
            ["Efficiency", "Does it meet resource or time needs?", "SC3 timing on the agreed data size"],
          ],
        },
        {
          type: "list",
          items: [
            "Reuse the Criterion C test table; record actual results and any fixes.",
            "In the video: full functionality first, then a few sharp testing examples, not a silent scroll through folders.",
            "Justify effectiveness: which success criteria are evidenced, which failed, what you changed.",
          ],
        },
        { type: "callout", kind: "note", label: "Source", text: "The guide requires the video to evidence functionality and testing examples, and requires testing for correctness, reliability and efficiency to be described and justified in the documentation with supporting examples in the video. Video length and format rules are in the guide's Requirements section." },
        { type: "more", href: "ia-e-evaluation.html", label: "Next: Criterion E Evaluation" },
      ],
    },
  ],
  mcqs: [
    {
      q: "Which combination sits in the 10–12 band?",
      options: [
        "Limited product, one technique, stated testing",
        "Partial product, some techniques, described testing",
        "Fully functional product, appropriate techniques, evaluated choices, justified testing",
        "Fully functional product with no video",
      ],
      answer: 2,
      why: "The top descriptor needs all four: full functionality, appropriate techniques, evaluated choices, justified testing. The video is required evidence for functionality and testing examples.",
    },
    {
      q: "Why must the appendices include full source code?",
      options: [
        "Appendices are marked instead of the documentation",
        "Without them, full marks for techniques in Criterion D cannot be awarded",
        "The word count only counts if the appendix is empty",
        "Examiners must re-run every file",
      ],
      answer: 1,
      why: "Appendices are not used as marking evidence in the usual sense, but solutions without full source cannot receive full marks for the techniques shown in Criterion D.",
    },
  ],
  checks: [
    "Implement the Criterion C algorithms into a working product.",
    "Write evaluations of the main coding and structure choices.",
    "Document correctness, reliability and efficiency tests with results.",
    "Record a video under five minutes that shows function and testing examples.",
    "Put complete source code in the appendices and cross-reference excerpts.",
  ],
};
