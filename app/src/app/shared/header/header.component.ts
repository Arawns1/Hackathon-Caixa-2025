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

  constructor(
    private router: Router,
    private location: Location,
    private route: ActivatedRoute,
  ) {
    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        map(() => {
          let r = this.route;
          while (r.firstChild) r = r.firstChild;
          return r;
        }),
        mergeMap(r => r.data),
      )
      .subscribe(d => (this.titulo = d['title'] ?? 'Empréstimos'));
  }

  voltarPagina() {
    if (this.router.url === '/produtos') {
      return;
    }
    this.location.back();
  }
}
