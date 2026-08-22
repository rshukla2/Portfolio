import { Project, ExperienceItem, ArticleItem } from '../types';

export const PERSONAL_INFO = {
  name: 'Rishi Shukla',
  shortName: 'Rishi',
  eyebrow: 'AI PRACTITIONER · EDUCATOR · SOFTWARE ENGINEER',
  headlineFirst: 'I build with AI.',
  headlineSecond: 'I teach people to do the same.',
  bio: 'I experiment with AI agents, automation, and AI-native software to solve real problems — then turn what I learn into practical frameworks others can use.',
  currentlyExploring: 'Multi-agent content & code synthesis systems',
  email: 'rishishukla2k@gmail.com',
  github: 'https://github.com/rshukla2',
  linkedin: 'https://www.linkedin.com/in/rishi-2k/',
  instagram: 'https://www.instagram.com/rishi.builds.ai/',
  philosophy: 'I rarely leave a problem alone.',
  philosophyBody:
    'If something feels repetitive, inefficient, frustrating, or simply interesting, my first instinct is usually: Can I build something for this?',
};

export const PROJECTS: Project[] = [
  {
    id: 'ai-code-manager',
    number: '01',
    category: 'AI CODE MANAGER',
    headline: 'What if an AI could manage another AI building software?',
    story:
      'Giving an AI coding agent one enormous prompt resulted in generic implementations, missed edge cases, and architectural drift. Breaking a project into small tasks dramatically improved quality — but manually managing dozens of tasks made the human the bottleneck.\n\nSo I built an autonomous AI Project & Code Manager: it ingests a Product Requirements Document (PRD), breaks it into atomic tasks, builds a dependency DAG, feeds tasks to Codex sequentially, instructs the model to inspect existing modules before modifying code, runs verification tests, and loops until completion.',
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
    secondaryCtaText: 'View on GitHub',
  },
  {
    id: 'spin-the-wheel',
    number: '02',
    category: '30 MINUTE BUILD',
    headline: 'I wanted a better Reel hook wheel.',
    story:
      'I wanted to use a randomized spin-the-wheel mechanism for short-form video Reel hooks. Existing web tools were riddled with ads, clunky animations, and rigid customization.\n\nInstead of continuing to search, I built my own tailored tool in 15–30 minutes, deploying a fluid Canvas application live to GitHub Pages. It proved a simple truth that guides everything I teach today.',
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
  {
    id: 'impulse-app',
    number: '03',
    category: 'FROM CURIOSITY TO APP',
    headline: 'I read about an app in South Korea. A few hours later, I had my own version.',
    story:
      'I read about the South Korean phenomenon often described as “Food Never Comes” — an experience engineered purely around the dopamine feedback loop of shopping cart psychology and unboxing anticipation.\n\nRather than wondering why this did not exist in the US or India, I rapidly built my own interpretation in a single evening. The experiment evolved from a prototype into full frontend, backend, real application logic, web deployment, and an Android Google Play Store release.',
    lesson: 'Curiosity becomes exponentially more valuable when experimentation is cheap.',
    stats: [
      { label: 'Prototype Time', value: '1 Evening' },
      { label: 'Platforms', value: 'Web & Android' },
      { label: 'Production Ready', value: 'Play Store' },
    ],
    tags: ['Full-Stack', 'React', 'Mobile App', 'Google Play Store', 'Dopamine UX'],
    githubUrl: 'https://github.com/rshukla2/Impulse-FakeShoppingSimulator',
    demoUrl: 'https://rshukla2.github.io/Impulse-FakeShoppingSimulator/',
    primaryCtaText: 'Open Live App',
    secondaryCtaText: 'View on GitHub',
  },
  {
    id: 'ai-news-agent',
    number: '04',
    category: 'AUTOMATION',
    headline: 'I didn’t want to search for AI news every morning.',
    story:
      'I used to spend 20–30 minutes every morning combing through newsletters, Hacker News, X, and tech outlets to find what actually mattered in applied AI.\n\nI automated the entire research loop. Every morning at 5:00 AM, a background agent team scans the web for recent developments, filters out hype and noise, ranks stories by practical engineering impact, selects the top 5, generates concise takeaways with "why it matters", and delivers an executive briefing straight to my inbox.',
    lesson: 'Automate repetitive cognitive work so you can spend your morning building instead of scrolling.',
    stats: [
      { label: 'Schedule', value: '5:00 AM Daily' },
      { label: 'Time Saved', value: '30 min/day' },
      { label: 'Curated Stories', value: 'Top 5 Signal' },
    ],
    tags: ['CrewAI', 'OpenAI API', 'Gmail API', 'Web Scraping', 'Autonomous Cron'],
  },
  {
    id: 'personal-ai-assistant',
    number: '05',
    category: 'PERSONAL AI SYSTEM',
    headline: 'What if I could talk to my digital life instead of managing it?',
    story:
      'Managing disparate productivity silos — email threads, calendar invites, Google Docs, meeting takeaways, and Fireflies recordings — creates constant context switching.\n\nI engineered a conversational AI orchestrator that unifies these tools through natural language. Instead of opening four tabs, a single command analyzes yesterday’s unread threads, extracts action items from meeting notes, checks schedule availability, and blocks deep-work focus sessions.',
    lesson: 'Interfaces can become conversational, while automation happens underneath.',
    stats: [
      { label: 'Integrated Services', value: '7+ APIs' },
      { label: 'Interface', value: 'Conversational' },
      { label: 'Action Latency', value: '< 2.5s' },
    ],
    tags: ['LLM Tool Calling', 'Google Workspace', 'Fireflies API', 'Calendar Automation'],
  },
  {
    id: 'content-automation',
    number: '06',
    category: 'AI WORKFLOWS',
    headline: 'I started treating content creation like a system.',
    story:
      'Creating educational content consistently requires rigorous research, topic discovery, script drafting, formatting, and cross-platform distribution. Doing all of this manually quickly leads to creative burnout.\n\nI built a modular content pipeline linking research agents, hook generators, script structuring nodes, and publishing triggers via Make.com and n8n. The system handles the mechanical scaffolding so I can focus 100% on quality and teaching insights.',
    lesson: 'AI is often most useful when it quietly removes repetitive work in the background.',
    stats: [
      { label: 'Pipeline Stages', value: '5 Automated Steps' },
      { label: 'Orchestration', value: 'Make & n8n' },
      { label: 'Focus', value: '100% on Insights' },
    ],
    tags: ['Make.com', 'n8n', 'Scriptwriting Agents', 'Topic Discovery', 'Workflow Orchestration'],
  },
];

export const APPROACH_STEPS = [
  {
    number: '01',
    title: 'OBSERVE',
    headline: 'Notice friction.',
    body: 'I pay attention to repetitive work, frustrating processes, unmet needs, and ideas that make me think, “Why doesn’t this exist?” Friction is the clearest signal of an unbuilt tool.',
  },
  {
    number: '02',
    title: 'IMAGINE',
    headline: 'Ask what AI changes.',
    body: 'Could this be automated? Could an agent handle the cognitive heavy lifting? Could I prototype a bespoke tool in an hour instead of settling for generic software?',
  },
  {
    number: '03',
    title: 'BUILD',
    headline: 'Prototype before debating.',
    body: 'AI coding tools make experimentation practically free. I would rather build a working prototype in one afternoon and learn from real use than spend weeks debating whether the idea will work.',
  },
  {
    number: '04',
    title: 'AUTOMATE',
    headline: 'Turn useful experiments into systems.',
    body: 'If an experiment proves valuable more than twice, I systematically remove myself from the loop using autonomous triggers, cron agents, and API webhooks.',
  },
  {
    number: '05',
    title: 'TEACH',
    headline: 'Turn experience into a framework.',
    body: 'Once I understand what works, I synthesize the intuition, workflows, and code into clear mental models that students, founders, and professionals can apply immediately.',
  },
];

export const TEACHING_PILLARS = [
  {
    title: 'BUILD',
    subtitle: 'From Idea to Software',
    points: [
      'Turn concepts into functional applications, web apps, and prototypes',
      'Leverage AI-assisted coding and vibe coding without getting overwhelmed',
      'Create internal tools and customized software tailored to your exact workflow',
    ],
    outcome: 'Learn how non-technical builders can ship real software using AI tools.',
  },
  {
    title: 'AUTOMATE',
    subtitle: 'From Tasks to Systems',
    points: [
      'Replace manual routines with multi-agent workflows and webhook pipelines',
      'Orchestrate autonomous research, email briefing, and calendar agents',
      'Build personal productivity assistants that connect directly to your data',
    ],
    outcome: 'Eliminate repetitive cognitive labor so you can focus on high-leverage work.',
  },
  {
    title: 'THINK',
    subtitle: 'From Tool Chasing to Mental Models',
    points: [
      'Evaluate which problems are suited for AI and which should stay manual',
      'Understand the architecture of LLMs, context windows, and tool calling',
      'Master the mindset: Problem → Opportunity → AI Solution → System',
    ],
    outcome: 'Develop timeless intuition that outlasts the weekly wave of new AI tools.',
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'kidlin',
    role: 'AI Educator',
    organization: 'KIDLIN School of AI',
    period: '2026 — Present',
    summary:
      'Teaching practical, applied AI to students, working professionals, and founders. Focused on demystifying generative AI, autonomous agent design, vibe coding, and real-world system automation.',
    skills: ['Practical AI', 'Agent Workflows', 'Prompt Engineering', 'AI Coding Tools', 'Curriculum Design'],
    badge: 'Current Teaching',
  },
  {
    id: 'redmane',
    role: 'Lead Software Engineer',
    organization: 'RedMane Technology',
    period: '2023 — Present',
    summary:
      'Leading engineering efforts on high-reliability enterprise systems, cloud infrastructure, backend microservices, and distributed architecture. Incorporating AI-assisted developer tooling into modern engineering workflows.',
    skills: ['C#', '.NET', 'Python', 'Azure Cloud', 'Distributed Systems', 'Event-Driven Architecture', 'Enterprise APIs'],
    badge: 'Lead Engineering',
  },
  {
    id: 'return-done',
    role: 'Co-Founder & CTO',
    organization: 'Return Done',
    period: '2022 — 2023',
    summary:
      'Architected and deployed an end-to-end e-commerce returns automation platform. Led full-stack technical execution from early stakeholder interviews to live customer pilots and payment infrastructure.',
    skills: ['React', '.NET / C#', 'Azure', 'Stripe Integration', 'Product Strategy', 'Customer Discovery'],
  },
  {
    id: 'procrastfree',
    role: 'Founder / CEO',
    organization: 'ProcrastFree',
    period: '2021 — 2023',
    summary:
      'Founded a student productivity company based on 200+ customer discovery interviews. Led cross-functional team, rapid prototyping, university campus distribution, selling over 2,000+ units profitably.',
    skills: ['Product Discovery', 'Rapid Prototyping', 'Stakeholder Interviews', 'Operations', 'P&L Management'],
  },
  {
    id: 'iit-ta',
    role: 'Computer Science Teaching Assistant',
    organization: 'Illinois Institute of Technology',
    period: '2019 — 2022',
    summary:
      'Mentored and instructed undergraduate computer science students in Object-Oriented Programming, Java algorithms, and data structures. Fostered deep conceptual understanding and clean coding practices.',
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
    note: 'Dual focus on rigorous systems engineering and entrepreneurial venture building.',
  },
  {
    institution: 'University of Birmingham',
    degrees: ['Computer Science International Study Program'],
    note: 'Global academic study in software engineering and algorithms.',
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
    url: 'https://www.linkedin.com/in/rishi-2k/',
  },
  {
    id: 'post-2',
    title: 'The 30-Minute Prototype: Why Experimentation is the Highest-Leverage Skill in AI',
    summary:
      'When the cost of building software drops to near zero, the bottleneck shifts from technical syntax to problem identification and taste.',
    readTime: '4 min read',
    tag: 'Vibe Coding & Mindset',
    publishedDate: 'Builder Reflections',
    url: 'https://www.linkedin.com/in/rishi-2k/',
  },
  {
    id: 'post-3',
    title: 'Beyond the ChatGPT Box: Building Conversational Interfaces Over Real APIs',
    summary:
      'How to connect LLMs to your actual digital life (Email, Calendar, Docs, Fireflies) without exposing credentials or getting hallucinated actions.',
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
