export interface Appointment {
  id?: number;

  nurseId: number;
  nurseName: string; // 👈 lo dejamos

  patientName: string;
  patientPhone: string;

  service: string;
  date: string;
  time: string;

  address: string;
  notes?: string;

  status?: 'activa' | 'pendiente' | 'completada' | 'cancelada';
}