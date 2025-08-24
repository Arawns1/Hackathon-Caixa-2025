import { Location } from '@angular/common';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ReplaySubject, Subject } from 'rxjs';
import { HeaderComponent } from './header.component';
import { AppTemaEnum, TemaService } from '../../services/context/tema/tema.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let location: Location;
  let routerEvents$: Subject<any>;
  let routeData$: ReplaySubject<any>;
  let temaService: jasmine.SpyObj<TemaService>;

  beforeEach(async () => {
    routerEvents$ = new Subject<any>();
    routeData$ = new ReplaySubject<any>(1);
    temaService = jasmine.createSpyObj('TemaService', ['tema', 'alterarTema']);

    await TestBed.configureTestingModule({
      imports: [HeaderComponent, MatIconModule],
      providers: [
        {
          provide: Router,
          useValue: { events: routerEvents$ },
        },
        {
          provide: Location,
          useValue: { back: jasmine.createSpy('back') },
        },
        {
          provide: ActivatedRoute,
          useValue: {
            firstChild: null,
            data: routeData$.asObservable(),
          },
        },
        {
          provide: TemaService,
          useValue: temaService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    location = TestBed.inject(Location);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve exibir o título correto', () => {
    const tituloEl = fixture.debugElement.query(
      By.css('[data-test-id="titulo-header"]'),
    ).nativeElement;
    expect(tituloEl.textContent).toContain(component.titulo);
  });

  it('deve atualizar título e showHeader a partir do ActivatedRoute', fakeAsync(() => {
    routerEvents$.next(new NavigationEnd(1, '/url', '/url'));
    routeData$.next({ title: 'Novo Título', showHeader: false });

    tick();
    fixture.detectChanges();

    expect(component.titulo).toBe('Novo Título');
    expect(component.showHeader).toBeFalse();
  }));

  it('deve manter título padrão se ActivatedRoute não fornecer title', fakeAsync(() => {
    routerEvents$.next(new NavigationEnd(1, '/url', '/url'));
    routeData$.next({ showHeader: false });

    tick();
    fixture.detectChanges();

    expect(component.titulo).toBe('Empréstimos');
    expect(component.showHeader).toBeFalse();
  }));

  it('deve manter showHeader true se ActivatedRoute não fornecer showHeader', fakeAsync(() => {
    routerEvents$.next(new NavigationEnd(1, '/url', '/url'));
    routeData$.next({ title: 'Só Título' });

    tick();
    fixture.detectChanges();

    expect(component.titulo).toBe('Só Título');
    expect(component.showHeader).toBeTrue();
  }));

  describe('voltarPagina', () => {
    it('deve chamar location.back() quando voltarPagina for chamado', () => {
      component.voltarPagina();
      expect(location.back).toHaveBeenCalled();
    });

    it('deve ser chamado ao clicar no botão de voltar', () => {
      spyOn(component, 'voltarPagina').and.callThrough();
      const btnVoltar = fixture.debugElement.query(By.css('[data-test-id="btn-voltar"]'));
      btnVoltar.triggerEventHandler('click', null);
      expect(component.voltarPagina).toHaveBeenCalled();
      expect(location.back).toHaveBeenCalled();
    });
  });

  describe('alterarTema', () => {
    it('deve chamar temaService.alterarTema ao chamar alterarTema', () => {
      component.alterarTema();
      expect(temaService.alterarTema).toHaveBeenCalled();
    });

    it('deve chamar alterarTema ao clicar no botão de tema', () => {
      const btnTema = fixture.debugElement.query(By.css('[data-test-id="btn-mudar-tema"]'));
      btnTema.triggerEventHandler('click', null);
      expect(temaService.alterarTema).toHaveBeenCalled();
    });

    it('botão de alterar tema deve existir', () => {
      const btnTema = fixture.debugElement.query(By.css('[data-test-id="btn-mudar-tema"]'));
      expect(btnTema).toBeTruthy();
    });

    it('deve exibir ícone correto baseado no tema atual', () => {
      temaService.tema.and.returnValue('dark' as AppTemaEnum);
      fixture.detectChanges();
      const lightIcon = fixture.debugElement.query(By.css('mat-icon[fontIcon="light_mode"]'));
      expect(lightIcon).toBeTruthy();

      temaService.tema.and.returnValue('light' as AppTemaEnum);
      fixture.detectChanges();
      const darkIcon = fixture.debugElement.query(By.css('mat-icon[fontIcon="dark_mode"]'));
      expect(darkIcon).toBeTruthy();
    });
  });
});
