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
