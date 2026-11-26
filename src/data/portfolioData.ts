import { Project, ExperienceItem, ArticleItem, CareerHighlight } from '../types';

export const PERSONAL_INFO = {
  name: 'Rishi Shukla',
  shortName: 'Rishi',
  eyebrow: 'AI SYSTEMS BUILDER · LEAD SOFTWARE ENGINEER · EDUCATOR',
  headlineFirst: 'I build with AI.',
  headlineSecond: 'I teach people to do the same.',
  bio: 'I build enterprise software, cost-aware agentic AI systems, and practical products that solve real problems. Then I turn what works into lessons others can use.',
  currentlyExploring: 'Agent orchestration and hybrid AI infrastructure',
  /** Public contact for recruiters and general enquiries. */
  email: 'rishishukla2k@gmail.com',
  /** Only used inside the KIDLIN teaching section. */
  kidlinEmail: 'rishi@kidlinschool.ai',
  resumeUrl: '/Rishi-Shukla-Resume.pdf',
  github: 'https://github.com/rshukla2',
  linkedin: 'https://www.linkedin.com/in/rishi-2k/',
  instagram: 'https://www.instagram.com/rishi.builds.ai/',
  philosophy: 'I rarely leave a problem alone.',
  philosophyBody:
    'When something is repetitive, frustrating, or interesting, my first question is usually: Can I build a better way?',
};

export const CAREER_HIGHLIGHTS: CareerHighlight[] = [
  { value: '4+ years', label: 'Software engineering and product development' },
  { value: '$25/mo', label: 'Runs ~10 AI agents, ~1.5B tokens in 5 days' },
  { value: '10K+', label: 'Daily financial transactions supported' },
  { value: '700+', label: 'Customer interviews across two startups' },
];

export const PROJECT_TIERS = [
  {
    tier: 'flagship' as const,
    eyebrow: 'FLAGSHIP ENGINEERING',
    title: 'The systems I build and run.',
    description: 'Full case studies with the architecture, the trade-offs, and what actually happened.',
  },
  {
    tier: 'supporting' as const,
    eyebrow: 'SUPPORTING SYSTEMS',
    title: 'Automations and products behind the main work.',
    description: 'Smaller systems I use, shipped, or retired, each one teaching me something the flagship projects needed.',
  },
  {
    tier: 'experiment' as const,
    eyebrow: 'RAPID EXPERIMENTS',
    title: 'Ideas I built just to find out.',
    description: 'Quick builds that show how short the distance from idea to working software has become.',
  },
];

