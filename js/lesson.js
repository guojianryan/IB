const CLASS_NAMES = "User Book Member Loan Player Enemy Item Product Cart Order Teacher Person Student Bike Car Date Shape Rectangle Circle Triangle Parent Child Team Engine Hospital Department Folder File Calculator Settings Observer Secret Subject Segment LibraryBook BankAccount ShoppingCart PaymentMethod CardPayment CashPayment BaseNotifier EmailNotifier SMSNotifier PushNotifier NotifierFactory WeatherStation PhoneDisplay TVDisplay AttributeError ValueError TypeError".split(" ");

const CODE_PATTERN = new RegExp(
  [
    "@[A-Za-z_][\\w.]*",
    "==",
    "(?:[A-Za-z_]\\w*(?:\\((?:[^()]|\"[^\"]*\"|'[^']*')*\\))?)(?:\\.[A-Za-z_]\\w*(?:\\((?:[^()]|\"[^\"]*\"|'[^']*')*\\))?)+",
    "\\b[A-Za-z_]\\w*\\((?:[^()]|\"[^\"]*\"|'[^']*')*\\)",
    "\\b_[A-Za-z0-9_]+\\b",
    "\\b[A-Za-z][A-Za-z0-9]*_[A-Za-z0-9_]*\\b",
    "\\b[A-Z][a-z0-9]+(?:[A-Z][A-Za-z0-9]+)+\\b",
    `\\b(?:${CLASS_NAMES.join("|")})\\b`,
    "\\b[a-z][a-z0-9]*\\d[a-z0-9]*\\b",
    "\\b(?:self|cls)\\b",
  ].join("|"),
  "g",
);

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

function richEl(tag, className, text) {
  const node = el(tag, className);
  if (text != null) appendRich(node, text);
  return node;
}

function appendRich(node, text) {
  const value = String(text);
  const parts = value.split("`");
  const balanced = parts.length % 2 === 1;
  const chunks = balanced ? parts : [value];
  chunks.forEach((chunk, index) => {
    if (balanced && index % 2 === 1) {
      node.append(codeEl(chunk));
      return;
    }
    let cursor = 0;
    CODE_PATTERN.lastIndex = 0;
    for (const match of chunk.matchAll(CODE_PATTERN)) {
      if (match.index > cursor) node.append(document.createTextNode(chunk.slice(cursor, match.index)));
      node.append(codeEl(match[0]));
      cursor = match.index + match[0].length;
    }
    if (cursor < chunk.length) node.append(document.createTextNode(chunk.slice(cursor)));
  });
}

function codeEl(text) {
  const code = document.createElement("code");
  code.textContent = text;
  return code;
}

function setRich(node, text) {
  node.replaceChildren();
  appendRich(node, text);
}

function button(label, onClick, className = "btn small") {
  const node = richEl("button", className, label);
  node.type = "button";
  node.addEventListener("click", onClick);
  return node;
}

const PY_KEYWORDS = new Set("False None True and as assert async await break class continue def del elif else except finally for from global if import in is lambda nonlocal not or pass raise return try while with yield self cls".split(" "));
const JAVA_KEYWORDS = new Set("abstract boolean class double extends final implements import int interface new null package private protected public return static this throw throws true false void".split(" "));

function highlight(source, lang) {
  const pre = el("pre", "pseudo");
  const keywords = lang === "java" ? JAVA_KEYWORDS : PY_KEYWORDS;
  const lines = source.replace(/^\n/, "").replace(/\n$/, "").split("\n");
  lines.forEach((line, index) => {
    pre.append(highlightLine(line, keywords, lang));
    if (index < lines.length - 1) pre.append(document.createTextNode("\n"));
  });
  return pre;
}

function token(className, text) {
  if (!className) return document.createTextNode(text);
  return el("span", className, text);
}

