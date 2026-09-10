export interface Project {
  id: string;
  number: string;
  category: string;
  headline: string;
  story: string;
  lesson?: string;
  stats?: { label: string; value: string }[];
  tags: string[];
  githubUrl?: string;
  demoUrl?: string;
  primaryCtaText?: string;
  secondaryCtaText?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  summary: string;
  highlights?: string[];
  skills?: string[];
  badge?: string;
}

export interface ArticleItem {
  id: string;
  title: string;
  summary: string;
  readTime: string;
  tag: string;
  publishedDate: string;
  url: string;
}

export type MuseDayStatus = 'released' | 'coming-soon';

export type MuseDayType = 'Setup' | 'Experiment' | 'Comparison' | 'Workflow' | 'Build';

export interface MuseComparisonCriterion {
  label: string;
  result?: string;
}

export interface MuseDay {
  number: number;
  status: MuseDayStatus;
  type: MuseDayType;
  title: string;
  hook?: string;
  shortDescription?: string;
  reelUrl?: string;
  prompt?: string;
  promptTodo?: string;
  workflowSteps?: string[];
  customizationNotes?: string[];
  learnings?: string[];
  comparisonCriteria?: MuseComparisonCriterion[];
  publishDate?: string;
}
