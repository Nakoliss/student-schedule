export interface Event {
  id: string;
  title: string;
  start: string;
  end: string;
  startTime?: string;
  endTime?: string;
  description?: string;
  day: number;
  type: 'class' | 'study' | 'other';
} 