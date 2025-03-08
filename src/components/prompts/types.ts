
export interface Prompt {
  id: number;
  title: string;
  content: string;
  model: string;
  date: string;
  tags: string[];
  favorite?: boolean;
}
