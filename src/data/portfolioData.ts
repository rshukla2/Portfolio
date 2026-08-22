import { Project, ExperienceItem, ArticleItem } from '../types';

export const PERSONAL_INFO = {
  name: 'Rishi Shukla',
  shortName: 'Rishi',
  eyebrow: 'AI BUILDER · EDUCATOR · SOFTWARE ENGINEER',
  headlineFirst: 'I build with AI.',
  headlineSecond: 'I teach people to do the same.',
  bio: 'I build AI agents, automations, and software for problems I run into. Then I turn what works into practical lessons others can use.',
  currentlyExploring: 'Multi-agent systems for content and code',
  email: 'rishishukla2k@gmail.com',
  github: 'https://github.com/rshukla2',
  linkedin: 'https://www.linkedin.com/in/rishi-2k/',
  instagram: 'https://www.instagram.com/rishi.builds.ai/',
  philosophy: 'I rarely leave a problem alone.',
  philosophyBody:
    'When something is repetitive, frustrating, or interesting, my first question is usually: Can I build a better way?',
};

export const PROJECTS: Project[] = [
  {
    id: 'ai-code-manager',
    number: '01',
    category: 'AI CODE MANAGER',
    headline: 'I built an AI project manager for coding agents.',
    story:
      'One enormous prompt gave me generic implementations, missed edge cases, and code that drifted from the original plan. Smaller tasks worked better, but managing hundreds of them by hand became its own job.\n\nI built an AI project manager that reads a Product Requirements Document (PRD), turns it into focused tasks, maps their dependencies, sends them to Codex one at a time, runs tests, and continues until the queue is done.',
    lesson:
      'Starting from a 40-page PRD, the system created 326 tasks and completed 324 of them in about 36 hours.',
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
      'I needed a spin wheel for short-form video hooks. The tools I found had too many ads, awkward animations, or too few options.\n\nI stopped searching and built the version I wanted in about 20 minutes, then published the Canvas app on GitHub Pages.',
    lesson: 'With AI, the gap between “I wish this existed” and “I built it” can be very small.',
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
      'I read about a South Korean app often described as “Food Never Comes.” It recreates the anticipation of shopping and unboxing without a real purchase.\n\nI was curious enough to build my own version that evening. The prototype grew into a frontend, backend, web deployment, and an Android release on the Google Play Store.',
    lesson: 'When an idea is cheap to test, I would rather build it than speculate about it.',
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
      'I was spending 20 to 30 minutes every morning checking newsletters, Hacker News, X, and tech publications for useful AI updates.\n\nI built a scheduled workflow that scans those sources at 5:00 AM, removes duplicate and promotional stories, ranks the rest, summarizes the top five, and emails me a short briefing.',
    lesson: 'The briefing gives me the useful parts of the morning scan without the scrolling.',
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
    headline: 'I wanted one command for email, meetings, and my calendar.',
    story:
      'I kept switching between email, calendar, Google Docs, and Fireflies recordings to piece together the same information.\n\nI built a conversational assistant that connects those services. One command can review unread threads, pull action items from meeting notes, check my calendar, and schedule a focus block.',
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
      'Researching, drafting, formatting, and publishing educational content took time away from the actual teaching.\n\nI built a Make.com and n8n workflow for research, topic ideas, first-pass scripts, formatting, and publishing triggers. I still review the research, rewrite the draft, and make the final call before anything goes out.',
    lesson: 'Automation handles the repeatable steps. I keep the judgment and final edit.',
    stats: [
      { label: 'Pipeline Stages', value: '5 Automated Steps' },
      { label: 'Orchestration', value: 'Make & n8n' },
      { label: 'Human Role', value: 'Review & Editing' },
    ],
    tags: ['Make.com', 'n8n', 'Scriptwriting Agents', 'Topic Discovery', 'Workflow Orchestration'],
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
    title: 'What I Learned Breaking a 40-Page PRD into 326 Tasks',
    summary:
      'Notes from building a dependency graph, running tasks one at a time, and checking each result before moving on.',
    readTime: '6 min read',
    tag: 'Agent Architecture',
    publishedDate: 'Applied Experiments',
    url: 'https://www.linkedin.com/in/rishi-2k/',
  },
  {
    id: 'post-2',
    title: 'The 30-Minute Prototype',
    summary:
      'What changes when a small, useful tool takes less time to build than it does to keep searching for one.',
    readTime: '4 min read',
    tag: 'Vibe Coding & Mindset',
    publishedDate: 'Builder Reflections',
    url: 'https://www.linkedin.com/in/rishi-2k/',
  },
  {
    id: 'post-3',
    title: 'Connecting an LLM to Email, Calendar, and Docs',
    summary:
      'How I connect an assistant to real services while protecting credentials and checking actions before they run.',
    readTime: '5 min read',
    tag: 'Systems & Workflows',
    publishedDate: 'Practical Guide',
    url: 'https://www.linkedin.com/in/rishi-2k/',
  },
  {
    id: 'post-4',
    title: 'Teaching AI Without Chasing Every New Tool',
    summary:
      'The tools change quickly. Breaking down problems, writing clear instructions, and checking the result still matter.',
    readTime: '5 min read',
    tag: 'AI Education',
    publishedDate: 'Pedagogy',
    url: 'https://www.linkedin.com/in/rishi-2k/',
  },
];
