import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, Location } from '@angular/common';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { TemaService } from '../../services/context/tema/tema.service';

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
    private readonly router: Router,
    private readonly location: Location,
    private readonly route: ActivatedRoute,
    public readonly temaService: TemaService,
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

  alterarTema(): void {
    this.temaService.alterarTema();
  }
}
