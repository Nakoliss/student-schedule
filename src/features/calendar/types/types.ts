export interface Event {
  id: string;
  title: string;
  day: number;
  startTime: string;
  endTime: string;
  type: 'class' | 'study' | 'other';
}

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