function highlightLine(line, keywords, lang) {
  const frag = document.createDocumentFragment();
  let i = 0;
  while (i < line.length) {
    if (line[i] === "#" && lang !== "java") {
      frag.append(token("tok-comment", line.slice(i)));
      break;
    }
    if (lang === "java" && line.startsWith("//", i)) {
      frag.append(token("tok-comment", line.slice(i)));
      break;
    }
    const prefix = /^(fr|rf|f|r|b)/.exec(line.slice(i));
    const quoteAt = prefix ? i + prefix[0].length : i;
    if ((line[quoteAt] === '"' || line[quoteAt] === "'") && (prefix || line[i] === '"' || line[i] === "'")) {
      const quote = line[quoteAt];
      let j = quoteAt + 1;
      while (j < line.length && line[j] !== quote) {
        j += line[j] === "\\" ? 2 : 1;
      }
      frag.append(token("tok-string", line.slice(i, Math.min(line.length, j + 1))));
      i = j + 1;
      continue;
    }
    if (line[i] === "@") {
      const match = /^@[\w.]+/.exec(line.slice(i));
      frag.append(token("tok-fn", match[0]));
      i += match[0].length;
      continue;
    }
    if (/\d/.test(line[i]) && (i === 0 || /[^\w.]/.test(line[i - 1]))) {
      const match = /^\d+(\.\d+)?/.exec(line.slice(i));
      frag.append(token("tok-number", match[0]));
      i += match[0].length;
      continue;
    }
    if (/[A-Za-z_]/.test(line[i])) {
      const match = /^\w+/.exec(line.slice(i));
      const word = match[0];
      const next = line.slice(i + word.length);
      let className = "";
      if (keywords.has(word)) className = "tok-key";
      else if (/^\s*\(/.test(next)) className = "tok-fn";
      frag.append(token(className, word));
      i += word.length;
      continue;
    }
    frag.append(token("", line[i]));
    i += 1;
  }
  return frag;
}

export function renderTopic(topic) {
  const main = document.querySelector("#main");
  const nav = document.querySelector(".nav");
  if (!main) return;
  main.replaceChildren();
  const links = [{ href: "#overview", label: "Overview" }];
  if (topic.map?.length) links.push({ href: "#syllabus", label: "Syllabus" });
  topic.sections.forEach((section) => links.push({ href: `#${section.id}`, label: section.nav || section.title }));
  if (topic.mcqs?.length) links.push({ href: "#practice", label: "Practice" });
  if (topic.checks?.length) links.push({ href: "#review", label: "Review" });
  links.forEach((link) => {
    const anchor = el("a", "", link.label);
    anchor.href = link.href;
    nav?.append(anchor);
  });

  main.append(hero(topic));
  if (topic.map?.length) main.append(syllabusMap(topic));
  topic.sections.forEach((section) => main.append(teach(section)));
  if (topic.mcqs?.length) main.append(practice(topic));
  if (topic.checks?.length) main.append(review(topic));
  watchNav();
}

function hero(topic) {
  const section = el("section", "hero");
  section.id = "overview";
  const wrap = el("div", "wrap");
  wrap.append(el("p", "kicker", topic.kicker));
  wrap.append(el("h1", "", topic.title));
  wrap.append(richEl("p", "lede", topic.lede));
  const actions = el("div", "actions");
  const start = el("a", "btn", "Start the lesson");
  start.href = topic.map?.[0]?.[0] || `#${topic.sections[0].id}`;
  actions.append(start);
  if (topic.mcqs?.length) {
    const practiceLink = el("a", "btn ghost", "Jump to practice");
    practiceLink.href = "#practice";
    actions.append(practiceLink);
  }
  wrap.append(actions);
  const chips = el("ul", "chips");
  (topic.chips || []).forEach((text) => chips.append(el("li", "chip", text)));
  wrap.append(chips);
  section.append(wrap);
  return section;
}

function syllabusMap(topic) {
  const section = el("section", "block");
  section.id = "syllabus";
  const wrap = el("div", "wrap rhythm");
  const head = el("div", "section-head");
  head.append(el("p", "kicker", "Syllabus map"));
  head.append(el("h2", "", topic.mapTitle || "What this topic asks"));
  head.append(richEl("p", "lede", topic.mapLede || "Each card is one syllabus statement. Open it for the explanation, the code, and the points worth remembering."));
  wrap.append(head);
  const grid = el("div", topic.map.length > 4 ? "grid-3" : "grid-2");
  topic.map.forEach(([href, code, title, text]) => {
    const cardLink = el("a", "map-card");
    cardLink.href = href;
    cardLink.append(el("span", "", code));
    cardLink.append(richEl("h3", "", title));
    cardLink.append(richEl("p", "", text));
    grid.append(cardLink);
  });
  wrap.append(grid);
  section.append(wrap);
  return section;
}

function teach(section) {
  const block = el("section", "block");
  block.id = section.id;
  const wrap = el("div", "wrap rhythm");
  const head = el("div", "section-head");
  head.append(el("p", "kicker", section.kicker || ""));
  head.append(richEl("h2", "", section.title));
  if (section.lede) head.append(richEl("p", "lede", section.lede));
  wrap.append(head);
  let prose = null;
  (section.blocks || []).forEach((item) => {
    if (item.type !== "p") {
      prose = null;
      wrap.append(renderBlock(item));
      return;
    }
    if (!prose) {
      prose = el("div", "prose");
      wrap.append(prose);
    }
    prose.append(renderBlock(item));
  });
  block.append(wrap);
  return block;
}

function renderBlock(item) {
  if (item.type === "p") return richEl("p", "teaching", item.text);
  if (item.type === "h3") return richEl("h3", "subhead", item.text);
  if (item.type === "list") return bulletList(item.items);
  if (item.type === "columns") return columns(item);
  if (item.type === "table") return dataTable(item);
  if (item.type === "code") return codeBlock(item);
  if (item.type === "classbox") return classBox(item);
  if (item.type === "uml") return umlDiagram(item);
  if (item.type === "callout") return callout(item.label, item.text, item.kind);
  if (item.type === "pair") return pair(item);
  if (item.type === "lab") return labs[item.name](item);
  if (item.type === "more") {
    const paragraph = el("p", "more");
    const link = el("a", "btn ghost small", item.label);
    link.href = item.href;
    if (item.external) {
      link.target = "_blank";
      link.rel = "noopener";
    }
    paragraph.append(link);
    return paragraph;
  }
  return richEl("p", "teaching", "");
}

function bulletList(items) {
  const list = el("ul", "steps");
  items.forEach((item) => list.append(richEl("li", "", item)));
  return list;
}

function columns(spec) {
  const grid = el("div", spec.items.length > 2 ? "grid-3" : "grid-2");
  spec.items.forEach((column) => {
    const article = el("article", `card${column.tone ? ` ${column.tone}` : ""}`);
    article.append(richEl("h3", "", column.title));
    if (column.text) article.append(richEl("p", "", column.text));
    if (column.points) {
      const list = el("ul");
      column.points.forEach((point) => list.append(richEl("li", "", point)));
      article.append(list);
    }
    grid.append(article);
  });
  return grid;
}

function pair(spec) {
  return columns({
    items: [
      { title: spec.leftTitle || "You should be able to", points: spec.able },
      { title: spec.rightTitle || "Notes and guidance", points: spec.notes },
    ],
  });
}

function dataTable(spec) {
  const box = el("div", "worked");
  if (spec.title) box.append(richEl("h3", "", spec.title));
  if (spec.lede) box.append(richEl("p", "", spec.lede));
  const table = el("table", "sheet");
  const head = el("tr");
  spec.head.forEach((cell) => head.append(richEl("th", "", cell)));
  table.append(head);
  spec.rows.forEach((row) => {
    const line = el("tr");
    row.forEach((cell) => line.append(richEl("td", "", String(cell))));
    table.append(line);
  });
  const scroller = el("div", "out");
  scroller.append(table);
  box.append(scroller);
  return box;
}

function codeBlock(spec) {
  const box = el("figure", "code-figure");
  const bar = el("div", "code-bar");
  bar.append(el("span", "marks", spec.lang || "Python"));
  if (spec.title) bar.append(richEl("span", "", spec.title));
  box.append(bar);
  const scroller = el("div", "code-scroll");
  scroller.tabIndex = 0;
  scroller.append(highlight(spec.source, (spec.lang || "Python").toLowerCase()));
  box.append(scroller);
  if (spec.caption) box.append(richEl("figcaption", "", spec.caption));
  return box;
}

function classBox(spec) {
  const wrap = el("figure", "classbox-wrap");
  const box = el("div", "classbox");
  const header = el("header");
  if (spec.stereo) header.append(el("span", "", spec.stereo));
  header.append(el("strong", "", spec.name));
  box.append(header);
  box.append(compartment(spec.attrs));
  box.append(compartment(spec.ops));
  wrap.append(box);
  if (spec.caption) wrap.append(richEl("figcaption", "", spec.caption));
  return wrap;
}

function memberLine(line) {
  if (line && typeof line === "object") return { text: line.text ?? "", static: Boolean(line.static) };
  return { text: line ?? "", static: false };
}

function compartment(lines) {
  const part = el("div", "compartment");
  const list = el("ul");
  (lines?.length ? lines : [" "]).forEach((line) => {
    const member = memberLine(line);
    list.append(el("li", member.static ? "static-member" : "", member.text));
  });
  part.append(list);
  return part;
}

function callout(label, text, kind) {
  const box = el("aside", `callout ${kind || "note"}`);
  box.append(el("strong", "", label || "Remember"));
  box.append(richEl("p", "", text));
  return box;
}

function svgEl(tag, attrs, text) {
  const node = document.createElementNS("http://www.w3.org/2000/svg", tag);
  Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, String(value)));
  if (text != null) node.textContent = text;
  return node;
}

