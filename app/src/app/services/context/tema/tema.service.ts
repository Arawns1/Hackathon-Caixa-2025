import { effect, Injectable, signal } from '@angular/core';

export enum AppTemaEnum {
  LIGHT = 'light',
  DARK = 'dark',
}

@Injectable({
  providedIn: 'root',
})
export class TemaService {
  private readonly keyTemaLocalStorage = 'app-simulacoes-tema';

  tema = signal<AppTemaEnum>(this.obterTimaInicial());

  constructor() {
    effect(() => {
      const novoTema = this.tema();
      document.documentElement.classList.remove('dark');
      document.documentElement.removeAttribute('data-theme');
      if (novoTema === AppTemaEnum.DARK) {
        document.documentElement.classList.add('dark');
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem(this.keyTemaLocalStorage, AppTemaEnum.DARK);
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem(this.keyTemaLocalStorage, AppTemaEnum.LIGHT);
      }
    });
  }

  obterTimaInicial(): AppTemaEnum {
    const temaSalvoStorage = localStorage.getItem(this.keyTemaLocalStorage) as AppTemaEnum;
    if (temaSalvoStorage) {
      if (temaSalvoStorage === AppTemaEnum.DARK) return AppTemaEnum.DARK;
      if (temaSalvoStorage === AppTemaEnum.LIGHT) return AppTemaEnum.LIGHT;
    }
    const isNavegadorUsuarioModoEscuro = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (isNavegadorUsuarioModoEscuro) return AppTemaEnum.DARK;
    return AppTemaEnum.LIGHT;
  }

  alterarTema(): void {
    this.tema.update(currentTema =>
      currentTema === AppTemaEnum.LIGHT ? AppTemaEnum.DARK : AppTemaEnum.LIGHT,
    );
  }
}
