import { Component, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet, ActivatedRoute } from '@angular/router';
import { Navbar } from "./components/navbar/navbar";
import { Footer } from './components/footer/footer'; // <-- ¡IMPORTAR ESTO!
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('RedVital');
  showNavbar = true;

  constructor(private router: Router) {
  this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      this.updateNavbar();
    });

  this.updateNavbar();
}

updateNavbar() {
  const url = this.router.url;
  this.showNavbar = !url.includes('dashboard');
  console.log(this.router.url, this.showNavbar);
}


}
