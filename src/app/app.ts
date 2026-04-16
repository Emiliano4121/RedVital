import { Component, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet, ActivatedRoute } from '@angular/router';
import { Navbar } from "./components/navbar/navbar";
import { Footer } from './components/footer/footer'; // <-- ¡IMPORTAR ESTO!
import { filter } from 'rxjs/internal/operators/filter';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('RedVital');
  showNavbar = true;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        let currentRoute = this.route;

        while (currentRoute.firstChild) {
          currentRoute = currentRoute.firstChild;
        }

        this.showNavbar = !currentRoute.snapshot.data['hideNavbar'];
      });
}
}
