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