function compartmentHeight(lines) {
  if (!lines?.length) return 0;
  return lines.length * 20 + 12;
}

function boxHeight(node) {
  const head = node.stereo ? 46 : 32;
  const attrsH = compartmentHeight(node.attrs);
  const opsH = compartmentHeight(node.ops);
  if (!attrsH && !opsH) return head + 8;
  return head + attrsH + opsH;
}

function umlDiagram(spec) {
  const pad = 16;
  const nodes = spec.nodes.map((node) => ({ ...node, h: boxHeight(node) }));
  const byId = Object.fromEntries(nodes.map((node) => [node.id, node]));
  // Fit the viewBox to the drawn boxes so unused height does not scale into a gap.
  const contentW = nodes.reduce((max, node) => Math.max(max, node.x + node.w), 0) + pad;
  const contentH = nodes.reduce((max, node) => Math.max(max, node.y + node.h), 0) + pad;
  const w = Math.max(contentW, 1);
  const h = Math.max(contentH, 1);
  const svg = svgEl("svg", {
    class: "uml-svg",
    viewBox: `0 0 ${w} ${h}`,
    width: String(w),
    height: String(h),
    role: "img",
  });
  svg.append(svgEl("title", {}, spec.label || spec.title || "UML class diagram"));
  (spec.edges || []).forEach((edge) => drawEdge(svg, byId[edge.from], byId[edge.to], edge));
  nodes.forEach((node) => drawClass(svg, node));
  const frame = el("figure", "uml-frame");
  const scroller = el("div", "out");
  scroller.append(svg);
  frame.append(scroller);
  if (spec.caption) frame.append(richEl("figcaption", "", spec.caption));
  return frame;
}

