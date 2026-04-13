import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

export interface Nurse {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  distance: string;
  price: number;
  available: boolean;
  avatar: string;
  experience: number;
}

export interface Appointment {
  id: number;
  nurseName: string;
  service: string;
  date: string;
  time: string;
  status: 'activa' | 'pendiente' | 'completada' | 'cancelada';
  address: string;
}

export interface Notification {
  id: number;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'success' | 'warning';
}

@Component({
  selector: 'app-paciente-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './paciente.html',
  styleUrls: ['./paciente.scss']
})
export class PacienteDashboard {
  auth = inject(AuthService);
  router = inject(Router);

  activeSection = signal<string>('inicio');
  sidebarOpen = signal<boolean>(false);

  // Perfil del paciente
  profile = {
    phone: '555-0100',
    address: 'Calle Principal 123, Oaxaca',
  };

  // Enfermeros disponibles
  nurses: Nurse[] = [
    { id: 1, name: 'Ana López',       specialty: 'Cuidados Críticos',    rating: 5, reviews: 62, distance: '1.2 km', price: 400, available: true,  avatar: 'AL', experience: 8  },
    { id: 2, name: 'Jorge Hernández', specialty: 'Geriatría',             rating: 4, reviews: 38, distance: '2.5 km', price: 320, available: true,  avatar: 'JH', experience: 6  },
    { id: 3, name: 'Sofía Martínez',  specialty: 'Pediatría',             rating: 5, reviews: 91, distance: '3.1 km', price: 380, available: false, avatar: 'SM', experience: 10 },
    { id: 4, name: 'Luis Torres',     specialty: 'Rehabilitación',        rating: 4, reviews: 24, distance: '4.0 km', price: 300, available: true,  avatar: 'LT', experience: 4  },
    { id: 5, name: 'Claudia Vega',    specialty: 'Enfermería General',    rating: 5, reviews: 55, distance: '1.8 km', price: 350, available: true,  avatar: 'CV', experience: 7  },
    { id: 6, name: 'Roberto Díaz',    specialty: 'Curaciones',            rating: 3, reviews: 17, distance: '5.2 km', price: 280, available: true,  avatar: 'RD', experience: 3  },
  ];

  appointments: Appointment[] = [
    { id: 1, nurseName: 'Ana López',      service: 'Cuidados post-operatorios', date: '2025-12-15', time: '10:00 AM', status: 'activa',     address: 'Calle Principal 123' },
    { id: 2, nurseName: 'Jorge Hernández',service: 'Atención adulto mayor',     date: '2025-12-18', time: '3:00 PM',  status: 'pendiente',  address: 'Calle Principal 123' },
    { id: 3, nurseName: 'Sofía Martínez', service: 'Pediatría general',         date: '2025-11-30', time: '9:00 AM',  status: 'completada', address: 'Calle Principal 123' },
    { id: 4, nurseName: 'Luis Torres',    service: 'Rehabilitación física',     date: '2025-11-20', time: '11:00 AM', status: 'cancelada',  address: 'Calle Principal 123' },
  ];

  notifications: Notification[] = [
    { id: 1, message: 'Tu cita del 15 de diciembre fue confirmada',    time: 'Hace 2 horas', read: false, type: 'success' },
    { id: 2, message: 'Ana López aceptó tu solicitud de servicio',     time: 'Hace 5 horas', read: false, type: 'info'    },
    { id: 3, message: 'Recuerda tu cita mañana a las 3:00 PM',        time: 'Hace 1 día',   read: true,  type: 'warning' },
    { id: 4, message: 'Nuevo enfermero disponible en tu zona',         time: 'Hace 2 días',  read: true,  type: 'info'    },
  ];

  activeAppointments  = computed(() => this.appointments.filter(a => a.status === 'activa' || a.status === 'pendiente'));
  historyAppointments = computed(() => this.appointments.filter(a => a.status === 'completada' || a.status === 'cancelada'));
  unreadCount         = computed(() => this.notifications.filter(n => !n.read).length);

  setSection(s: string) { this.activeSection.set(s); this.sidebarOpen.set(false); }
  toggleSidebar()       { this.sidebarOpen.set(!this.sidebarOpen()); }
  markAllRead()         { this.notifications.forEach(n => n.read = true); }

  getStars(rating: number) { return Array(5).fill(0).map((_, i) => i + 1); }

  statusClass(s: string): string {
    return ({ activa: 'st-active', pendiente: 'st-pending', completada: 'st-done', cancelada: 'st-cancelled' } as any)[s] || '';
  }
  statusLabel(s: string): string {
    return ({ activa: 'Activa', pendiente: 'Pendiente', completada: 'Completada', cancelada: 'Cancelada' } as any)[s] || s;
  }

  switchToEnfermero() {
    this.auth.setRole('enfermero');
    this.router.navigate(['/dashboard/enfermero']);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }

  get firstName(): string {
  return this.auth.user()?.name?.split(' ')[0] ?? '';
}
}