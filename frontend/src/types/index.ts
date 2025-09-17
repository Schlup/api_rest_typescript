export interface Subject {
  id: number;
  name: string;
}

export interface Video {
  id: number;
  title: string;
  url: string;
}

export interface EducationalItem {
  id: number;
  name: string;
  description: string;
  subjects: Subject[];
  videos: Video[];
}

export interface PostData {
  subject_id: number;
}

export type ActiveSection = "list" | "details" | "post";
