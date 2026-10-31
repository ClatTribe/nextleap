export type Course = {
  track: string;
  title: string;
  pitch: string;
  mods: [string, string][];
  ship: string[];
  tools: string[];
  meta: [string, string][];
};

export const COURSES: Course[] = [
  {
    track: "Product",
    title: "AI Product & Agents",
    pitch:
      "Take a fuzzy problem to a working AI agent. Learn how LLM products are scoped, built, tested and priced, then ship one.",
    mods: [
      ["How LLMs actually work", "Tokens, context windows, cost and latency, explained for product people."],
      ["Finding the AI-shaped problem", "When AI helps and when it doesn't. User research for AI products."],
      ["Prompt and context design", "System prompts, retrieval and structured output."],
      ["Agents and tools", "Workflows, tool use, memory and hand-off to a human. Built in n8n."],
      ["Evals and guardrails", "Test sets, failure modes and measuring quality."],
      ["Launch and economics", "Pricing, unit costs, roadmap and the demo-day pitch."],
    ],
    ship: ["A working AI agent that does one real job", "A PRD with an eval sheet", "A 3-minute demo-day pitch"],
    tools: ["Claude", "ChatGPT", "n8n", "Cursor", "Lovable"],
    meta: [["Format", "Sprint-based studio"], ["Graded on", "Shipped agent + evals"], ["Coding", "Not required"]],
  },
  {
    track: "Product",
    title: "Agile Product Management",
    pitch:
      "Run a product team the way startups do: short sprints, tight feedback loops, and AI copilots that take the busywork.",
    mods: [
      ["The agile mindset", "Scrum and Kanban, and when to use which."],
      ["Discovery and user stories", "Turning user problems into stories a team can build."],
      ["Backlog and prioritisation", "RICE, MoSCoW and saying no with evidence."],
      ["Sprint ceremonies", "Planning, stand-ups, reviews and retros that actually help."],
      ["Metrics that matter", "Velocity, burndown, and outcomes over output."],
      ["AI copilots for PMs", "Drafting specs, splitting stories and summarising retros with AI."],
    ],
    ship: ["Three two-week sprints as a team", "A working MVP", "A live sprint board and retro log"],
    tools: ["Jira", "Notion", "Figma", "Miro", "ChatGPT"],
    meta: [["Format", "Team sprints"], ["Graded on", "MVP + sprint artefacts"], ["Team size", "4–6 students"]],
  },
  {
    track: "Marketing",
    title: "Service Marketing in the Age of AI",
    pitch:
      "Services are being redesigned around AI, from banks to hospitals to hotels. Learn where AI helps, and where a human still has to step in.",
    mods: [
      ["Why services are different", "The 7Ps and what makes a service hard to market."],
      ["Service quality", "The gaps model and how customers judge a service."],
      ["Journeys and blueprints", "Mapping every step, frontstage and backstage."],
      ["AI touchpoints", "Chatbots, personalisation and predictive service."],
      ["Failure and recovery", "Handling service failures, with and without AI."],
      ["Trust and the human hand-off", "Ethics, empathy and knowing when to escalate."],
    ],
    ship: ["A service blueprint with AI touchpoints", "A CX audit of a real local business", "A redesign pitch to its owner"],
    tools: ["Miro", "ChatGPT", "Claude", "Google Forms", "Canva AI"],
    meta: [["Format", "Field project"], ["Graded on", "Blueprint + audit"], ["Fieldwork", "Yes"]],
  },
  {
    track: "Marketing",
    title: "AI in Marketing",
    pitch: "Plan, create and run a campaign with AI in the loop, then read the numbers and decide what to do next.",
    mods: [
      ["AI for research and insight", "Market scans, competitor tracking and review mining."],
      ["Segments and personas", "Building audiences from data, not guesses."],
      ["Creative at scale", "Copy, visuals and video in English and Indian languages."],
      ["Performance marketing", "Running ads and A/B testing creative."],
      ["Analytics and attribution", "Dashboards and reading what the numbers say."],
      ["Brand safety and ethics", "Bias, disclosure and protecting the brand."],
    ],
    ship: ["A live campaign on a small real budget", "A creative test with a clear winner", "A results dashboard and teardown"],
    tools: ["Meta Ads Manager", "Google Analytics", "Perplexity", "Canva AI", "ChatGPT"],
    meta: [["Format", "Live campaign"], ["Graded on", "Results + teardown"], ["Budget", "Set per team"]],
  },
];

export const PILLARS: [string, string][] = [
  [
    "Every class ends with something built.",
    "A short concept, a long build, a quick demo. Theory arrives exactly when the project needs it, so it sticks.",
  ],
  [
    "Real briefs, real tools, real constraints.",
    "Students work on briefs modelled on Indian businesses, with budgets, deadlines and messy data, using the tools teams use at work.",
  ],
  [
    "Built for the jobs AI is creating.",
    "AI product manager, growth marketer with agents, CX designer for AI services. The syllabus moves as fast as the tools do.",
  ],
];
