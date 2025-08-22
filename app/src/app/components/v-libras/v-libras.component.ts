import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { AngularVlibras } from 'angular-vlibras';

@Component({
  selector: 'app-v-libras',
  imports: [AngularVlibras, CommonModule],
  templateUrl: './v-libras.component.html',
  styleUrl: './v-libras.component.css',
})
export class VLibrasComponent {
  isDesktop = false;
  private readonly DESKTOP_WIDTH = 1280;

  ngOnInit() {
    this.verificarTamanhoDaTela();
  }

  @HostListener('window:resize')
  onResize() {
    this.verificarTamanhoDaTela();
  }

  private verificarTamanhoDaTela() {
    this.isDesktop = window.innerWidth >= this.DESKTOP_WIDTH;
  }
}
