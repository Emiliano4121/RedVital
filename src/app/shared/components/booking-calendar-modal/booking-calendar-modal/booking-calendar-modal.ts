import { Component, EventEmitter, Input, Output, signal, computed, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookingSelection } from '../../../models/booking.model';

interface CalendarDay {
  date: Date;
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isPast: boolean;
  isStart: boolean;
  isEnd: boolean;
  isInRange: boolean;
  isHoverRange: boolean;
  isDisabled: boolean;
}

@Component({
  selector: 'app-booking-calendar-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './booking-calendar-modal.html',
  styleUrls: ['./booking-calendar-modal.scss']
})
export class BookingCalendarModalComponent {
  @Input() isOpen = false;
  @Input() title = 'Selecciona fecha y horario';
  @Output() closed = new EventEmitter<void>();
  @Output() confirmed = new EventEmitter<BookingSelection>();

  private readonly today = this.stripTime(new Date());

  currentMonth = signal<Date>(new Date());
  startDate = signal<Date | null>(null);
  endDate = signal<Date | null>(null);
  hoverDate = signal<Date | null>(null);
  startTime = signal<string>('09:00');
  endTime = signal<string>('18:00');

  weekDays = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do'];
  monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  hours: string[] = this.generateHours();

  leftMonth = computed(() => this.currentMonth());
  rightMonth = computed(() => {
    const next = new Date(this.currentMonth());
    next.setMonth(next.getMonth() + 1);
    return next;
  });

  leftMonthDays = computed(() => this.buildMonthGrid(this.leftMonth()));
  rightMonthDays = computed(() => this.buildMonthGrid(this.rightMonth()));

  isConfirmDisabled = computed(() => !this.startDate() || !this.endDate());

  rangeSummary = computed(() => {
    const s = this.startDate();
    const e = this.endDate();
    if (s && e) return `${this.formatDate(s)} ${this.startTime()} → ${this.formatDate(e)} ${this.endTime()}`;
    if (s) return `Desde ${this.formatDate(s)} · elige fecha de salida`;
    return 'Selecciona las fechas';
  });

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.isOpen) this.close();
  }

  nextMonth(): void {
    const d = new Date(this.currentMonth());
    d.setMonth(d.getMonth() + 1);
    this.currentMonth.set(d);
  }

  prevMonth(): void {
    const d = new Date(this.currentMonth());
    d.setMonth(d.getMonth() - 1);
    this.currentMonth.set(d);
  }

  selectDay(day: CalendarDay): void {
    if (day.isDisabled) return;
    const s = this.startDate();
    const e = this.endDate();

    if (!s || (s && e)) {
      this.startDate.set(day.date);
      this.endDate.set(null);
    } else if (day.date.getTime() < s.getTime()) {
      this.startDate.set(day.date);
    } else if (day.date.getTime() === s.getTime()) {
      this.endDate.set(day.date); // mismo día permitido (servicio de 1 día)
    } else {
      this.endDate.set(day.date);
    }
  }

  onDayHover(day: CalendarDay): void {
    if (this.startDate() && !this.endDate() && !day.isDisabled) {
      this.hoverDate.set(day.date);
    }
  }

  onDayLeave(): void {
    this.hoverDate.set(null);
  }

  clear(): void {
    this.startDate.set(null);
    this.endDate.set(null);
    this.hoverDate.set(null);
  }

  close(): void { this.closed.emit(); }

  confirm(): void {
    const s = this.startDate();
    const e = this.endDate();
    if (!s || !e) return;
    this.confirmed.emit({
      startDate: s,
      endDate: e,
      startTime: this.startTime(),
      endTime: this.endTime()
    });
  }

  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.close();
    }
  }

  trackByDate(_i: number, d: CalendarDay): number { return d.date.getTime(); }

  formatDate(d: Date): string {
    return `${d.getDate()} ${this.monthNames[d.getMonth()].slice(0, 3)}`;
  }

  monthLabel(d: Date): string {
    return `${this.monthNames[d.getMonth()]} ${d.getFullYear()}`;
  }

  private generateHours(): string[] {
    const list: string[] = [];
    for (let h = 0; h < 24; h++) {
      list.push(`${h.toString().padStart(2, '0')}:00`);
      list.push(`${h.toString().padStart(2, '0')}:30`);
    }
    return list;
  }

  private buildMonthGrid(ref: Date): CalendarDay[] {
    const year = ref.getFullYear();
    const month = ref.getMonth();
    const firstOfMonth = new Date(year, month, 1);
    const jsDay = firstOfMonth.getDay();         // 0 = Domingo
    const offset = (jsDay + 6) % 7;              // para que la semana empiece en Lunes
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrev = new Date(year, month, 0).getDate();

    const grid: CalendarDay[] = [];

    for (let i = offset - 1; i >= 0; i--) {
      grid.push(this.makeDay(new Date(year, month - 1, daysInPrev - i), false));
    }
    for (let i = 1; i <= daysInMonth; i++) {
      grid.push(this.makeDay(new Date(year, month, i), true));
    }
    while (grid.length < 42) {
      const last = grid[grid.length - 1].date;
      const d = new Date(last);
      d.setDate(d.getDate() + 1);
      grid.push(this.makeDay(d, false));
    }
    return grid;
  }

  private makeDay(date: Date, isCurrentMonth: boolean): CalendarDay {
    const normalized = this.stripTime(date);
    const s = this.startDate();
    const e = this.endDate();
    const h = this.hoverDate();

    const isPast = normalized.getTime() < this.today.getTime();
    const isStart = !!s && normalized.getTime() === this.stripTime(s).getTime();
    const isEnd = !!e && normalized.getTime() === this.stripTime(e).getTime();

    let isInRange = false;
    if (s && e) {
      isInRange = normalized.getTime() > this.stripTime(s).getTime()
                && normalized.getTime() < this.stripTime(e).getTime();
    }

    let isHoverRange = false;
    if (s && !e && h) {
      const sT = this.stripTime(s).getTime();
      const hT = this.stripTime(h).getTime();
      const cT = normalized.getTime();
      if (hT > sT) isHoverRange = cT > sT && cT <= hT;
    }

    return {
      date: normalized,
      day: normalized.getDate(),
      isCurrentMonth,
      isToday: normalized.getTime() === this.today.getTime(),
      isPast,
      isStart,
      isEnd,
      isInRange,
      isHoverRange,
      isDisabled: isPast
    };
  }

  private stripTime(d: Date): Date {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }
}