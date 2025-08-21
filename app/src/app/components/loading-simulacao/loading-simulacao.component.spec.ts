import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AnimationPlayerComponent } from '../animation-player/animation-player.component';
import { By } from '@angular/platform-browser';
import { LoadingSimulacaoComponent } from './loading-simulacao.component';

describe('LoadingSimulacaoComponent', () => {
  let component: LoadingSimulacaoComponent;
  let fixture: ComponentFixture<LoadingSimulacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingSimulacaoComponent, AnimationPlayerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingSimulacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve renderizar o componente AnimationPlayer com src correto', () => {
    const animationEl = fixture.debugElement.query(By.css('[data-test-id="animation-player"]'))
      .componentInstance as AnimationPlayerComponent;
    expect(animationEl.src).toBe(component.src);
  });

  it('deve exibir a primeira mensagem ao iniciar', () => {
    const mensagemEl = fixture.debugElement.query(
      By.css('[data-test-id="mensagem-atual"]'),
    ).nativeElement;
    expect(mensagemEl.textContent).toContain(component.mensagensLoading[0]);
  });

  it('deve alterar as mensagens a cada 3 segundos', fakeAsync(() => {
    component.ngOnInit();
    fixture.detectChanges();

    const mensagemEl = fixture.debugElement.query(
      By.css('[data-test-id="mensagem-atual"]'),
    ).nativeElement;

    expect(mensagemEl.textContent).toContain(component.mensagensLoading[0]);

    for (let i = 1; i < component.mensagensLoading.length; i++) {
      tick(3000);
      fixture.detectChanges();
      expect(mensagemEl.textContent).toContain(component.mensagensLoading[i]);
    }

    component.stopInterval();
  }));

  it('deve limpar o intervalo ao chamar stopInterval', () => {
    spyOn(window, 'clearInterval').and.callThrough();
    component.ngOnInit();
    component.stopInterval();
    expect(clearInterval).toHaveBeenCalled();
  });
});
