export const topic = {
  id: "B2.5",
  title: "File processing",
  kicker: "IB DP Computer Science · Theme B · SL and HL",
  lede: "A file keeps data after the program stops. This page opens a text file, reads it, writes it, appends to it, and closes it. The examples are Python 3. The functions are open, read, readline, write and close.",
  chips: ["B2.5", "SL and HL", "Python 3"],
  mapTitle: "The statement in B2.5",
  mapLede: "There is one statement, for SL and HL. It covers text files and the modes read, write and append.",
  map: [
    ["#files", "B2.5.1", "File processing", "Open a text file, read it, write it, append to it, and close it."],
  ],
  sections: [
    {
      id: "files",
      nav: "Files",
      kicker: "B2.5.1 · Construct code to perform file-processing operations",
      title: "Open a text file, use it, then close it",
      lede: "A text file is a sequence of characters stored by name. The program opens it in a mode, uses read or write operations, and closes it so the data is finished and the resource is released.",
      blocks: [
        {
          type: "pair",
          able: [
            "Open a text file for reading, writing or appending.",
            "Read a whole file or one line, and write text to a file.",
            "Close the file, including when you use with.",
          ],
          notes: [
            "Write mode replaces the old contents. Append mode keeps them.",
            "A path is relative to the folder where the program is run.",
            "A missing file on open for reading raises FileNotFoundError. That failure was introduced in B2.1.3.",
          ],
        },
        { type: "h3", text: "Three modes" },
        { type: "p", text: "open takes the file name and a mode. `\"r\"` reads. The file must already exist. `\"w\"` writes a new file, and if a file of that name already exists its contents are discarded as soon as the file is opened. `\"a\"` appends: the old contents stay, and new text is added at the end. `encoding=\"utf-8\"` says how characters are stored, so a name with an accent survives a round trip." },
        {
          type: "table",
          title: "What each mode does to the existing text",
          head: ["Mode", "File must exist?", "Existing text", "Where new text goes"],
          rows: [
            ["\"r\"", "Yes", "Unchanged", "Nowhere. This mode reads"],
            ["\"w\"", "No. It is created", "Discarded", "At the start of an empty file"],
            ["\"a\"", "No. It is created", "Kept", "After the last existing character"],
          ],
        },
        { type: "h3", text: "Write, then read it back" },
        { type: "p", text: "write sends a string to the file. It does not add a newline unless the string contains one. readline returns the next line, including the newline at the end, or an empty string when there are no more lines. read returns the rest of the file from the current position. A for loop over the file yields one line at a time, which is the usual way to traverse every line." },
        {
          type: "code",
          title: "close is a call you write yourself",
          source: `log = open("notes.txt", "w", encoding="utf-8")
log.write("Mei\\n")
log.close()

log = open("notes.txt", encoding="utf-8")
print(log.read().strip())  # Mei
log.close()`,
          caption: "The first open uses \"w\", so the file is created or emptied, and write stores Mei plus a newline. close finishes that write. The second open uses the default mode, \"r\". strip removes the newline so the print shows Mei. The file is closed again.",
        },
        { type: "p", text: "`with` opens the file and closes it when the block ends, including when the block raises an exception. The close still happens. You do not write the close call yourself. Both forms satisfy the requirement to close the file. `with` is the one that still closes it if a later line fails." },
        {
          type: "code",
          title: "Write mode empties the file. Append mode does not.",
          source: `with open("log.txt", "w", encoding="utf-8") as log:
    log.write("start\\n")

with open("log.txt", "w", encoding="utf-8") as log:
    log.write("replaced\\n")

with open("log.txt", "a", encoding="utf-8") as log:
    log.write("added\\n")

with open("log.txt", encoding="utf-8") as log:
    first = log.readline()
    rest = log.read()
print(first.strip())  # replaced
print(rest.strip())   # added`,
          caption: "The second \"w\" discards start before replaced is written. \"a\" keeps replaced and adds a second line. readline takes the first line. read takes whatever is left, which is the appended line. Each with closes the file at the end of its block.",
        },
        {
          type: "code",
          title: "Traverse the lines",
          source: `rows = []
with open("log.txt", encoding="utf-8") as log:
    for line in log:
        rows.append(line.strip())
print(rows)  # ['replaced', 'added']`,
          caption: "The loop is the traversal. strip removes the newline from each line. This listing reads the file the previous listing left behind. Run that one first, or write the two lines yourself.",
        },
        { type: "p", text: "The second listing depends on the file the first one created. In a single program you would keep them together. The point of separating them here is the mode. Opening with `\"w\"` is itself the operation that throws the old text away. You do not have to overwrite each old line." },
        { type: "h3", text: "A file that is not there" },
        { type: "p", text: "Opening a missing file for reading raises FileNotFoundError. That is the resource-unavailability failure from B2.1.3. The file name might be wrong, or the program might be running in a different folder from the one that holds the file. try/except handles it. Writing and appending do not raise that error for a missing file: those modes create it." },
        {
          type: "code",
          title: "Reading a file that does not exist",
          source: `try:
    open("missing-marks.txt", encoding="utf-8")
except FileNotFoundError:
    print("FileNotFoundError")`,
          caption: "The except block runs, prints FileNotFoundError, and the program continues. There is no file to close, because open did not succeed.",
        },
        { type: "callout", kind: "exam", label: "Exam watch", text: "Say what the mode does to the old contents before you describe the new text. \"w\" followed by write does not append. \"a\" does not empty the file. A trace of readline should include the newline, unless the code strips it. And a file that was opened needs a close, either as a call or as the end of a with block." },
        { type: "more", href: "b2-1-programming-fundamentals.html", label: "Back to B2.1 Programming fundamentals" },
      ],
    },
  ],
  mcqs: [
    {
      q: "A file already contains the line start. The program opens it with \"w\" and writes replaced. What does the file contain afterwards?",
      options: [
        "start, then replaced",
        "replaced only",
        "start only, because write never deletes",
        "Nothing. \"w\" deletes the file name as well",
      ],
      answer: 1,
      why: "\"w\" discards the existing contents when the file is opened. The following write stores replaced in an empty file. Append mode, \"a\", is what would have kept start.",
    },
    {
      q: "A file contains two lines. readline has just returned the first line. What does read return?",
      options: [
        "The first line again",
        "The whole file, including the first line",
        "The remainder of the file, starting after the line already read",
        "An error, because read and readline cannot be used on the same file",
      ],
      answer: 2,
      why: "Reading moves a position through the file. readline consumes the first line. read returns what is left from that position. It does not start again at the beginning.",
    },
    {
      q: "Which opening creates a missing file instead of raising FileNotFoundError?",
      options: [
        "open(name, encoding=\"utf-8\"), which reads",
        "open(name, \"w\", encoding=\"utf-8\")",
        "Both the read and the write",
        "Neither. A missing file always raises FileNotFoundError",
      ],
      answer: 1,
      why: "Read mode requires the file to exist. Write mode creates it. Append mode creates it too. The tempting last option treats every open as a read.",
    },
    {
      q: "A with block opens a file and then raises an exception before the end of the block. What happens to the file?",
      options: [
        "It stays open, because close was not written",
        "It is closed when the with block exits, including because of the exception",
        "It is deleted",
        "The exception is ignored",
      ],
      answer: 1,
      why: "with closes the file when the block ends, whether the block finishes normally or raises. The exception still propagates. close is done for you. It is not skipped.",
    },
  ],
  checks: [
    "State what \"r\", \"w\" and \"a\" each do to a file that already has text.",
    "Write a program that creates a text file, writes two lines, and closes it.",
    "Read the first line with readline and the rest with read, and say where the newline goes.",
    "Traverse every line of a file and build a list of the stripped lines.",
    "Explain what with closes, including when the block raises an exception.",
    "Handle a missing file on open for reading, and name the exception.",
  ],
};