export const PROJECTS: Project[] = [
  // ───────────────────────── FLAGSHIP ─────────────────────────
  {
    id: 'enterprise-delivery',
    number: '01',
    tier: 'flagship',
    name: 'Enterprise Agentic Validation System',
    category: 'ENTERPRISE AI · MULTI-AGENT SYSTEMS · DEVELOPER PRODUCTIVITY',
    status: 'Internal pilot · In use',
    statusTone: 'pilot',
    headline: 'I built an agent to deliver and validate software, not just write it.',
    story:
      'AI made writing code faster, but recreating complex application state to test a change could still take 3 to 4 hours. The bottleneck had moved from implementation to validation.\n\nSo I designed and built an internal multi-agent validation pilot at RedMane. It turns PRD and FDD requirements into executable test specs, prepares disposable test data, drives browser-based UI validation through a Goose browser agent running on OpenRouter models, and can hand failures to a fix-and-retest loop.\n\nThe work is split across clear agent boundaries: a Planner, a Setup/Learner agent that reuses what it learned on earlier runs, a Tester, and a Fixer. Reference data is read-only, test expectations cannot be edited by the agents, stop rules end runaway loops, and every result comes with evidence. Ambiguous requirements come back to a person for clarification, and fixes wait for human approval.\n\nI first built it for developers. After feedback from the QA team, I expanded the design for QA testers too, since it speeds up their testing directly.',
    lesson:
      'Faster code only helps if testing can keep up. Automate the repetitive setup and checking, and keep people on the decisions that actually matter.',
    stats: [
      { label: 'Bottleneck', value: '3 to 4 hrs of test setup' },
      { label: 'Agents', value: 'Planner · Setup · Tester · Fixer' },
      { label: 'Guardrails', value: 'Stop rules · Immutable specs' },
      { label: 'Sign-off', value: 'Human approval' },
    ],
    tags: [
      'Multi-Agent Orchestration',
      'Executable Test Specs',
      'Goose Browser Agent',
      'OpenRouter',
      'Disposable Test Data',
      'Evidence-Backed Reports',
      'Human-in-the-Loop',
    ],
    links: [{ label: 'Explore Architecture', href: '#visual-enterprise-delivery', kind: 'primary', icon: 'architecture' }],
    visual: 'illustration',
  },
  {
    id: 'ai-os',
    number: '02',
    tier: 'flagship',
    name: 'Multi-Agent AI Operating System',
    category: 'AGENT ARCHITECTURE · CONTEXT ENGINEERING · HYBRID INFERENCE',
    status: 'Built 2026 · In daily use',
    statusTone: 'active',
    headline: 'I built a team of AI agents to run my day-to-day work.',
    story:
      'Using AI one chat at a time was useful, but re-explaining context, juggling conversations, wiring tools together, and checking every result became a bottleneck of its own.\n\nSo I built a personal multi-agent operating system. I talk to one agent, a Chief of Staff, and it owns each request end to end: it plans the work, does quick things itself, and delegates the rest to about ten specialists. There is an engineering lead for code, a deployment agent that ships websites and mobile builds, an n8n automation agent, a product strategist, agents for job search, outreach, content, and learning, and a market analyst that only works when asked. Each one has a defined role, its own memory and knowledge files, and only the tools its job needs.\n\nEvery task goes to the cheapest model that can do it well. Claude Opus handles planning and judgment, Sonnet runs the specialists, and a free local Qwen3-Coder model on Ollama does coding and bulk text on my Mac. The Chief of Staff writes each specialist a scoped brief instead of sharing its whole context, runs independent work in parallel, and reads its own memory only when a task needs it.\n\nOutput is never accepted on trust. The Chief of Staff checks results against the intended outcome and the tests, sends failed work back with corrective instructions until it passes, and holds anything consequential, like sending a message, posting, or spending money, until I approve it. Desktop and browser automation follows the same rule: it confirms the recipient and the exact text before it sends anything.\n\nA typical day: the coding agent ships a fix to one of my apps and the deployment agent builds and uploads it, the job-search agent reviews the morning\'s job matches, and the outreach agent drafts follow-ups that wait for my OK.',
    lesson:
      'The value of an AI operating system is not how independently it can act. It is how much useful work it can do while keeping human judgment, control, and accountability in place.',
    stats: [
      { label: 'Usage in five days', value: '~1.5B tokens' },
      { label: 'Prompt-cache hit rate', value: '~97%' },
      { label: 'Local model tokens', value: '~70M' },
      { label: 'Hosted subscription', value: '$25/mo' },
    ],
    tags: [
      'Chief of Staff Orchestration',
      '~10 Specialist Agents',
      'Model Routing',
      'Context Engineering',
      'File-Based RAG Memory',
      'Prompt Caching',
      'Claude + Local Qwen (Ollama)',
      'Closed-Loop Supervision',
      'Human Approval Gates',
    ],
    links: [{ label: 'Explore Architecture', href: '#visual-ai-os', kind: 'primary', icon: 'architecture' }],
    visual: 'illustration',
  },
  {
    id: 'ai-code-manager',
    number: '03',
    tier: 'flagship',
    name: 'AI Code Manager',
    category: 'OPEN-SOURCE AGENT ORCHESTRATION · AGENTIC SDLC',
    status: 'Open source',
    statusTone: 'live',
    headline: 'I built an AI project manager for coding agents.',
    story:
      'Giving an AI coding agent one enormous prompt produced generic implementations, missed edge cases, and architectural drift. Breaking a project into small tasks improved quality dramatically, but managing dozens of tasks by hand made me the bottleneck.\n\nSo I built an agentic software-development orchestration system. It takes a Product Requirements Document, normalizes it into atomic tasks, orders them in a dependency-aware queue, and removes duplicate work. It then hands tasks to a coding agent one at a time, keeps separate context for each project, tells the agent to read existing modules before changing them, runs checks and tests, and records a structured result for every task. Execution is bounded: failed tasks get a limited number of recovery attempts instead of looping forever.\n\nThe coding-agent runner is configurable. The benchmark below used Codex.',
    lesson:
      'One real run: a 40-page PRD became 326 implementation tasks, and 324 completed successfully in about 36 hours of unattended execution. Task completion is not the same as verified correctness, which is why every task also runs checks.',
    stats: [
      { label: 'Product requirements doc', value: '40 pages' },
      { label: 'Implementation tasks generated', value: '326' },
      { label: 'Task completion', value: '324/326 (99.4%)' },
      { label: 'Execution run', value: '~36 hours' },
    ],
    tags: ['Agent Orchestration', 'Dependency-Aware Task Queue', 'Configurable Coding Agents', 'Codex', 'Automated Checks', 'MIT License'],
    links: [
      { label: 'Explore Architecture', href: '#visual-ai-code-manager', kind: 'primary', icon: 'architecture' },
      { label: 'View GitHub Repository', href: 'https://github.com/rshukla2/ai-code-manager', kind: 'secondary', icon: 'github' },
    ],
    visual: 'illustration',
  },
  {
    id: 'task-tracker',
    number: '04',
    tier: 'flagship',
    name: 'Task Tracker: Cycles & Sprints',
    category: 'SHIPPED PRODUCT · MCP SERVER · BACKEND ENGINEERING',
    status: 'Live on the App Store',
    statusTone: 'live',
    headline: 'I built a task manager that both people and AI agents can use.',
    story:
      'I plan my work in cycles and sprints, and no to-do app matched how I actually work. So I built my own and shipped it.\n\nTask Tracker organizes work as Work Cycles, then Sprints, then Tasks. It is offline-first: the app works fully without a connection, stores data on the device, and supports versioned JSON backup and restore. It runs on the web and as an iOS app built with React, TypeScript, and Capacitor, and it has been live on the App Store with regular updates since launch.\n\nThen I wanted my devices and my AI assistants to see the same tasks. I built a self-hosted sync API with Node.js, Express, and SQLite, using bearer-token auth and last-write-wins delta sync. It runs in Docker on an Oracle Cloud VM behind Caddy HTTPS, with health monitoring and backups.\n\nOn top of that API I built an MCP server and published it on npm. Anyone can connect Claude, Cursor, or another AI assistant to their own sync server and let it read, create, update, and complete tasks.',
    lesson:
      'If a product has a clean API, making it usable by AI agents is a small step. MCP turned my own app into a tool my agents can work with.',
    stats: [
      { label: 'Platforms', value: 'Web · iOS' },
      { label: 'Architecture', value: 'Offline-first + delta sync' },
      { label: 'AI access', value: 'MCP server on npm' },
      { label: 'Hosting', value: 'Self-hosted on Oracle Cloud' },
    ],
    tags: ['Offline-First', 'MCP Server', 'Data Sync', 'REST API', 'React', 'TypeScript', 'Capacitor', 'Node.js', 'SQLite', 'Docker'],
    links: [
      { label: 'Download on the App Store', href: 'https://apps.apple.com/us/app/task-tracker-cycles-sprints/id6837899383', kind: 'primary', icon: 'appstore' },
      { label: 'MCP Server on npm', href: 'https://www.npmjs.com/package/@rishishukla2k/task-tracker-mcp', kind: 'secondary', icon: 'npm' },
      { label: 'Try the Web App', href: 'https://rshukla2.github.io/TaskTracker/', kind: 'secondary', icon: 'external' },
      { label: 'View on GitHub', href: 'https://github.com/rshukla2/TaskTracker', kind: 'secondary', icon: 'github' },
    ],
    visual: 'illustration',
  },
  {
    id: 'kidlin-app',
    number: '05',
    tier: 'flagship',
    name: 'KIDLIN App & Lumi AI Tutor',
    category: 'APPLIED AI · MOBILE PRODUCT · AI COST CONTROL',
    status: 'Closed testing · iOS & Android',
    statusTone: 'testing',
    headline: 'I helped build an AI learning app with a tutor that understands the lesson.',
    story:
      'Teaching AI in a classroom only reaches the people in the room. I wanted learners to be able to practice on their phones, with help available the moment they get something wrong.\n\nI co-built the KIDLIN app, a Duolingo-style app for learning AI on iOS and Android from a single Expo / React Native codebase. I led product design, UX, and app structure, and wrote core app and backend code for the first version.\n\nInside it is Lumi, an AI tutor powered by Claude. Lumi is grounded in the lesson the learner is on, so its feedback after a wrong answer is about that exact question, not generic advice. It runs on a small model, Claude Haiku, streams its answers, and has per-learner daily question limits with daily tracking of tutor questions and tokens, so AI cost stays predictable.\n\nThe backend is FastAPI and PostgreSQL in Docker behind nginx HTTPS, with email-code, Apple, and Google sign-in, JWT auth that refuses weak secrets in production, and hashed one-time codes. The server is hardened with fail2ban, ufw, and automatic security updates, a watchdog restarts the API and alerts if it goes down, and the database is backed up daily.',
    lesson:
      'An AI feature is only ready for real users when its cost, its grounding, and its failure modes are under control, not just when the demo works.',
    stats: [
      { label: 'Platforms', value: 'iOS · Android' },
      { label: 'AI tutor', value: 'Claude Haiku, streamed' },
      { label: 'Cost control', value: 'Per-learner daily limits' },
      { label: 'Backend', value: 'FastAPI · PostgreSQL' },
    ],
    tags: ['Expo', 'React Native', 'Claude Haiku', 'Streaming', 'Token Tracking', 'FastAPI', 'PostgreSQL', 'Docker', 'Apple & Google Sign-In'],
    links: [{ label: 'Explore Architecture', href: '#visual-kidlin-app', kind: 'primary', icon: 'architecture' }],
    visual: 'illustration',
  },

  // ───────────────────────── SUPPORTING ─────────────────────────
  {
    id: 'n8n-automation',
    number: '06',
    tier: 'supporting',
    name: 'Self-Hosted Automation Platform (n8n)',
    category: 'AUTOMATION INFRASTRUCTURE · SELF-HOSTING · RELIABILITY',
    status: 'Running in production',
    statusTone: 'active',
    headline: 'I run my own automation server, and I treat it like production.',
    story:
      'Some work should not need an agent at all. It needs a dependable schedule, clear steps, and an alert when something breaks.\n\nI run a self-hosted n8n instance on an Oracle Cloud VM, in Docker behind Caddy HTTPS. Its workflows are deterministic, and LLMs appear only in bounded steps like classifying or scoring. Some of what runs there:\n\n• Daily job scan: every morning it checks about 450 company job boards, filters postings by role, location, and seniority, removes duplicates, scores the remaining jobs with an LLM, and writes the best matches to a tracking sheet.\n• Lead pipelines: website form submissions and inbound emails are logged to a lead sheet, and a reply draft is prepared for me to review. Nothing is sent automatically.\n• Recruiter message tracker: LinkedIn message notifications are classified and logged, with a suggested reply.\n• Phone alerts for new bookings and leads.\n\nThe server runs like production. Every workflow reports failures to an error workflow that emails me. Backups run weekly, n8n updates itself with automatic rollback if the health check fails, disk space is checked daily, an external uptime monitor watches the instance, and execution logs are audited weekly. Credentials live in n8n\'s credential store, never in workflow text.',
    lesson:
      'Automations you rely on need the same care as production software: monitoring, backups, safe updates, and a clear signal when something fails.',
    stats: [
      { label: 'Host', value: 'Oracle Cloud · Docker · Caddy' },
      { label: 'Job boards scanned daily', value: '~450' },
      { label: 'LLM use', value: 'Bounded steps only' },
      { label: 'Ops', value: 'Backups · Rollback · Monitoring' },
    ],
    tags: ['n8n', 'Self-Hosting', 'Oracle Cloud', 'Docker', 'Caddy', 'Google OAuth', 'Error Workflows', 'Backups & Rollback'],
    links: [{ label: 'Explore Workflows', href: '#visual-n8n-automation', kind: 'primary', icon: 'architecture' }],
    visual: 'illustration',
  },
  {
    id: 'chief-assistant',
    number: '07',
    tier: 'supporting',
    name: 'Chief: My First Personal AI Assistant',
    category: 'TOOL CALLING · INTENT ROUTING · GOOGLE WORKSPACE',
    status: 'Archived · Replaced by the Multi-Agent AI OS',
    statusTone: 'archived',
    headline: 'Before my agent team, I built one assistant inside Discord.',
    story:
      'Email, calendar invites, documents, meeting notes, and personal tracking lived in separate apps, and switching between them all day was constant overhead.\n\nSo I built Chief, a conversational assistant for Google Workspace that I controlled from Discord. An intent router turned each message into one of 89 curated capabilities across Gmail, Calendar, Drive, Docs, Sheets, Slides, Forms, and Meet. Simple requests ran deterministic workflows, and multi-step ones went through a planner/executor loop that called Google tools over per-account OAuth.\n\nIt never wrote anything on its own. Every write, like sending an email or editing a document, was queued as a pending action that I confirmed in Discord, and an audit log and tracing recorded what ran. It even understood a small convention: starting a message with "Log:" recorded workouts, protein, and deep-work hours to my tracking sheet.\n\nChief taught me what a single assistant can and cannot do. I have since archived it and replaced it with my multi-agent AI operating system.',
    lesson: 'Interfaces can become conversational while the real work happens underneath, but one assistant doing everything does not scale. That lesson became my agent team.',
    stats: [
      { label: 'Interface', value: 'Discord' },
      { label: 'Capabilities', value: '89 curated' },
      { label: 'Routing', value: 'Intent router + planner' },
      { label: 'Writes', value: 'Confirmed by me' },
    ],
    tags: ['Intent Routing', 'LLM Tool Calling', 'Planner / Executor', 'Google Workspace APIs', 'OAuth', 'Audit Logging'],
    links: [
      { label: 'Explore Architecture', href: '#visual-chief-assistant', kind: 'primary', icon: 'architecture' },
      { label: 'View Repository', href: 'https://github.com/rshukla2/Chief-Assistant', kind: 'secondary', icon: 'github' },
    ],
    visual: 'illustration',
  },
  {
    id: 'ai-inbox-manager',
    number: '08',
    tier: 'supporting',
    name: 'AI Inbox Manager',
    category: 'EMAIL AUTOMATION',
    status: 'Running daily',
    statusTone: 'active',
    headline: 'Every evening, an AI closes out my inbox for me.',
    story:
      'Between my engineering work at RedMane, studying, creating content, and teaching at KIDLIN, 50 to 60 emails a day on my business inbox created unnecessary mental overhead.\n\nSo I built an automated evening inbox workflow. Every day at 8:00 PM, it reads the emails received over the past 24 hours and understands their content instead of matching keywords, sorting them into Important, Investors, Clients, Students, and Promotional.\n\nIt never deletes an email on its own. By 8:05 PM it sends me one briefing of what actually matters: replies that are urgent, to-dos pulled out of threads, and invoices.',
    lesson: 'Good automation does not need to replace a whole job. Sometimes the best system simply removes a decision you were making dozens of times a day.',
    stats: [
      { label: 'Daily sweep', value: '8:00 PM' },
      { label: 'Daily volume', value: '50 to 60 emails' },
      { label: 'Auto-delete', value: 'Never' },
      { label: 'Briefing', value: '8:05 PM' },
    ],
    tags: ['Scheduled Workflow', 'Semantic Categorization', 'Task Extraction', 'Daily Briefing', 'No Auto-Delete'],
    links: [{ label: 'Explore Workflow', href: '#visual-ai-inbox-manager', kind: 'primary', icon: 'architecture' }],
    visual: 'illustration',
  },
  {
    id: 'ai-news-agent',
    number: '09',
    tier: 'supporting',
    name: 'AI News Agent',
    category: 'RESEARCH AUTOMATION',
    status: 'Running daily',
    statusTone: 'active',
    headline: 'I didn’t want to search for AI news every morning.',
    story:
      'I used to spend 20 to 30 minutes every morning going through newsletters, Hacker News, X, and tech outlets to find what actually mattered in applied AI.\n\nSo I automated the research. I first built it as a multi-agent pipeline on CrewAI, then moved it to Muse by Meta, which made the scheduling and upkeep much simpler. Now every morning at 8:00 AM, the agent scans recent developments, filters out hype and noise, ranks stories by their practical engineering impact, picks the top 5, and writes a short briefing with a "why it matters" for each one.',
    lesson: 'Automate repetitive research so you can spend the morning building instead of scrolling.',
    stats: [
      { label: 'Schedule', value: '8:00 AM daily' },
      { label: 'Time saved', value: '~30 min/day' },
      { label: 'Briefing', value: 'Top 5 stories' },
    ],
    tags: ['Muse by Meta', 'CrewAI (v1)', 'Scheduled Agent', 'Research Automation', 'Ranking & Filtering', 'Daily Briefing'],
    links: [{ label: 'Explore Workflow', href: '#visual-ai-news-agent', kind: 'primary', icon: 'architecture' }],
    visual: 'illustration',
  },
  {
    id: 'party-games',
    number: '10',
    tier: 'supporting',
    name: 'Pocket Party Games',
    category: 'PRODUCT ENGINEERING · FLUTTER · LOCAL MULTIPLAYER',
    status: 'Live on the App Store',
    statusTone: 'live',
    headline: 'I got tired of ads and paywalls, so I built the game-night app I wanted.',
    story:
      'My friends and I play mobile party games a lot, and we kept running into the same walls: ads, subscriptions, and basic features behind a paywall. So I built the version we actually wanted, and it is now live on the App Store.\n\nPocket Party Games puts eight games in one Flutter app, including Trivia, Imposter, Pictionary, Act It Out, and Truth or Dare, with rules and modes you can configure. Everything works offline on one phone. For competitive modes, one phone can host a temporary, encrypted room on the local Wi-Fi, so everyone plays from their own device with private prompts and secret votes. There are no accounts, no analytics, no ads, and no cloud backend.\n\nNew modes come from how we actually play. I notice the friction, build the fix, test it with the group, and ship the update.',
    lesson:
      'The best product signal is the friction you feel every week. When it is small enough to build, building it beats waiting for someone else to.',
    stats: [
      { label: 'Games', value: '8 in one app' },
      { label: 'Multiplayer', value: 'Encrypted local Wi-Fi rooms' },
      { label: 'Accounts / Ads', value: 'None' },
      { label: 'Platform', value: 'iOS · Web' },
    ],
    tags: ['Flutter', 'Local-Network Multiplayer', 'Offline-First', 'Privacy by Design', 'Configurable Game Modes', 'AI-Assisted Development'],
    links: [
      { label: 'Download on the App Store', href: 'https://apps.apple.com/us/app/pocket-party-games-imposter/id6809052959', kind: 'primary', icon: 'appstore' },
      { label: 'Play on the Web', href: 'https://rshukla2.github.io/PocketPartyGames/', kind: 'secondary', icon: 'external' },
      { label: 'View on GitHub', href: 'https://github.com/rshukla2/PocketPartyGames', kind: 'secondary', icon: 'github' },
    ],
    visual: 'illustration',
  },
  {
    id: 'calorify',
    number: '11',
    tier: 'supporting',
    name: 'Calorify',
    category: 'MULTIMODAL AI · CONSUMER PRODUCT',
    status: 'Web demo',
    statusTone: 'live',
    headline: 'I built a calorie tracker you can just talk to, or show a photo.',
    story:
      'Most calorie trackers make you search a database for every ingredient. I wanted to describe a meal in plain words, or take a photo of it, and get a reasonable estimate.\n\nCalorify is a mobile-first calorie and macro tracker built with React, TypeScript, and Vite. It calculates calorie and macro targets from your stats and goals, logs meals, and shows your history. Its AI features are powered by Google Gemini through a small Express server: natural-language food estimates, meal-photo analysis, and an AI nutrition coach that stays on topic and ignores attempts to override its instructions. The server protects the API key with per-minute, per-day, and global rate limits. There is also an optional GLP-1 companion for medication schedules and symptoms.\n\nAll data stays in the browser, with no account and no cloud sync. The public web demo runs in demo mode, where the AI features return sample responses instead of calling Gemini.',
    lesson: 'Putting an LLM behind a public app is easy. Putting limits around it, for cost, scope, and abuse, is the real work.',
    stats: [
      { label: 'AI', value: 'Google Gemini' },
      { label: 'Inputs', value: 'Text · Meal photos' },
      { label: 'Guardrails', value: 'Rate limits · Scoped coach' },
      { label: 'Data', value: 'Stays on device' },
    ],
    tags: ['React', 'TypeScript', 'Gemini API', 'Multimodal AI', 'Express', 'Rate Limiting', 'Vitest', 'Playwright'],
    links: [
      { label: 'Try the Demo', href: 'https://rshukla2.github.io/Calorify/', kind: 'primary', icon: 'external' },
      { label: 'View on GitHub', href: 'https://github.com/rshukla2/Calorify', kind: 'secondary', icon: 'github' },
    ],
    visual: 'illustration',
  },
  {
    id: 'ai-content-creation',
    number: '12',
    tier: 'supporting',
    name: 'AI Content Creation System',
    category: 'CREATIVE AUTOMATION',
    status: 'Archived',
    statusTone: 'archived',
    headline: 'I started treating content creation like a system.',
    story:
      'Making good content consistently meant researching ideas, picking strong topics, finding the angle, writing scripts, reviewing drafts, generating supporting media, and producing videos.\n\nInstead of doing every repetitive step by hand, I built an AI-assisted content system around that workflow. Orchestrated through Make.com, the pipeline connected research steps, topic filters, and structured scriptwriting. Human review stayed as a required checkpoint before video generation with HeyGen digital twins and AI B-roll from Higgsfield.\n\nI have since retired this system, but the pattern of automating the repetitive work around a creative decision carried into everything I built after it.',
    lesson: 'The goal isn’t to remove creativity from content creation. It’s to remove the repetitive work surrounding it.',
    stats: [
      { label: 'Orchestrator', value: 'Make.com' },
      { label: 'Video avatars', value: 'HeyGen' },
      { label: 'AI B-roll', value: 'Higgsfield' },
      { label: 'Human review', value: 'Every piece' },
    ],
    tags: ['Make.com', 'HeyGen Digital Twins', 'Higgsfield AI B-Roll', 'Scriptwriting Workflow', 'Human-in-the-Loop'],
    links: [{ label: 'View Workflow', href: '#visual-ai-content-creation', kind: 'primary', icon: 'architecture' }],
    visual: 'illustration',
  },

  // ───────────────────────── EXPERIMENTS ─────────────────────────
  {
    id: 'impulse-app',
    number: '13',
    tier: 'experiment',
    name: 'Impulse',
    category: 'FROM CURIOSITY TO APP',
    status: 'Archived · Web demo',
    statusTone: 'archived',
    headline: 'I read about an app in South Korea. A few hours later, I had my own version.',
    story:
      'I read about a South Korean trend built around the thrill of shopping: browsing, adding to cart, and placing an order, without anything ever arriving.\n\nInstead of wondering why it did not exist where I live, I built my own version the same evening. Impulse grew into a Flutter app where you browse real-looking products, groceries, and dishes, place fake orders, and see how much money you saved by not buying anything. It went through closed testing on Google Play, and I have since archived it.\n\nThe web demo runs entirely in the browser from a frozen catalog of 1,000 products across 8 regions with exchange rates for 249 countries, served by an in-app interceptor so the UI works exactly as it did against the real API.',
    lesson: 'Curiosity becomes far more valuable when experimenting is cheap.',
    stats: [
      { label: 'First prototype', value: '1 evening' },
      { label: 'Built with', value: 'Flutter' },
      { label: 'Status', value: 'Archived · Web demo' },
    ],
    tags: ['Flutter', 'Riverpod', 'Rapid Prototyping', 'Offline Demo Mode', 'Product Experiment'],
    links: [
      { label: 'Try the Web Demo', href: 'https://rshukla2.github.io/Impulse-FakeShoppingSimulator/', kind: 'primary', icon: 'external' },
      { label: 'View on GitHub', href: 'https://github.com/rshukla2/Impulse-FakeShoppingSimulator', kind: 'secondary', icon: 'github' },
    ],
    visual: 'illustration',
  },
  {
    id: 'spin-the-wheel',
    number: '14',
    tier: 'experiment',
    name: 'Spin the Wheel',
    category: '30 MINUTE BUILD',
    status: 'Live',
    statusTone: 'live',
    headline: 'I wanted a better Reel hook wheel.',
    story:
      'I wanted a randomized spin-the-wheel for picking short-form video hooks. The tools I found were full of ads, clunky animations, and rigid settings.\n\nInstead of searching further, I built my own in 15 to 30 minutes and deployed a smooth Canvas app to GitHub Pages. It proved a simple point that guides everything I teach today.',
    lesson: 'AI dramatically reduces the distance between “I wish this existed” and “I built it.”',
    stats: [
      { label: 'Build time', value: '~20 mins' },
      { label: 'Ads', value: 'None' },
      { label: 'Iteration speed', value: 'Instant' },
    ],
    tags: ['Rapid Prototyping', 'AI-Assisted Development', 'Canvas Physics', 'GitHub Pages'],
    links: [
      { label: 'Try the Wheel', href: 'https://rshukla2.github.io/Spin-the-Wheel/', kind: 'primary', icon: 'external' },
      { label: 'View on GitHub', href: 'https://github.com/rshukla2/Spin-the-Wheel', kind: 'secondary', icon: 'github' },
    ],
    visual: 'live',
  },
];

