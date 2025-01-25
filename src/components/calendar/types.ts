export interface Event {
  id: string;
  title: string;
  day: number;
  startTime: string;
  endTime: string;
  type: 'class' | 'study' | 'other';
}