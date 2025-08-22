import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { VLibrasComponent } from './components/v-libras/v-libras.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, VLibrasComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
