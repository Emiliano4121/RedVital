// Navbar.ts
import { Component, ViewChild } from '@angular/core';
import { LoginComponent } from '../auth/login/login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [LoginComponent],
  templateUrl: './navbar.html',
  standalone: true,
  styleUrl: './navbar.scss'
})
export class Navbar {
  constructor(private router: Router) {}
  @ViewChild(LoginComponent) loginModal!: LoginComponent;

  openLoginModal() {
    this.loginModal.open();
  }

  irSobreNosotros() {
    this.router.navigate(['/sobre-nosotros']);
  }
}