function drawClass(svg, node) {
  const head = node.stereo ? 46 : 32;
  const hasAttrs = Boolean(node.attrs?.length);
  const hasOps = Boolean(node.ops?.length);
  svg.append(svgEl("rect", { class: "uml-box", x: node.x, y: node.y, width: node.w, height: node.h, rx: 8 }));
  svg.append(svgEl("rect", { class: "uml-head", x: node.x + 1, y: node.y + 1, width: node.w - 2, height: head - 1 }));
  if (node.stereo) {
    svg.append(svgEl("text", { class: "uml-stereo", x: node.x + node.w / 2, y: node.y + 16, "text-anchor": "middle" }, node.stereo));
    svg.append(svgEl("text", { class: "uml-name", x: node.x + node.w / 2, y: node.y + 36, "text-anchor": "middle" }, node.name));
  } else {
    svg.append(svgEl("text", { class: "uml-name", x: node.x + node.w / 2, y: node.y + 21, "text-anchor": "middle" }, node.name));
  }
  if (!hasAttrs && !hasOps) return;
  let y = node.y + head;
  if (hasAttrs) y = compartmentLines(svg, node, node.attrs, y);
  else if (hasOps) {
    // Keep a divider under the name when only operations are present.
    svg.append(svgEl("line", { class: "uml-line", x1: node.x, y1: y, x2: node.x + node.w, y2: y }));
  }
  if (hasAttrs && hasOps) {
    svg.append(svgEl("line", { class: "uml-line", x1: node.x, y1: y, x2: node.x + node.w, y2: y }));
  }
  if (hasOps) compartmentLines(svg, node, node.ops, y);
}

function compartmentLines(svg, node, lines, y) {
  const rows = lines?.length ? lines : [""];
  rows.forEach((line, index) => {
    const member = memberLine(line);
    const attrs = { x: node.x + 12, y: y + 18 + index * 20 };
    if (member.static) attrs.class = "uml-static";
    svg.append(svgEl("text", attrs, member.text));
  });
  return y + rows.length * 20 + 12;
}

