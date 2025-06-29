export interface Note {
  id: string;
  courseId: string;
  title: string;
  content: string;
  createdAt: string;
}

export interface Todo {
  id: string;
  courseId: string;
  text: string;
  completed: boolean;
}

export interface PageSpread {
  left: string;
  right: string;
} 