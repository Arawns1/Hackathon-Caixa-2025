import { fakeAsync, TestBed } from '@angular/core/testing';
import { AppTemaEnum, TemaService } from './tema.service';

describe('TemaService', () => {
  let service: TemaService;

  const mockMatchMedia = (matches: boolean) => {
    spyOn(window, 'matchMedia').and.returnValue({
      matches,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      onchange: null,
      dispatchEvent: () => false,
    } as any);
  };
  const keyTemaLocalStorage = 'app-simulacoes-tema';

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemaService);
    document.documentElement.className = '';
    document.documentElement.removeAttribute('data-theme');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('obterTimaInicial', () => {
    it('deve retornar o tema DARK se estiver salvo no localStorage', () => {
      localStorage.setItem(keyTemaLocalStorage, AppTemaEnum.DARK);
      const temaInicial = service.obterTimaInicial();
      expect(temaInicial).toBe(AppTemaEnum.DARK);
    });

    it('deve retornar o tema LIGHT se estiver salvo no localStorage', () => {
      mockMatchMedia(false);
      localStorage.setItem(keyTemaLocalStorage, AppTemaEnum.LIGHT);
      const temaInicial = service.obterTimaInicial();
      expect(temaInicial).toBe(AppTemaEnum.LIGHT);
    });

    it('deve retornar DARK se o navegador estiver em modo escuro e não houver tema salvo', () => {
      mockMatchMedia(true);
      const temaInicial = service.obterTimaInicial();
      expect(temaInicial).toBe(AppTemaEnum.DARK);
    });

    it('deve retornar LIGHT se o navegador estiver em modo claro e não houver tema salvo', () => {
      mockMatchMedia(false);
      const temaInicial = service.obterTimaInicial();
      expect(temaInicial).toBe(AppTemaEnum.LIGHT);
    });
  });

  describe('effect do tema', () => {
    it('deve aplicar DARK na classe e no localStorage quando o tema for DARK', fakeAsync(() => {
      service.tema.set(AppTemaEnum.DARK);
      TestBed.flushEffects();
      expect(document.documentElement.classList.contains('dark')).toBeTrue();
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
      expect(localStorage.getItem(keyTemaLocalStorage)).toBe(AppTemaEnum.DARK);
    }));

    it('deve aplicar LIGHT na classe e no localStorage quando o tema for LIGHT', fakeAsync(() => {
      service.tema.set(AppTemaEnum.LIGHT);
      TestBed.flushEffects();
      expect(document.documentElement.classList.contains('dark')).toBeFalse();
      expect(document.documentElement.getAttribute('data-theme')).toBe('light');
      expect(localStorage.getItem(keyTemaLocalStorage)).toBe(AppTemaEnum.LIGHT);
    }));
  });

  describe('alterarTema', () => {
    it('deve alternar de LIGHT para DARK', fakeAsync(() => {
      service.tema.set(AppTemaEnum.LIGHT);
      service.alterarTema();
      expect(service.tema()).toBe(AppTemaEnum.DARK);
      TestBed.flushEffects();

      expect(document.documentElement.classList.contains('dark')).toBeTrue();
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
      const temaLocalStorage = localStorage.getItem(keyTemaLocalStorage);
      expect(temaLocalStorage).toBeDefined();
      expect(temaLocalStorage).toBe(AppTemaEnum.DARK);
    }));

    it('deve alternar de DARK para LIGHT', fakeAsync(() => {
      service.tema.set(AppTemaEnum.DARK);
      service.alterarTema();
      expect(service.tema()).toBe(AppTemaEnum.LIGHT);
      TestBed.flushEffects();
      expect(document.documentElement.classList.contains('dark')).toBeFalse();
      expect(document.documentElement.getAttribute('data-theme')).toBe('light');
      const temaLocalStorage = localStorage.getItem(keyTemaLocalStorage);
      expect(temaLocalStorage).toBeDefined();
      expect(temaLocalStorage).toBe(AppTemaEnum.LIGHT);
    }));
  });
});
