import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export class Search {
  isPanelOpen = false;
  selectedDistance = 10;
  selectedRating = 0;
  ratingText = "Cualquier calificación";
  
  ratingMessages: Record<number, string> = {
    0: "Cualquier calificación",
    1: "1 estrella o más",
    2: "2 estrellas o más",
    3: "3 estrellas o más",
    4: "4 estrellas o más",
    5: "5 estrellas"
  };

onDistanceChange(event: Event) {
  const input = event.target as HTMLInputElement;
  this.selectedDistance = parseInt(input.value, 10);
}

getRangeBackground(): string {
  const percentage = (this.selectedDistance / 50) * 100;
  // Usa el color hexadecimal directamente porque CSS no puede leer variables CSS desde TypeScript
  return `linear-gradient(to right, #0a1a3c 0%, #0a1a3c ${percentage}%, #e0e0e0 ${percentage}%, #e0e0e0 100%)`;
}

  togglePanel() {
    this.isPanelOpen = !this.isPanelOpen;
  }

    updateDistance(event: any) {
    this.selectedDistance = event.target.value;
  }

  selectRating(rating: number) {
    this.selectedRating = this.selectedRating === rating ? 0 : rating;
    this.ratingText = this.ratingMessages[this.selectedRating];
  }

  clearFilters() {
    this.selectedDistance = 10;
    this.selectedRating = 0;
    this.ratingText = "Cualquier calificación";
  }
}
