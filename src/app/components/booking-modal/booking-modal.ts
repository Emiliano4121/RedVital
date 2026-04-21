import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Nurse } from '../../interfaces/nurse.interface';
import { Appointment } from '../../interfaces/appointment.interface';

@Component({
  selector: 'app-booking-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './booking-modal.html',
  styleUrls: ['./booking-modal.scss']
})
export class BookingModalComponent implements OnChanges {

  @Input() nurse!: Nurse;
  @Input() visible: boolean = false;

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Appointment>();

  appointment: Appointment = {
    nurseId: 0,
    nurseName: '',
    patientName: '',
    patientPhone: '',
    service: '',
    date: '',
    time: '',
    address: '',
    notes: ''
  };

  ngOnChanges() {
    if (this.nurse) {
      this.appointment.nurseId = this.nurse.id;
      this.appointment.nurseName = this.nurse.name;
    }
  }

  submit() {
    this.save.emit(this.appointment);
    this.close.emit();
  }

  closeModal() {
    this.close.emit();
  }
}