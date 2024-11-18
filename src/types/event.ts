export interface IEvent {
  id?: string;
  name: string;
  datetime: string;
  duration: number;
  tag: string;
  userId?: string;
  endTime?: string;
}