function drawEdge(svg, from, to, edge) {
  const [start, end] = anchors(from, to, edge.axis || (edge.kind === "inherit" ? "vertical" : ""));
  const ux = end.x - start.x;
  const uy = end.y - start.y;
  const length = Math.hypot(ux, uy) || 1;
  const dx = ux / length;
  const dy = uy / length;
  const px = -dy;
  const py = dx;
  let x1 = start.x;
  let y1 = start.y;
  let x2 = end.x;
  let y2 = end.y;
  const kind = edge.kind;

  if (kind === "aggregate" || kind === "compose") {
    const size = 18;
    const farX = x1 + dx * size;
    const farY = y1 + dy * size;
    const midX = x1 + dx * size * 0.55;
    const midY = y1 + dy * size * 0.55;
    const wing = 7;
    const diamond = svgEl("polygon", {
      points: `${x1},${y1} ${midX + px * wing},${midY + py * wing} ${farX},${farY} ${midX - px * wing},${midY - py * wing}`,
      class: kind === "compose" ? "rel filled" : "rel",
      style: kind === "compose" ? "fill:#eef2fb" : "fill:#0b1020",
    });
    svg.append(diamond);
    x1 = farX;
    y1 = farY;
  }

  if (kind === "inherit") {
    const size = 16;
    const baseX = x2 - dx * size;
    const baseY = y2 - dy * size;
    svg.append(svgEl("polygon", {
      points: `${x2},${y2} ${baseX + px * 8},${baseY + py * 8} ${baseX - px * 8},${baseY - py * 8}`,
      class: "rel",
      fill: "#151b2e",
    }));
    x2 = baseX;
    y2 = baseY;
  } else if (kind !== "associate") {
    const size = 12;
    const baseX = x2 - dx * size;
    const baseY = y2 - dy * size;
    svg.append(svgEl("polygon", {
      points: `${x2},${y2} ${baseX + px * 5},${baseY + py * 5} ${baseX - px * 5},${baseY - py * 5}`,
      class: "rel filled",
      style: "fill:#eef2fb",
    }));
    x2 = baseX;
    y2 = baseY;
  }

  const line = svgEl("line", { class: kind === "depend" ? "rel dashed" : "rel", x1, y1, x2, y2 });
  svg.append(line);
  if (edge.label) {
    svg.append(svgEl("text", {
      class: "rel-label",
      x: (start.x + end.x) / 2 + px * 12,
      y: (start.y + end.y) / 2 + py * 12,
      "text-anchor": "middle",
    }, edge.label));
  }
  placeMult(svg, start, dx, dy, px, py, edge.fromMult, 28);
  placeMult(svg, end, -dx, -dy, px, py, edge.toMult, 22);
}

function placeMult(svg, point, dx, dy, px, py, text, along) {
  if (!text) return;
  svg.append(svgEl("text", {
    class: "rel-label",
    x: point.x + dx * along + px * 14,
    y: point.y + dy * along + py * 14,
  }, text));
}

function anchors(from, to, axis) {
  const acx = from.x + from.w / 2;
  const acy = from.y + from.h / 2;
  const bcx = to.x + to.w / 2;
  const bcy = to.y + to.h / 2;
  const dx = bcx - acx;
  const dy = bcy - acy;
  const vertical = axis === "vertical" || (!axis && Math.abs(dy) > Math.abs(dx));
  if (!vertical) {
    return dx >= 0
      ? [{ x: from.x + from.w, y: acy }, { x: to.x, y: bcy }]
      : [{ x: from.x, y: acy }, { x: to.x + to.w, y: bcy }];
  }
  return dy >= 0
    ? [{ x: acx, y: from.y + from.h }, { x: bcx, y: to.y }]
    : [{ x: acx, y: from.y }, { x: bcx, y: to.y + to.h }];
}

function labFrame(title, lede, build) {
  const box = el("div", "lab");
  box.append(richEl("h3", "", title));
  if (lede) box.append(richEl("p", "", lede));
  build(box);
  return box;
}

function readout(lines) {
  const list = el("ul", "log");
  lines.forEach((line) => list.append(el("li", "", line)));
  return list;
}

