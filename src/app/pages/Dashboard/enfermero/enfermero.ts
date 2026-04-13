import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
export interface Service {
  id: number;
  patientName: string;
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
  selector: 'app-enfermero-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './enfermero.html',
  styleUrls: ['./enfermero.scss']
})
export class EnfereroDashboard {
  auth = inject(AuthService);
  router = inject(Router);

  activeSection = signal<string>('inicio');
  sidebarOpen = signal<boolean>(false);
  available = signal<boolean>(true);

  // Perfil del enfermero
  profile = {
    phone: '555-0200',
    specialty: 'Enfermería General y Pediatría',
    experience: 5,
    rating: 4.8,
    reviews: 47,
    address: 'Colonia Centro, Oaxaca',
    description: 'Enfermero certificado con experiencia en cuidados domiciliarios, pediatría y atención a adultos mayores.',
    price: 350,
    certifications: ['Cuidados intensivos', 'RCP avanzado', 'Manejo de catéteres'],
  };

  services: Service[] = [
    { id: 1, patientName: 'María González', service: 'Cuidados post-operatorios', date: '2025-12-15', time: '10:00 AM', status: 'activa',     address: 'Calle Principal 123'  },
    { id: 2, patientName: 'Pedro Sánchez',  service: 'Curaciones',                date: '2025-12-16', time: '2:00 PM',  status: 'pendiente',  address: 'Av. Juárez 456'       },
    { id: 3, patientName: 'Rosa Jiménez',   service: 'Control de glucosa',        date: '2025-11-28', time: '8:00 AM',  status: 'completada', address: 'Calle Morelos 789'    },
    { id: 4, patientName: 'Juan Pérez',     service: 'Inyecciones diarias',       date: '2025-11-10', time: '7:00 AM',  status: 'completada', address: 'Privada del Sol 22'   },
    { id: 5, patientName: 'Elena Ruiz',     service: 'Rehabilitación post-fractura', date: '2025-10-30', time: '11:00 AM', status: 'cancelada', address: 'Blvd. Independencia 5' },
  ];

  notifications: Notification[] = [
    { id: 1, message: 'María González aceptó tu servicio',            time: 'Hace 1 hora',  read: false, type: 'success' },
    { id: 2, message: 'Nueva solicitud de servicio de Pedro Sánchez', time: 'Hace 3 horas', read: false, type: 'info'    },
    { id: 3, message: 'Tienes una cita mañana a las 10:00 AM',        time: 'Hace 1 día',   read: true,  type: 'warning' },
    { id: 4, message: 'Rosa Jiménez dejó una reseña de 5 estrellas',  time: 'Hace 2 días',  read: true,  type: 'success' },
  ];

  activeServices  = computed(() => this.services.filter(s => s.status === 'activa' || s.status === 'pendiente'));
  historyServices = computed(() => this.services.filter(s => s.status === 'completada' || s.status === 'cancelada'));
  unreadCount     = computed(() => this.notifications.filter(n => !n.read).length);
  completedCount  = computed(() => this.services.filter(s => s.status === 'completada').length);

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

  acceptService(id: number) {
    const svc = this.services.find(s => s.id === id);
    if (svc) svc.status = 'activa';
  }

  switchToPaciente() {
    this.auth.setRole('paciente');
    this.router.navigate(['/dashboard/paciente']);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }

  get firstName(): string {
  return this.auth.user()?.name?.split(' ')[0] ?? '';
  }

  get hasPendingServices(): boolean {
  return this.activeServices().some(s => s.status === 'pendiente');
}
}