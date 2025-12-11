import { Component, ViewChild } from '@angular/core';
import { LoginComponent } from '../auth/login/login';

@Component({
  selector: 'app-navbar',
  imports: [LoginComponent],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  @ViewChild(LoginComponent) loginModal!: LoginComponent;

  openLoginModal() {
    this.loginModal.open();
  }
}