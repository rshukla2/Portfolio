import { MuseDay } from '../types';

export const MUSE_CONFIG = {
  currentReleasedDay: 1,
  officialMuseUrl: 'https://muse.ai/',
  signupFormAction: 'https://formsubmit.co/rishi@kidlinschool.ai',
  seriesStatus: 'Day 1 / 10 · Updated daily',
  affiliationNote: 'Independent resource. Not affiliated with Meta.',
};

export const MUSE_DAYS: MuseDay[] = [
  {
    number: 1,
    status: 'released',
    type: 'Setup',
    title: 'What is Muse, and can it help me build while life is already full?',
    hook:
      'I am testing Meta Muse on real startup workflows while balancing full-time engineering work, an MBA, and building an AI education business.',
    shortDescription:
      'Day 1 is the setup: what Muse is, what I delegated, how it continued working in the background, and where human approval still mattered.',
    prompt:
      'I want you to help me respond to new business inquiries without constantly checking my inbox.\n\nWatch my email for messages that look like a new lead, customer inquiry, workshop request, consultation request, or enrollment inquiry.\n\nWhen you identify one:\n\n- Read the email and understand what the person is asking for.\n- Draft a helpful, personalized response.\n- Check my calendar for availability during the next 7 days.\n- Find an available 30-minute slot.\n- Include that proposed meeting time in the draft when a meeting makes sense.\n- Show me the completed draft for review.\n\nNever send an email without my approval.\n\nIf you are unsure whether an email qualifies or what action to take, ask me instead of guessing.\n\nThe goal is to make sure potential customers receive a fast response without requiring me to monitor my inbox throughout the day.',
    workflowSteps: [
      'Identify startup work that is repetitive enough to delegate.',
      'Ask Muse to continue the workflow while I move between 9-5 at RedMane, MBA, and building Kidlin School of AI.',
      'Let Muse interact with connected tools such as email and calendar where useful.',
      'Review moments where approval or judgment should stay with me.',
    ],
    learnings: [
      'The useful question is not whether an agent can do everything. It is which pieces can keep moving without constant supervision.',
      'Connected tools make the workflow more practical, but approval boundaries matter more when the agent gets closer to real actions.',
    ],
  },
  {
    number: 2,
    status: 'coming-soon',
    type: 'Experiment',
    title: 'Day 2 · Coming Soon',
  },
  {
    number: 3,
    status: 'coming-soon',
    type: 'Comparison',
    title: 'My AI Email Summarizer vs Muse',
    hook:
      'I already built my own AI inbox summarization system, so this experiment compares Muse against a workflow I actually use.',
    shortDescription:
      'The comparison is prepared for a comparable email workload, without invented scores or a declared winner.',
    comparisonCriteria: [
      { label: 'Summary quality' },
      { label: 'Prioritization' },
      { label: 'Extraction of next actions' },
      { label: 'Ease of setup' },
      { label: 'Degree of control/approval' },
      { label: 'Overall usefulness' },
    ],
  },
  {
    number: 4,
    status: 'coming-soon',
    type: 'Build',
    title: 'I asked Muse Code to build my AI school website',
    hook:
      'The goal is to give Muse Code a website brief, then observe how it plans, writes code, coordinates work, and validates the result.',
    shortDescription:
      'This build experiment is ready to publish once the real observations and results are added.',
    prompt:
      'Build a landing page for my AI school: headline, 3 course cards, Stripe payment button. Use Muse Image for hero image.',
    workflowSteps: [
      'Give Muse Code the website goal.',
      'Observe how it plans the work.',
      'Review the code it writes and the validation steps it runs.',
      'Record what worked, what failed, and what still required human judgment.',
    ],
    learnings: [
      'TODO: Add what happened after the experiment is recorded.',
      'TODO: Add what this revealed about Muse Code as a practical builder tool.',
    ],
  },
  ...Array.from({ length: 6 }, (_, index) => {
    const number = index + 5;
    return {
      number,
      status: 'coming-soon' as const,
      type: 'Experiment' as const,
      title: `DAY ${String(number).padStart(2, '0')} · Coming Soon`,
    };
  }),
];

export const MUSE_FRAMEWORK_STEPS = [
  {
    number: '01',
    title: 'Find friction',
    body: 'Identify repetitive, frustrating, or inefficient work.',
  },
  {
    number: '02',
    title: 'Define the outcome',
    body: 'Decide what "done" actually looks like.',
  },
  {
    number: '03',
    title: 'Give context',
    body: 'Give the AI the information necessary to succeed.',
  },
  {
    number: '04',
    title: 'Connect the right tools',
    body: 'Determine which apps, data, and actions are required.',
  },
  {
    number: '05',
    title: 'Set boundaries',
    body: 'Decide what can happen autonomously and what needs human approval.',
  },
  {
    number: '06',
    title: 'Iterate',
    body: 'Run it, inspect failures, and improve the system.',
  },
];