export const APPROACH_STEPS = [
  {
    number: '01',
    title: 'OBSERVE',
    headline: 'Notice friction.',
    body: 'I keep a list of repetitive tasks, frustrating processes, and tools I wish existed. That list is where most of my projects start.',
  },
  {
    number: '02',
    title: 'IMAGINE',
    headline: 'Ask what AI changes.',
    body: 'I decide whether automation or an agent would actually help, and whether a small custom tool would beat another subscription.',
  },
  {
    number: '03',
    title: 'BUILD',
    headline: 'Prototype before debating.',
    body: 'I make a small working version and learn from using it. An afternoon prototype usually answers more questions than a week of discussion.',
  },
  {
    number: '04',
    title: 'AUTOMATE',
    headline: 'Turn useful experiments into systems.',
    body: 'If I use something more than twice, I look for the parts I can trigger with a schedule, webhook, or API.',
  },
  {
    number: '05',
    title: 'TEACH',
    headline: 'Turn experience into a framework.',
    body: 'Once a system works, I write down the decisions, workflow, mistakes, and reusable code so someone else can build it too.',
  },
];

export const TEACHING_PILLARS = [
  {
    title: 'BUILD',
    subtitle: 'From Idea to Software',
    points: [
      'Turn concepts into functional applications, web apps, and prototypes',
      'Use AI-assisted coding without losing track of how the software works',
      'Create internal tools for a specific workflow or problem',
    ],
    outcome: 'Build and ship useful software with AI, even if you are new to code.',
  },
  {
    title: 'AUTOMATE',
    subtitle: 'From Tasks to Systems',
    points: [
      'Replace repeatable routines with scheduled workflows and webhooks',
      'Connect research, email, and calendar tools',
      'Build personal assistants that work with your own data',
    ],
    outcome: 'Spend less time moving information between tools by hand.',
  },
  {
    title: 'THINK',
    subtitle: 'From Tool Chasing to Mental Models',
    points: [
      'Decide which problems are suited for AI and which should stay manual',
      'Understand LLMs, context windows, and tool calling',
      'Work from problem to prototype to a dependable system',
    ],
    outcome: 'Learn principles that remain useful when the tools change.',
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'redmane',
    role: 'Lead Software Engineer',
    organization: 'RedMane Technology',
    period: '2023 to Present',
    summary:
      'Leading financial systems engineering on enterprise government software: Azure Functions and queue-based integrations between mCase, a custom middle tier, and Dynamics 365, event-driven C# / .NET services, and delivery across a 4-person Finance team through go-live readiness. I also designed and run an internal multi-agent AI validation pilot that speeds up testing for developers and QA.',
    metrics: [
      { value: '10,000+', label: 'Daily financial transactions supported' },
      { value: '3x', label: 'Fewer financial data discrepancies' },
      { value: '4-person', label: 'Finance engineering team led' },
      { value: '50 tables', label: 'Synchronized by automation I built' },
    ],
    skills: ['C#', '.NET', 'Python', 'Azure Functions', 'Dynamics 365', 'Event-Driven Architecture', 'Enterprise APIs', 'Agentic AI'],
    badge: 'Lead Engineering',
  },
  {
    id: 'kidlin',
    role: 'AI Educator',
    organization: 'KIDLIN School of AI',
    period: '2026 to Present',
    summary:
      'Teaching students, working professionals, and founders how to use generative AI, build agents, write software with AI, and automate real workflows. I also co-built the KIDLIN app and its Lumi AI tutor.',
    skills: ['Practical AI', 'Agent Workflows', 'Prompt Engineering', 'AI Coding Tools', 'Curriculum Design'],
    badge: 'Current Teaching',
  },
  {
    id: 'return-done',
    role: 'Co-Founder & CTO',
    organization: 'Return Done',
    period: '2022 to 2023',
    summary:
      'Previous venture. Architected and co-built a full-stack returns platform with React, .NET / C#, Azure, and Stripe. Turned more than 500 customer interviews into product and technical requirements, ran an earlier 250-user pilot, and grew the platform to more than 5,000 users.',
    metrics: [
      { value: '500+', label: 'Customer interviews' },
      { value: '5,000+', label: 'Platform users' },
    ],
    skills: ['React', '.NET / C#', 'Azure', 'Stripe Integration', 'Product Strategy', 'Customer Discovery'],
  },
  {
    id: 'procrastfree',
    role: 'Founder / CEO',
    organization: 'ProcrastFree',
    period: '2021 to 2023',
    summary:
      'Previous venture. Founded a student productivity company after more than 200 customer interviews. Led product development, operations, and campus distribution, selling more than 2,000 units at a profit.',
    metrics: [
      { value: '200+', label: 'Customer interviews' },
      { value: '2,000+', label: 'Units sold, profitably' },
    ],
    skills: ['Product Discovery', 'Rapid Prototyping', 'Stakeholder Interviews', 'Operations', 'P&L Management'],
  },
  {
    id: 'iit-ta',
    role: 'Computer Science Teaching Assistant',
    organization: 'Illinois Institute of Technology',
    period: '2019 to 2022',
    summary:
      'Taught and mentored undergraduate students in object-oriented programming, Java, algorithms, and data structures.',
    skills: ['Java', 'Object-Oriented Design', 'Data Structures', 'Mentorship', 'CS Pedagogy'],
  },
];

