export interface Domain {
  id: number;
  status: string;
  url: string;
  created_at: string;
  updated_at: string;
}

export interface CrawlPageData {
  id: number;
  job_id: number;
  url: string;
  title: string;
  h1: string;
  description: string;
  body_preview: string;
}

export interface Insight {
  id: number;
  user_id: number;
  job_id: number;
  found: boolean;
  answer: string;
  created_at: string;
  source_hint: string;
  url?: string;
  input?: string;
}
