export interface Notification {
  id: number;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'success' | 'warning';
}