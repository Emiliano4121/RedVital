import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

// 👇 IMPORTS NUEVOS
import { Nurse } from '../../../interfaces/nurse.interface';
import { Appointment } from '../../../interfaces/appointment.interface';
import { Notification } from '../../../interfaces/notification.interface';
import { ProfileCard } from '../../../components/profile-card/profile-card';

@Component({
  selector: 'app-paciente-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, ProfileCard],
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

  // 👇 ENFERMEROS (YA CON IMÁGENES)
  nurses: Nurse[] = [
    {
      id: 1,
      name: 'Ana López',
      specialty: 'Cuidados Críticos',
      rating: 5,
      reviews: 62,
      distance: '1.2 km',
      price: 400,
      available: true,
      experience: 8,
      profileImage: 'https://citbm.unmsm.edu.pe/wp-content/uploads/2021/04/ENFERMERA-IV-edited.png',
      coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSp5E9ziuzNP2StY5WNstT-7FMzmfBvMFtJQ&s'
    },
    {
      id: 2,
      name: 'Jorge Hernández',
      specialty: 'Geriatría',
      rating: 4,
      reviews: 38,
      distance: '2.5 km',
      price: 320,
      available: true,
      experience: 6,
      profileImage: 'https://st2.depositphotos.com/1158045/9691/i/450/depositphotos_96919526-stock-photo-friendly-doctor-smiling.jpg',
      coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0UGStcS_mIKX8VdHzKUgP2G_nLp25bhw5_w&s'
    },
    {
      id: 3,
      name: 'Sofía Martínez',
      specialty: 'Pediatría',
      rating: 5,
      reviews: 91,
      distance: '3.1 km',
      price: 380,
      available: false,
      experience: 10,
      profileImage: 'https://img.freepik.com/foto-gratis/hermosa-doctora-uniforme-hospital_23-2148733958.jpg?semt=ais_hybrid&w=740&q=80',
      coverImage: 'https://img.freepik.com/foto-gratis/vista-interior-fondo-abstracto-borroso-mirando-vestibulo-vacio-oficina-puertas-entrada-pared-cortina-vidrio-marco_1339-6363.jpg?semt=ais_hybrid&w=740&q=80'
    }
  ];

  appointments: Appointment[] = [
    {
      id: 1,
      nurseName: 'Ana López',
      service: 'Cuidados post-operatorios',
      date: '2025-12-15',
      time: '10:00 AM',
      status: 'activa',
      address: 'Calle Principal 123'
    }
  ];

  notifications: Notification[] = [
    {
      id: 1,
      message: 'Tu cita fue confirmada',
      time: 'Hace 2 horas',
      read: false,
      type: 'success'
    }
  ];

  activeAppointments  = computed(() =>
    this.appointments.filter(a => a.status === 'activa' || a.status === 'pendiente')
  );

  historyAppointments = computed(() =>
    this.appointments.filter(a => a.status === 'completada' || a.status === 'cancelada')
  );

  unreadCount = computed(() =>
    this.notifications.filter(n => !n.read).length
  );

  setSection(s: string) {
    this.activeSection.set(s);
    this.sidebarOpen.set(false);
  }

  toggleSidebar() {
    this.sidebarOpen.set(!this.sidebarOpen());
  }

  markAllRead() {
    this.notifications.forEach(n => n.read = true);
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