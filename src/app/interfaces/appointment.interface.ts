export interface Appointment {
  id: number;
  nurseName: string;
  service: string;
  date: string;
  time: string;
  status: 'activa' | 'pendiente' | 'completada' | 'cancelada';
  address: string;
}