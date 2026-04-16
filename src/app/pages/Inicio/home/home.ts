import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

  constructor(private router: Router) {}

  irPaciente() {
    this.router.navigate(['/dashboard/paciente']);
  }

  irEnfermero() {
    this.router.navigate(['/dashboard/enfermero']);
  }
}