const labs = {
  library(spec) {
    return labFrame(spec.title || "Try the book", spec.lede || "One LibraryBook object. Borrowing and returning change that book's own state, and the methods enforce the rule.", (box) => {
      const book = { title: "1984", author: "George Orwell", onLoan: false };
      const status = el("div");
      const feedback = el("p", "feedback");
      feedback.setAttribute("aria-live", "polite");
      function paint(message, ok = true) {
        status.replaceChildren(readout([
          "title: 1984",
          "author: George Orwell",
          `on_loan: ${book.onLoan}`,
        ]));
        feedback.className = ok ? "feedback good" : "feedback bad";
        setRich(feedback, message);
      }
      const actions = el("div", "row-actions");
      actions.append(button("borrow()", () => {
        if (book.onLoan) paint("`borrow()` returns `False`. The book is already on loan, so `on_loan` stays `True`.", false);
        else {
          book.onLoan = true;
          paint("`borrow()` returns `True`. `on_loan` changes from `False` to `True`.");
        }
      }));
      actions.append(button("return_book()", () => {
        if (!book.onLoan) paint("`return_book()` returns `False`. The book is already on the shelf, so `on_loan` stays `False`.", false);
        else {
          book.onLoan = false;
          paint("`return_book()` returns `True` and sets `on_loan` back to `False`.");
        }
      }, "btn small ghost"));
      box.append(status, actions, feedback);
      paint("The constructor has run. The book starts on the shelf.");
    });
  },

  bikes(spec) {
    return labFrame(spec.title || "Bikes: one value each, one value shared", spec.lede || "`speed` belongs to a bike. `count` belongs to the class. Accelerating one bike must not change the others.", (box) => {
      const bikes = [];
      let count = 0;
      const speed = el("input");
      speed.type = "number";
      speed.value = "10";
      speed.min = "0";
      speed.id = "bike-speed";
      speed.name = "bike-speed";
      const label = el("label", "field", "Starting speed ");
      label.append(speed);
      const status = el("div");
      function paint() {
        const lines = bikes.length
          ? bikes.map((bike, index) => `bike ${index + 1} speed = ${bike.speed}`)
          : ["No bikes yet."];
        lines.push(`Bike.count = ${count}`);
        status.replaceChildren(readout(lines));
      }
      const actions = el("div", "row-actions");
      actions.append(button("Create a bike", () => {
        bikes.push({ speed: Number(speed.value) || 0 });
        count += 1;
        paint();
      }));
      actions.append(button("Accelerate bike 1", () => {
        if (!bikes[0]) return;
        bikes[0].speed += 5;
        paint();
      }, "btn small ghost"));
      box.append(label, actions, status);
      paint();
    });
  },

  references(spec) {
    return labFrame(spec.title || "Two names, how many objects?", spec.lede || "`acc2 = acc1` copies the reference. It does not copy the account. Deposit through either name and both see the new balance.", (box) => {
      let shared = { owner: "Alice", balance: 500 };
      let acc1 = shared;
      let acc2 = shared;
      const status = el("div");
      const feedback = el("p", "feedback");
      feedback.setAttribute("aria-live", "polite");
      function paint(message) {
        status.replaceChildren(readout([
          `acc1.balance = ${acc1.balance}`,
          `acc2.balance = ${acc2.balance}`,
          `acc1 is acc2 → ${acc1 === acc2}`,
        ]));
        feedback.className = "feedback";
        setRich(feedback, message);
      }
      const actions = el("div", "row-actions");
      actions.append(button("acc2.deposit(200)", () => {
        acc2.balance += 200;
        paint("The deposit changed the one object both names point at.");
      }));
      actions.append(button("Make acc2 a new account", () => {
        acc2 = { owner: "Alice", balance: acc1.balance };
        paint("acc2 now refers to a different object. Later deposits will not be shared.");
      }, "btn small ghost"));
      actions.append(button("Reset", () => {
        shared = { owner: "Alice", balance: 500 };
        acc1 = shared;
        acc2 = shared;
        paint("Back to one object and two names.");
      }, "btn small ghost"));
      box.append(status, actions, feedback);
      paint("acc1 and acc2 are two references to the same BankAccount.");
    });
  },

  bank(spec) {
    return labFrame(spec.title || "The account protects its balance", spec.lede || "Outside code reads `balance` and calls `deposit` or `withdraw`. A deposit or withdrawal that is not positive is refused with its own message. A withdrawal the balance cannot cover is refused as insufficient funds. Assigning to `balance` fails, because the property has no setter.", (box) => {
      let balance = 100;
      const amount = el("input");
      amount.type = "number";
      amount.value = "40";
      amount.id = "bank-amount";
      amount.name = "bank-amount";
      const label = el("label", "field", "Amount ");
      label.append(amount);
      const status = el("div");
      const feedback = el("p", "feedback");
      feedback.setAttribute("aria-live", "polite");
      function paint(message, ok) {
        status.replaceChildren(readout([`balance = ${balance}`]));
        feedback.className = ok === false ? "feedback bad" : "feedback good";
        setRich(feedback, message);
      }
      const value = () => Number(amount.value);
      const actions = el("div", "row-actions");
      actions.append(button("deposit", () => {
        const money = value();
        if (!(money > 0)) paint("`deposit` raises ValueError: Deposit must be positive. `_balance` stays unchanged.", false);
        else {
          balance += money;
          paint(`Deposited ${money}. The method updated _balance.`);
        }
      }));
      actions.append(button("withdraw", () => {
        const money = value();
        if (!(money > 0)) paint("`withdraw` raises ValueError: Withdrawal must be positive. `_balance` stays unchanged.", false);
        else if (money > balance) paint("`withdraw` raises ValueError: Insufficient funds. `_balance` stays unchanged.", false);
        else {
          balance -= money;
          paint(`Withdrew ${money}. \`withdraw\` updated \`_balance\`.`);
        }
      }, "btn small ghost"));
      actions.append(button("Assign balance = 1000", () => {
        paint("Assignment raises AttributeError. `balance` has no setter, so `_balance` stays unchanged.", false);
      }, "btn small ghost"));
      box.append(label, status, actions, feedback);
      paint("Mei's account starts at 100.", true);
    });
  },

  shapes(spec) {
    return labFrame(spec.title || "One call, the object's own area()", spec.lede || "print_area only calls shape.area(). The rectangle and the circle each supply a different method body. That choice is made from the object, at run time.", (box) => {
      const shapes = [];
      const width = numberField("width", "4");
      const height = numberField("height", "3");
      const radius = numberField("radius", "2");
      const fields = el("div", "calc-grid");
      fields.append(width.label, height.label, radius.label);
      const status = el("div");
      function paint() {
        const lines = shapes.length
          ? shapes.map((shape) => `print_area → ${shape.label}: ${shape.area}`)
          : ["No shapes yet. print_area has nothing to call."];
        status.replaceChildren(readout(lines));
      }
      const actions = el("div", "row-actions");
      actions.append(button("Add rectangle", () => {
        const w = Number(width.input.value) || 0;
        const h = Number(height.input.value) || 0;
        shapes.push({ label: `Rectangle(${w}, ${h})`, area: (w * h).toFixed(2) });
        paint();
      }));
      actions.append(button("Add circle", () => {
        const r = Number(radius.input.value) || 0;
        shapes.push({ label: `Circle(${r})`, area: (3.14159 * r * r).toFixed(2) });
        paint();
      }, "btn small ghost"));
      actions.append(button("Clear", () => {
        shapes.length = 0;
        paint();
      }, "btn small ghost"));
      box.append(fields, actions, status);
      paint();
    });
  },

  patterns(spec) {
    return labFrame(spec.title || "Singleton keeps one object. Factory makes a new one.", spec.lede || "Predict first: after a third Settings(), will the id change? After a third factory call, will you see a new email-n? Then press the buttons.", (box) => {
      let settings = null;
      let settingsCalls = 0;
      let factoryCalls = 0;
      const made = [];
      const status = el("div");
      const predict = el("p", "feedback", "Prediction: the third Settings() should still show settings-1. Each factory call should add a new email-n.");
      function paint() {
        status.replaceChildren(readout([
          settings ? `Settings() calls: ${settingsCalls}. id of the only instance: ${settings}` : "Settings() has not been called.",
          made.length ? `Factory instances: ${made.join(", ")}` : "The factory has not been called.",
        ]));
      }
      const actions = el("div", "row-actions");
      actions.append(button("Settings()", () => {
        settingsCalls += 1;
        if (!settings) settings = "settings-1";
        paint();
      }));
      actions.append(button('Factory.get_notifier("email")', () => {
        factoryCalls += 1;
        made.push(`email-${factoryCalls}`);
        paint();
      }, "btn small ghost"));
      actions.append(button("Reset", () => {
        settings = null;
        settingsCalls = 0;
        factoryCalls = 0;
        made.length = 0;
        paint();
      }, "btn small ghost"));
      box.append(predict, actions, status);
      paint();
    });
  },

  observer(spec) {
    return labFrame(spec.title || "The station notifies whoever is attached", spec.lede || "Predict first: with the boxes as they are, which displays will print when you press set_temperature? Then change the attachments and predict again.", (box) => {
      const phone = el("input");
      phone.type = "checkbox";
      phone.id = "obs-phone";
      phone.name = "obs-phone";
      const tv = el("input");
      tv.type = "checkbox";
      tv.id = "obs-tv";
      tv.name = "obs-tv";
      tv.checked = true;
      const temperature = el("input");
      temperature.type = "number";
      temperature.id = "obs-temp";
      temperature.name = "obs-temp";
      temperature.value = "21";
      const choices = el("div", "choices");
      choices.append(checkLabel(phone, "Phone display attached"), checkLabel(tv, "TV display attached"));
      const label = el("label", "field", "New temperature ");
      label.append(temperature);
      const status = el("div");
      status.replaceChildren(readout(["Predict which attached displays will print, then press set_temperature."]));
      function publish() {
        const reading = Number(temperature.value);
        const lines = [`WeatherStation temperature = ${reading}`];
        if (phone.checked) lines.push(`PhoneDisplay.update(${reading})`);
        if (tv.checked) lines.push(`TVDisplay.update(${reading})`);
        if (!phone.checked && !tv.checked) lines.push("notify() ran, but the observer list is empty.");
        status.replaceChildren(readout(lines));
      }
      box.append(choices, label, button("set_temperature", publish), status);
    });
  },
};

