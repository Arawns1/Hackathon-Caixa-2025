import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-card-menu',
  imports: [MatIconModule],
  templateUrl: './card-menu.component.html',
  styleUrl: './card-menu.component.css',
})
export class CardMenuComponent {
  @Input() label: string;
  @Input() icon: string;
}
