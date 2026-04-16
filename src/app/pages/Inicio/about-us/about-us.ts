import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-us.html',
  styleUrl: './about-us.scss',
})
export class AboutUs {
  
  // Datos para la sección de valores
  valores = [
    { icon: 'shield-check', title: 'Confianza', desc: 'Validamos rigurosamente cada perfil profesional.' },
    { icon: 'heart-pulse', title: 'Empatía', desc: 'Entendemos que detrás de cada paciente hay una historia.' },
    { icon: 'lightning-charge', title: 'Innovación', desc: 'Usamos tecnología para facilitar el acceso a la salud.' },
    { icon: 'people', title: 'Comunidad', desc: 'Creamos vínculos sólidos entre enfermeros y familias.' }
  ];

  constructor(private router: Router) {}

  volverInicio() {
    this.router.navigate(['/home']);
  }
}