function numberField(name, value) {
  const input = el("input");
  input.type = "number";
  input.id = `shape-${name}`;
  input.name = name;
  input.value = value;
  const label = el("label", "field", `${name} `);
  label.append(input);
  return { label, input };
}

function checkLabel(box, text) {
  const label = el("label");
  label.append(box, document.createTextNode(" "));
  appendRich(label, text);
  return label;
}

function practice(topic) {
  const block = el("section", "block");
  block.id = "practice";
  const wrap = el("div", "wrap rhythm");
  const head = el("div", "section-head");
  head.append(el("p", "kicker", "Quick check"));
  head.append(el("h2", "", "Choose an answer"));
  head.append(el("p", "lede", "The explanation appears as soon as you choose. This is revision, not an official paper."));
  wrap.append(head);
  const score = el("strong", "", `0 / ${topic.mcqs.length}`);
  let correct = 0;
  topic.mcqs.forEach((item, index) => {
    const card = el("article", "q");
    card.append(richEl("h3", "", `${index + 1}. ${item.q}`));
    const options = el("div", "stack");
    item.options.forEach((option, optionIndex) => {
      options.append(button(option, () => {
        const right = optionIndex === item.answer;
        [...options.querySelectorAll("button")].forEach((other) => { other.disabled = true; });
        options.children[optionIndex].classList.add(right ? "is-correct" : "is-wrong");
        if (!right) options.children[item.answer].classList.add("is-correct");
        else correct += 1;
        card.append(richEl("p", right ? "feedback good" : "feedback", item.why));
        score.textContent = `${correct} / ${topic.mcqs.length}`;
      }, "opt"));
    });
    card.append(options);
    wrap.append(card);
  });
  const board = el("div", "scoreboard");
  const cell = el("div");
  cell.append(el("span", "", "Score"), score);
  board.append(cell);
  wrap.append(board);
  if (topic.tasks?.length) {
    const taskHead = el("div", "section-head");
    taskHead.append(el("p", "kicker", "Go further"));
    taskHead.append(el("h2", "", "Draw, spot, and structured questions"));
    taskHead.append(el("p", "lede", "Attempt each one before revealing the model answer. These are revision prompts, not an official paper."));
    wrap.append(taskHead);
    topic.tasks.forEach((task, index) => {
      const card = el("article", "q");
      const label = task.kind === "draw" ? "Draw the diagram" : task.kind === "spot" ? "Spot the problem" : "Exam-style";
      card.append(richEl("h3", "", `${index + 1}. ${label}`));
      card.append(richEl("p", "", task.prompt));
      const reveal = el("div");
      card.append(button("Show model answer", () => {
        reveal.replaceChildren(richEl("p", "feedback good", task.reveal));
      }, "btn small ghost"));
      card.append(reveal);
      wrap.append(card);
    });
  }
  block.append(wrap);
  return block;
}

