import { Component, Input, Output, EventEmitter } from '@angular/core';
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

  @Output() agendarClick = new EventEmitter<Nurse>(); // 👈 esto es lo nuevo

  agendar() {
    this.agendarClick.emit(this.nurse); // 👈 manda el nurse al padre
  }
}