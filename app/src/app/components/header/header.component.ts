import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, Location } from '@angular/common';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  imports: [CommonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  titulo = 'Empréstimos';
  showHeader = true;

  constructor(
    private router: Router,
    private location: Location,
    private route: ActivatedRoute,
  ) {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        map(() => {
          let activeRoute = this.route;
          while (activeRoute.firstChild) {
            activeRoute = activeRoute.firstChild;
          }
          return activeRoute;
        }),
        mergeMap(activeRoute => activeRoute.data),
      )
      .subscribe(routeData => {
        this.titulo = routeData['title'] ?? 'Empréstimos';
        this.showHeader = routeData['showHeader'] ?? true;
      });
  }

  voltarPagina() {
    this.location.back();
  }
}
