import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(
    private location: Location,
    private router: Router,
  ) {}

  voltarPagina() {
    if (this.router.url === '/produtos') {
      return;
    }
    this.location.back();
  }
}
