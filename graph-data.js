// ─────────────────────────────────────────────────────────────────────────────
// graph-data.js  —  all node and link data for the personal graph site
//
// NODE FIELDS
//   id       unique key used in links (no spaces)
//   label    text shown on the graph
//   type     "center" | "hub" | "leaf"
//   group    controls colour grouping — should match the parent hub's id
//   panel    content shown in the side panel when a node is clicked:
//     eyebrow   small label above the title
//     title     main heading
//     subtitle  secondary line under the title
//     meta      array of small tag chips (dates, locations, etc.)
//     body      paragraph text
//     bullets   array of bullet-point strings
//     tags      array of hashtag strings
//     links     array of { label, href } for external links
//
// LINK FIELDS
//   [sourceId, targetId, type]
//   type "tree"  = solid line  (parent → child hierarchy)
//   type "cross" = dashed line (cross-cutting association)
// ─────────────────────────────────────────────────────────────────────────────

window.GRAPH = (function () {

  // ── Nodes ──────────────────────────────────────────────────────────────────

  const nodes = [

    // ── Center node ──────────────────────────────────────────────────────────
    {
      id: "me",
      label: "Grayson Penland",
      type: "center",
      group: "core",
      panel: {
        eyebrow: "home",
        title: "Grayson Penland",
        subtitle: "CS @ Georgia Tech · GTM Intern @ Sevalla",
        meta: ["Atlanta, GA"],
        body:
          "Computer science student with a builder's background in IT, web, and open source. " +
          "I like systems that connect — graphs, infrastructure, and the people around them. " +
          "Click any node to wander through the things I've worked on.",
        tags: ["Java", "Python", "Linux", "Open Source", "Go-to-Market"],
        links: [
          { label: "Email",    href: "mailto:gpenland06@gmail.com" },
          { label: "LinkedIn", href: "https://linkedin.com/in/gpenland" },
        ],
      },
    },

    // ── Hubs ──────────────────────────────────────────────────────────────────
    {
      id: "about",
      label: "About",
      type: "hub",
      group: "about",
      panel: {
        eyebrow: "note",
        title: "About",
        subtitle: "A short version",
        body:
          "I'm a second-year CS student at Georgia Tech who got here the long way — " +
          "fixing PCs and shipping websites for small businesses before the degree. " +
          "These days I split time between data-structures coursework, a GTM internship " +
          "at Sevalla, and teaching kids to swim. I care about open source, clean systems, " +
          "and explaining hard things simply.",
        tags: ["Builder", "Open source", "Teacher"],
      },
    },
    {
      id: "edu",
      label: "Education",
      type: "hub",
      group: "edu",
      panel: {
        eyebrow: "section",
        title: "Education",
        body: "Where the formal CS foundation comes from.",
      },
    },
    {
      id: "exp",
      label: "Experience",
      type: "hub",
      group: "exp",
      panel: {
        eyebrow: "section",
        title: "Experience",
        body: "Roles across go-to-market, IT, web, and aquatics.",
      },
    },
    {
      id: "proj",
      label: "Projects",
      type: "hub",
      group: "proj",
      panel: {
        eyebrow: "section",
        title: "Projects",
        body: "Things I built or produced end-to-end.",
      },
    },
    {
      id: "skills",
      label: "Skills",
      type: "hub",
      group: "skills",
      panel: {
        eyebrow: "section",
        title: "Skills",
        body: "The toolkit, clustered by kind.",
      },
    },
    {
      id: "contact",
      label: "Contact",
      type: "hub",
      group: "contact",
      panel: {
        eyebrow: "section",
        title: "Contact",
        subtitle: "Atlanta, GA",
        links: [
          { label: "gpenland06@gmail.com",      href: "mailto:gpenland06@gmail.com" },
          { label: "linkedin.com/in/gpenland",  href: "https://linkedin.com/in/gpenland" },
        ],
      },
    },

    // ── Education ─────────────────────────────────────────────────────────────
    {
      id: "gt",
      label: "Georgia Tech",
      type: "leaf",
      group: "edu",
      panel: {
        eyebrow: "education",
        title: "Georgia Institute of Technology",
        subtitle: "B.S. Computer Science",
        meta: ["Atlanta, GA", "Jun 2025 – Present", "Expected: Fall 2028"],
        body: "Relevant coursework:",
        bullets: [
          "Object-Oriented Programming",
          "Data Structures & Algorithms",
          "Discrete Mathematics",
        ],
        tags: ["CS1332", "OOP", "Discrete Math"],
      },
    },

    // ── Experience ────────────────────────────────────────────────────────────
    {
      id: "sevalla",
      label: "Sevalla",
      type: "leaf",
      group: "exp",
      panel: {
        eyebrow: "experience",
        title: "GTM Intern",
        subtitle: "Sevalla",
        meta: ["Present"],
        body:
          "Go-to-market internship at Sevalla, working at the intersection of " +
          "developer infrastructure and growth.",
        tags: ["Go-to-Market", "Developer tooling", "Growth"],
      },
    },
    {
      id: "siervo",
      label: "Siervocomp",
      type: "leaf",
      group: "exp",
      panel: {
        eyebrow: "experience",
        title: "IT Field Technician & Web Developer",
        subtitle: "Siervocomp Computer Repairs & IT Solutions · Toccoa, GA",
        meta: ["Jun 2023 – Jan 2025"],
        body: "Produced solutions and provided technical support for local businesses.",
        bullets: [
          "Managed client communications & scheduling; delivered on-site service autonomously",
          "Wrote SOPs and user guides that reduced repeat issues",
          "Migrated host and optimized SEO for a 200-page site → ~4,000 monthly views",
          "Built & serviced 50+ PCs; diagnosed hardware / OS / network issues",
        ],
        tags: ["IT support", "Web dev", "SEO"],
      },
    },
    {
      id: "guard",
      label: "Lifeguard",
      type: "leaf",
      group: "exp",
      panel: {
        eyebrow: "experience",
        title: "Lifeguard & Swim Instructor",
        subtitle: "Georgia Tech / Tallulah Falls School",
        meta: ["Jun 2023 – Present"],
        body: "Maintaining pool safety while teaching the next generation to swim.",
        bullets: [
          "Prevented drowning and injuries while assisting patrons",
          "Taught structured swim lessons for children ages 5–11",
        ],
        tags: ["Safety", "Teaching"],
      },
    },

    // ── Projects ──────────────────────────────────────────────────────────────
    {
      id: "cityeng",
      label: "City Infrastructure Engine",
      type: "leaf",
      group: "proj",
      panel: {
        eyebrow: "project · Java",
        title: "Graphs & City Infrastructure Engine",
        subtitle: "CS1332 · Georgia Tech",
        meta: ["Apr 2026"],
        body: "A from-scratch graph engine modeling a city's road and electrical-grid networks.",
        bullets: [
          "Undirected weighted graph on an adjacency-list HashMap; union-find with path compression & union-by-rank for O(1) connected-component queries",
          "Implemented BFS, DFS, Dijkstra's, Prim's & Kruskal's from scratch into a city-services API",
          "Shortest-path routing, MST-based wire consolidation, and centrality queries for optimal power-station siting within O(|R| log |R|)",
          "Modified Dijkstra's that lexicographically minimizes (restricted-intersection count, total duration) to route trucks around non-preferred intersections",
        ],
        tags: ["Java", "Graphs", "Algorithms"],
      },
    },
    {
      id: "fedora",
      label: "Fedora Podcast",
      type: "leaf",
      group: "proj",
      panel: {
        eyebrow: "project",
        title: "Volunteer Podcast Host & Producer",
        subtitle: "The Fedora Project",
        meta: ["Jan 2021 – Dec 2021"],
        body: "Hosted and produced a podcast on Linux, operating systems, and open-source ecosystems.",
        bullets: [
          "Interviewed developers & contributors on advanced OS / open-source topics",
          "Ran end-to-end production: scheduling, recording, editing, publishing",
          "10,000+ downloads in under 8 months",
          "Negotiated a partnership between a podcast network and the Fedora Project for long-term reach",
          "Coordinated remote collaboration with open-source tooling (incl. Git)",
        ],
        tags: ["Open Source", "Linux", "Production"],
      },
    },

    // ── Skills ────────────────────────────────────────────────────────────────
    {
      id: "lang",
      label: "Languages",
      type: "leaf",
      group: "skills",
      panel: {
        eyebrow: "skills",
        title: "Languages",
        bullets: ["Java", "Python", "Bash", "HTML / CSS", "SQL", "PHP"],
        tags: ["Java", "Python", "SQL"],
      },
    },
    {
      id: "tools",
      label: "Developer Tools",
      type: "leaf",
      group: "skills",
      panel: {
        eyebrow: "skills",
        title: "Developer Tools",
        bullets: ["Git", "Docker", "Ansible", "Linux"],
        tags: ["Git", "Docker", "Ansible"],
      },
    },
    {
      id: "infra",
      label: "IT & Infrastructure",
      type: "leaf",
      group: "skills",
      panel: {
        eyebrow: "skills",
        title: "IT & Infrastructure",
        bullets: [
          "Networking fundamentals",
          "Hardware diagnostics",
          "System troubleshooting",
          "Technical documentation",
        ],
        tags: ["Networking", "Hardware", "Docs"],
      },
    },

    // ── Contact ───────────────────────────────────────────────────────────────
    {
      id: "linkedin",
      label: "LinkedIn",
      type: "leaf",
      group: "contact",
      panel: {
        eyebrow: "contact",
        title: "LinkedIn",
        body: "Let's connect.",
        links: [{ label: "linkedin.com/in/gpenland", href: "https://linkedin.com/in/gpenland" }],
      },
    },
    {
      id: "email",
      label: "Email",
      type: "leaf",
      group: "contact",
      panel: {
        eyebrow: "contact",
        title: "Email",
        body: "Fastest way to reach me.",
        links: [{ label: "gpenland06@gmail.com", href: "mailto:gpenland06@gmail.com" }],
      },
    },
    {
      id: "phone",
      label: "Phone",
      type: "leaf",
      group: "contact",
      panel: {
        eyebrow: "contact",
        title: "Phone",
      },
    },

  ];

  // ── Links ──────────────────────────────────────────────────────────────────
  //   "tree"  = solid line   (hierarchy: center → hub → leaf)
  //   "cross" = dashed line  (second-brain associations across branches)

  const links = [

    // center → hubs
    ["me", "about",   "tree"],
    ["me", "edu",     "tree"],
    ["me", "exp",     "tree"],
    ["me", "proj",    "tree"],
    ["me", "skills",  "tree"],
    ["me", "contact", "tree"],

    // hubs → leaves
    ["edu",     "gt",       "tree"],
    ["exp",     "sevalla",  "tree"],
    ["exp",     "siervo",   "tree"],
    ["exp",     "guard",    "tree"],
    ["proj",    "cityeng",  "tree"],
    ["proj",    "fedora",   "tree"],
    ["skills",  "lang",     "tree"],
    ["skills",  "tools",    "tree"],
    ["skills",  "infra",    "tree"],
    ["contact", "linkedin", "tree"],
    ["contact", "email",    "tree"],
    ["contact", "phone",    "tree"],

    // cross-cutting associations
    ["cityeng", "gt",     "cross"],
    ["cityeng", "lang",   "cross"],
    ["cityeng", "tools",  "cross"],
    ["fedora",  "tools",  "cross"],
    ["fedora",  "infra",  "cross"],
    ["siervo",  "infra",  "cross"],
    ["siervo",  "lang",   "cross"],
    ["siervo",  "tools",  "cross"],
    ["gt",      "lang",   "cross"],
    ["sevalla", "infra",  "cross"],
    ["about",   "gt",     "cross"],

  ];

  // ── Derived data (do not edit) ─────────────────────────────────────────────

  const adj = {};
  nodes.forEach((n) => (adj[n.id] = new Set()));
  links.forEach(([a, b]) => { adj[a].add(b); adj[b].add(a); });

  const degree = {};
  nodes.forEach((n) => (degree[n.id] = adj[n.id].size));

  return { nodes, links, adj, degree };
})();
