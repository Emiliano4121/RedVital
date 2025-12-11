import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  animations: [
    trigger('modalAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.9)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ opacity: 0, transform: 'scale(0.9)' }))
      ])
    ])
  ]
})
export class LoginComponent {
  isOpen = false;
  email = '';
  password = '';
  remember = false;

  open() {
    this.isOpen = true;
    document.body.style.overflow = 'hidden'; // Prevenir scroll del body
  }

  close() {
    this.isOpen = false;
    document.body.style.overflow = 'auto'; // Restaurar scroll del body
  }

  login() {
    console.log('Login:', {
      email: this.email,
      password: this.password,
      remember: this.remember
    });
    
    // Aquí irá tu lógica de autenticación
    // Por ahora solo cerramos el modal
    this.close();
  }

  loginWithGoogle() {
    console.log('Login con Google');
    // Lógica de login con Google
  }

  loginWithFacebook() {
    console.log('Login con Facebook');
    // Lógica de login con Facebook
  }
}