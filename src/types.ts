export type ProjectTier = 'flagship' | 'supporting' | 'experiment';

/** Drives the colour of the status badge. */
export type ProjectStatusTone = 'live' | 'active' | 'pilot' | 'testing' | 'archived';

export interface ProjectLink {
  label: string;
  /** External URL, or an in-page anchor such as `#visual-ai-os`. */
  href: string;
  kind: 'primary' | 'secondary';
  /** Picks the icon: GitHub mark, App Store, npm package, external link, or architecture (scroll). */
  icon?: 'github' | 'appstore' | 'npm' | 'external' | 'architecture';
}

export interface Project {
  id: string;
  number: string;
  tier: ProjectTier;
  /** Actual product name, shown prominently above the story headline. */
  name: string;
  category: string;
  status: string;
  statusTone: ProjectStatusTone;
  headline: string;
  story: string;
  lesson?: string;
  stats?: { label: string; value: string }[];
  tags: string[];
  links: ProjectLink[];
  /**
   * 'illustration' = scripted animation with sample data (gets the "Interactive illustration" label).
   * 'live' = the widget genuinely works (e.g. Spin the Wheel).
   * 'placeholder' = animation not built yet; render a placeholder panel.
   */
  visual: 'illustration' | 'live' | 'placeholder';
}

export interface CareerHighlight {
  value: string;
  label: string;
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
  /** Small metric tiles shown under the summary. */
  metrics?: { value: string; label: string }[];
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
