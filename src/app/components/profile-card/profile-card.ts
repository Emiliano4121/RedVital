import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Nurse } from '../../interfaces/nurse.interface';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-card.html',
  styleUrl: './profile-card.scss'
})
export class ProfileCard {

  @Input() nurse!: Nurse;

  agendar() {
    console.log('Agendar con:', this.nurse);
  }
}