export const EDUCATION = [
  {
    institution: 'Humphreys University',
    degrees: ['Master of Business Administration (MBA), Information Technology and Project Management'],
    note: '2026 to Present. In progress, alongside full-time engineering work.',
  },
  {
    institution: 'Illinois Institute of Technology',
    degrees: [
      'Bachelor of Science (B.S.) in Computer Science',
      'Master of Business Administration (MBA) in Technological Entrepreneurship',
    ],
    note: 'Studied computer science alongside technology entrepreneurship and business.',
  },
  {
    institution: 'University of Birmingham',
    degrees: ['Computer Science International Study Program'],
    note: 'International study program focused on software engineering and algorithms.',
  },
];

export const WRITING_ARTICLES: ArticleItem[] = [
  {
    id: 'post-1',
    title: 'Why Giving an AI One Giant Prompt Fails (And How Agent Orchestration Fixes It)',
    summary:
      'Breaking a 40-page PRD into 326 atomic tasks with dependency graphs and verification loops. Why task isolation beats massive context windows.',
    readTime: '6 min read',
    tag: 'Agent Architecture',
    publishedDate: 'Applied Experiments',
    url: 'https://www.linkedin.com/posts/rishi-2k_i-got-tired-of-being-a-project-manager-for-activity-7473793241646030848-Ljr7',
  },
  {
    id: 'post-2',
    title: 'The 30-Minute Prototype: Why Experimentation is the Highest-Leverage Skill in AI',
    summary:
      'When the cost of building software drops to near zero, the bottleneck shifts from technical syntax to problem identification and taste.',
    readTime: '4 min read',
    tag: 'Vibe Coding & Mindset',
    publishedDate: 'Builder Reflections',
    url: 'https://www.linkedin.com/posts/rishi-2k_one-of-the-biggest-changes-ai-has-made-in-activity-7496827037890949120-1shB',
  },
  {
    id: 'post-3',
    title: 'I Built a Team of AI Agents to Run My Day-to-Day Work',
    summary:
      'How one Chief of Staff agent plans each request, hands work to about ten specialists, sends every task to the cheapest model that can do it well, and keeps me in control of anything that matters.',
    readTime: '5 min read',
    tag: 'Multi-Agent Systems',
    publishedDate: 'Build Breakdown',
    url: 'https://www.linkedin.com/in/rishi-2k/',
  },
  {
    id: 'post-4',
    title: 'Teaching AI to Non-Engineers: Focus on Leverage, Not Tool Obsession',
    summary:
      'Tools change every week. The core principles of problem decomposition, prompt precision, and automated loops remain invariant.',
    readTime: '5 min read',
    tag: 'AI Education',
    publishedDate: 'Pedagogy',
    url: 'https://www.linkedin.com/in/rishi-2k/',
  },
];