function review(topic) {
  const block = el("section", "block");
  block.id = "review";
  const wrap = el("div", "wrap rhythm");
  const head = el("div", "section-head");
  head.append(el("p", "kicker", "Review"));
  head.append(el("h2", "", "Leave the topic able to say these"));
  wrap.append(head);
  const list = el("div", "check-list");
  const key = `ib-${topic.id}-checklist`;
  let saved = [];
  try { saved = JSON.parse(localStorage.getItem(key) || "[]"); } catch { saved = []; }
  const known = new Set(saved);
  const boxes = [];
  topic.checks.forEach((text, index) => {
    const label = el("label");
    const box = el("input");
    box.type = "checkbox";
    box.id = `check-${topic.id}-${index}`;
    box.name = box.id;
    box.value = String(index);
    box.checked = known.has(String(index));
    label.append(box, document.createTextNode(" "));
    appendRich(label, text);
    list.append(label);
    boxes.push(box);
  });
  const count = el("span", "chip", "");
  function paint() {
    const on = boxes.filter((box) => box.checked).map((box) => box.value);
    try { localStorage.setItem(key, JSON.stringify(on)); } catch { /* storage may be blocked */ }
    count.textContent = `${on.length} / ${boxes.length}`;
  }
  boxes.forEach((box) => box.addEventListener("change", paint));
  const actions = el("div", "row-actions");
  actions.append(count);
  actions.append(button("Clear ticks", () => {
    boxes.forEach((box) => { box.checked = false; });
    paint();
  }, "btn small ghost"));
  const panel = el("div", "review-panel");
  panel.append(list, actions);
  wrap.append(panel);
  block.append(wrap);
  paint();
  return block;
}

function watchNav() {
  const links = [...document.querySelectorAll(".nav a")].filter((link) => link.getAttribute("href")?.startsWith("#"));
  const sections = links.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);
  if (!sections.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = `#${entry.target.id}`;
      links.forEach((link) => link.classList.toggle("is-active", link.getAttribute("href") === id));
    });
  }, { rootMargin: "-45% 0px -50% 0px", threshold: 0.01 });
  sections.forEach((section) => observer.observe(section));
}
