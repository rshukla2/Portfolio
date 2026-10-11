import { Project, ExperienceItem, ArticleItem } from '../types';

export const PERSONAL_INFO = {
  name: 'Rishi Shukla',
  shortName: 'Rishi',
  eyebrow: 'AI BUILDER · EDUCATOR · SOFTWARE ENGINEER',
  headlineFirst: 'I build with AI.',
  headlineSecond: 'I teach people to do the same.',
  bio: 'I build AI agents, automations, and software for problems I run into. Then I turn what works into practical lessons others can use.',
  currentlyExploring: 'Multi-agent systems for content and code',
  email: 'rishi@kidlinschool.ai',
  github: 'https://github.com/rshukla2',
  linkedin: 'https://www.linkedin.com/in/rishi-2k/',
  instagram: 'https://www.instagram.com/rishi.builds.ai/',
  philosophy: 'I rarely leave a problem alone.',
  philosophyBody:
    'When something is repetitive, frustrating, or interesting, my first question is usually: Can I build a better way?',
};

export const PROJECTS: Project[] = [
  {
    id: 'enterprise-delivery',
    number: '01',
    category: 'ENTERPRISE AI · MULTI-AGENT SYSTEMS · DEVELOPER PRODUCTIVITY',
    headline: 'I designed an agentic system that delivers and validates software, not just writes it.',
    story:
      'AI was accelerating how fast I could write code, but I kept losing 3 to 4 hours recreating complex application data and state just to test a single change. Coding stopped being the bottleneck; setup, validation, and repetitive testing became the bottleneck.\n\nSo I designed a multi-agent delivery system that takes software requirements and coordinates the whole delivery and validation workflow. A planner agent decomposes the requirements and flags anything ambiguous, and a human resolves that ambiguity. A setup agent prepares safe, disposable test conditions from reusable setup knowledge, so every run starts from a clean, repeatable state. A tester agent then drives the application through the UI and validates outcomes against executable test specifications. When something fails, structured failure evidence is packaged and handed to a fixer agent, which repairs and rebuilds, and the system retests. Guardrails and stop conditions bound every repair loop, and a human reviews and approves the result before anything is considered delivered.',
    lesson:
      'Speeding up code generation only helps if the rest of the delivery loop can keep up. Automate the repetitive validation, and keep humans responsible for ambiguity and final approval.',
    stats: [
      { label: 'Loop', value: 'Deliver → Validate → Fix' },
      { label: 'Test State', value: 'Disposable' },
      { label: 'Guardrails', value: 'Stop Conditions' },
      { label: 'Sign-off', value: 'Human Approval' },
    ],
    tags: [
      'Multi-Agent Orchestration',
      'Executable Test Specs',
      'Browser / UI Testing',
      'Reusable Setup Knowledge',
      'Structured Failure Evidence',
      'Human-in-the-Loop',
    ],
    primaryCtaText: 'Explore Architecture',
    secondaryCtaText: 'View on GitHub',
  },
  {
    id: 'ai-code-manager',
    number: '02',
    category: 'AI CODE MANAGER',
    headline: 'I built an AI project manager for coding agents.',
    story:
      'Giving an AI coding agent one enormous prompt resulted in generic implementations, missed edge cases, and architectural drift. Breaking a project into small tasks dramatically improved quality, but manually managing dozens of tasks made the human the bottleneck.\n\nSo I built an autonomous AI Project & Code Manager: it ingests a Product Requirements Document (PRD), breaks it into atomic tasks, builds a dependency DAG, feeds tasks to Codex sequentially, instructs the model to inspect existing modules before modifying code, runs verification tests, and loops until completion.',
    lesson:
      'An experiment in AI orchestration and engineering systems: 40-page PRD → 326 implementation tasks → 324 completed successfully in ~36 hours of autonomous execution.',
    stats: [
      { label: 'PRD Scope', value: '40 Pages' },
      { label: 'Generated Tasks', value: '326' },
      { label: 'Success Rate', value: '99.4%' },
      { label: 'Autonomous Run', value: '~36 hrs' },
    ],
    tags: ['Autonomous Agents', 'Codex', 'Task Dependency DAG', 'Automated QA', 'MIT License'],
    githubUrl: 'https://github.com/rshukla2/ai-code-manager',
    primaryCtaText: 'Explore Architecture',
    secondaryCtaText: 'View on GitHub',
  },
  {
    id: 'agent-reliability-lab',
    number: '03',
    category: 'AI RELIABILITY · EVALS · OBSERVABILITY · AGENT ENGINEERING',
    headline: 'I built a lab for deliberately breaking AI agents — so I could watch how they recover.',
    story:
      'Most agent demos show the happy path. The interesting question is what happens when agents fail: a tool returns a 500, a call times out, a tool produces malformed structured output, a prompt-injection attempt slips through, retrieval returns irrelevant context, or an agent starts looping on the same call.\n\nSo I built a reliability lab: an environment for deliberately injecting failures into agent workflows and measuring whether the system can detect, recover from, or safely escalate them. It exercises retries with backoff, fallback behavior, stop conditions, human escalation, guardrails, structured-output validation, traces and observability, and evals for regression testing, with latency and cost tracked as first-class signals.\n\nThe point is not a perfect agent. It is a repeatable harness: every injected failure produces a trace, a recovery decision (retry, fallback, escalate, or stop safely), and a pass or fail against the expected behavior.',
    lesson:
      'An agent is only as reliable as its worst failure mode. Design and test the recovery paths first, and the success paths become easy to trust.',
    stats: [
      { label: 'Focus', value: 'Failure First' },
      { label: 'Recovery', value: 'Retry · Fallback · Escalate · Stop' },
      { label: 'Guardrails', value: 'Stop Conditions' },
      { label: 'Validation', value: 'Structured + Evals' },
    ],
    tags: [
      'Failure Injection',
      'Retries & Backoff',
      'Fallback Behavior',
      'Prompt-Injection Guardrails',
      'Loop Detection',
      'Traces & Observability',
      'Evals / Regression',
      'Human Escalation',
    ],
    primaryCtaText: 'Open the Lab',
    secondaryCtaText: 'View on GitHub',
  },
  {
    id: 'personal-ai-os',
    number: '04',
    category: 'PERSONAL AI OPERATING SYSTEM',
    headline: 'I built a personal AI operating system inside Discord.',
    story:
      'Managing disparate productivity silos (email threads, calendar invites, Google Docs, meeting takeaways, and personal tracking) creates constant context switching.\n\nInstead of opening individual applications and manually completing tasks, I built a conversational personal AI assistant that lives inside Discord. I talk to the assistant conversationally: it determines what tools and services are required, orchestrates across Email, Google Calendar, Wispr Flow meeting notes, Google Drive, Docs, and Sheets, and reports back.\n\nIt even understands a simple convention: starting a message with "Log:" instantly records workouts, protein intake, and deep-work hours into my personal life-tracking spreadsheet without friction.',
    lesson: 'Interfaces can become conversational, while automation happens underneath.',
    stats: [
      { label: 'Interface', value: 'Discord Bot' },
      { label: 'Integrations', value: '9+ Services' },
      { label: 'Life Tracker', value: 'Log: Convention' },
      { label: 'Meeting Intel', value: 'Wispr Flow' },
    ],
    tags: ['Discord Client', 'LLM Tool Calling', 'Wispr Flow', 'Google Workspace', 'Voice & SMS', 'Life Tracking'],
    githubUrl: 'https://github.com/rshukla2',
    primaryCtaText: 'Test Command Box',
    secondaryCtaText: 'View GitHub',
  },
  {
    id: 'ai-content-creation',
    number: '05',
    category: 'AI CONTENT CREATION SYSTEM',
    headline: 'I started treating content creation like a system.',
    story:
      'Creating high-quality content consistently requires researching ideas, identifying strong topics, developing the angle, writing scripts, reviewing drafts, generating supporting media, and creating videos.\n\nInstead of performing each repetitive step manually, I built an AI-assisted content system around the workflow. Orchestrated through Make.com, the pipeline connects research agents, topic discovery filters, and structured scriptwriting nodes. Human review remains a vital checkpoint before generating video through HeyGen digital twins and cinematic AI B-roll via Higgsfield.',
    lesson: 'The goal isn’t to remove creativity from content creation. It’s to remove the repetitive work surrounding it.',
    stats: [
      { label: 'Orchestrator', value: 'Make.com' },
      { label: 'Video Avatars', value: 'HeyGen' },
      { label: 'AI B-Roll', value: 'Higgsfield' },
      { label: 'Human Review', value: '100% Taste' },
    ],
    tags: ['Make.com', 'HeyGen Digital Twins', 'Higgsfield AI B-Roll', 'Scriptwriting Agents', 'Human-in-the-Loop'],
    githubUrl: 'https://github.com/rshukla2',
    primaryCtaText: 'Explore System',
    secondaryCtaText: 'View Architecture',
  },
  {
    id: 'ai-inbox-manager',
    number: '06',
    category: 'AI INBOX MANAGER',
    headline: 'Every evening, an AI closes out my inbox for me.',
    story:
      'Between running a business, working full-time as a software engineer at RedMane, studying, creating content, and teaching at KIDLIN, receiving 50 to 60 emails a day on my business inbox created unnecessary cognitive overhead.\n\nSo I built an automated evening inbox workflow. Every day at 8:00 PM, the system examines emails received over the past 24 hours. It reads and semantically understands the content rather than simply sorting keywords, categorizing messages into Important, Investors, Clients, Students, and Promotional folders.\n\nCrucially, the system never deletes emails autonomously. At 8:05 PM, it delivers a consolidated briefing answering what actually matters: urgent replies, extracted to-do actions, and financial invoices.',
    lesson: 'Good AI automation does not need to replace an entire job. Sometimes the best system simply removes a repetitive decision you were making dozens of times every day.',
    stats: [
      { label: 'Daily Sweep', value: '8:00 PM Cron' },
      { label: 'Daily Volume', value: '50 to 60 Emails' },
      { label: 'Auto-Delete', value: '0 (Safe Policy)' },
      { label: 'Briefing Time', value: '8:05 PM' },
    ],
    tags: ['Autonomous Inbox', 'Semantic Categorization', 'Task Extraction', 'Email Intelligence', 'Zero Deletion'],
    githubUrl: 'https://github.com/rshukla2',
    primaryCtaText: 'See Evening Sweep',
    secondaryCtaText: 'View Architecture',
  },
  {
    id: 'ai-news-agent',
    number: '07',
    category: 'AUTOMATION',
    headline: 'I didn’t want to search for AI news every morning.',
    story:
      'I used to spend 20 to 30 minutes every morning combing through newsletters, Hacker News, X, and tech outlets to find what actually mattered in applied AI.\n\nI automated the entire research loop. Every morning at 5:00 AM, a background agent team scans the web for recent developments, filters out hype and noise, ranks stories by practical engineering impact, selects the top 5, generates concise takeaways with "why it matters", and delivers an executive briefing straight to my inbox.',
    lesson: 'Automate repetitive cognitive work so you can spend your morning building instead of scrolling.',
    stats: [
      { label: 'Schedule', value: '5:00 AM Daily' },
      { label: 'Time Saved', value: '30 min/day' },
      { label: 'Curated Stories', value: 'Top 5 Signal' },
    ],
    tags: ['CrewAI', 'OpenAI API', 'Gmail API', 'Web Scraping', 'Autonomous Cron'],
    githubUrl: 'https://github.com/rshukla2',
    primaryCtaText: 'See Agent Run',
    secondaryCtaText: 'View Workflow',
  },
  {
    id: 'party-games',
    number: '08',
    category: 'PRODUCT ENGINEERING · iOS · AI-ASSISTED DEVELOPMENT',
    headline: 'I got tired of ads and paywalls, so I built the game-night app I wanted.',
    story:
      'Playing mobile party games with friends, I kept running into the same friction: ads, subscriptions, and simple features locked behind paywalls. Instead of continuing to complain about it, I built the version my friends and I actually wanted.\n\nThe app brings imposter-style games, trivia, word and dictionary games, and truth or dare into one place, with configurable rules and modes. No ads, no feature paywalls, no accounts. The center of it is LAN local-network multiplayer: people in the same room join the same session from their own phones, so a game night just works without a shared screen.\n\nNew features and modes came straight from real use with the friend group — saw the friction, built the fix, tested it with actual players, expanded it, and moved it toward an iOS App Store release.',
    lesson:
      'The best product signal is the friction you feel every week. When the fix is small enough to build yourself, building it beats waiting for it.',
    stats: [
      { label: 'Multiplayer', value: 'LAN / Local' },
      { label: 'Modes', value: 'Imposter · Trivia · Dare' },
      { label: 'Ads / Paywalls', value: '0' },
      { label: 'Platform', value: 'iOS · App Store' },
    ],
    tags: [
      'Local-Network Multiplayer',
      'iOS / App Store',
      'Party Game Design',
      'Configurable Modes',
      'AI-Assisted Development',
    ],
    primaryCtaText: 'See the Game Night',
    secondaryCtaText: 'View on GitHub',
  },
  {
    id: 'impulse-app',
    number: '09',
    category: 'FROM CURIOSITY TO APP',
    headline: 'I read about an app in South Korea. A few hours later, I had my own version.',
    story:
      'I read about the South Korean phenomenon often described as “Food Never Comes”: an experience engineered purely around the dopamine feedback loop of shopping cart psychology and unboxing anticipation.\n\nRather than wondering why this did not exist in the US or India, I rapidly built my own interpretation in a single evening. The experiment evolved from a prototype into full frontend, backend, real application logic, web deployment, and an Android Google Play Store release.',
    lesson: 'Curiosity becomes exponentially more valuable when experimentation is cheap.',
    stats: [
      { label: 'Prototype Time', value: '1 Evening' },
      { label: 'Platforms', value: 'Web & Android' },
      { label: 'Production Ready', value: 'Play Store' },
    ],
    tags: ['Full-Stack', 'React', 'Mobile App', 'Google Play Store', 'Dopamine UX'],
    githubUrl: 'https://github.com/rshukla2/Impulse-FakeShoppingSimulator',
    demoUrl: 'https://rshukla2.github.io/Impulse-FakeShoppingSimulator/',
    primaryCtaText: 'Check out the Impulse app',
    secondaryCtaText: 'View on GitHub',
  },
  {
    id: 'spin-the-wheel',
    number: '10',
    category: '30 MINUTE BUILD',
    headline: 'I wanted a better Reel hook wheel.',
    story:
      'I wanted to use a randomized spin-the-wheel mechanism for short-form video Reel hooks. Existing web tools were riddled with ads, clunky animations, and rigid customization.\n\nInstead of continuing to search, I built my own tailored tool in 15 to 30 minutes, deploying a fluid Canvas application live to GitHub Pages. It proved a simple truth that guides everything I teach today.',
    lesson: 'AI dramatically reduces the distance between “I wish this existed” and “I built it.”',
    stats: [
      { label: 'Build Time', value: '20 mins' },
      { label: 'Zero Ad Bloat', value: '100% Custom' },
      { label: 'Iteration Speed', value: 'Instant' },
    ],
    tags: ['Rapid Prototyping', 'Vibe Coding', 'Canvas Physics', 'GitHub Pages'],
    githubUrl: 'https://github.com/rshukla2/Spin-the-Wheel',
    demoUrl: 'https://rshukla2.github.io/Spin-the-Wheel/',
    primaryCtaText: 'Try the Wheel',
    secondaryCtaText: 'View on GitHub',
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
    id: 'kidlin',
    role: 'AI Educator',
    organization: 'KIDLIN School of AI',
    period: '2026 to Present',
    summary:
      'Teaching students, working professionals, and founders how to use generative AI, build agents, write software with AI, and automate real workflows.',
    skills: ['Practical AI', 'Agent Workflows', 'Prompt Engineering', 'AI Coding Tools', 'Curriculum Design'],
    badge: 'Current Teaching',
  },
  {
    id: 'redmane',
    role: 'Lead Software Engineer',
    organization: 'RedMane Technology',
    period: '2023 to Present',
    summary:
      'Leading engineering work across enterprise systems, cloud infrastructure, backend services, and distributed architecture. I also help teams use AI-assisted development tools in day-to-day engineering.',
    skills: ['C#', '.NET', 'Python', 'Azure Cloud', 'Distributed Systems', 'Event-Driven Architecture', 'Enterprise APIs'],
    badge: 'Lead Engineering',
  },
  {
    id: 'return-done',
    role: 'Co-Founder & CTO',
    organization: 'Return Done',
    period: '2022 to 2023',
    summary:
      'Architected and deployed an end-to-end e-commerce returns automation platform. Led full-stack technical execution from early stakeholder interviews to live customer pilots and payment infrastructure.',
    skills: ['React', '.NET / C#', 'Azure', 'Stripe Integration', 'Product Strategy', 'Customer Discovery'],
  },
  {
    id: 'procrastfree',
    role: 'Founder / CEO',
    organization: 'ProcrastFree',
    period: '2021 to 2023',
    summary:
      'Founded a student productivity company after more than 200 customer interviews. Led product development, operations, and campus distribution, selling more than 2,000 units at a profit.',
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
    title: 'Beyond the ChatGPT Box: Building Conversational Interfaces Over Real APIs',
    summary:
      'How to connect LLMs to your actual digital life (Email, Calendar, Docs, Wispr Flow) without exposing credentials or getting hallucinated actions.',
    readTime: '5 min read',
    tag: 'Systems & Workflows',
    publishedDate: 'Practical Guide',
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
