import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DotLottieWebComponent } from 'ngx-dotlottie-web/src/web';
import { By } from '@angular/platform-browser';
import { AnimationPlayerComponent } from './animation-player.component';

describe('AnimationPlayerComponent', () => {
  let component: AnimationPlayerComponent;
  let fixture: ComponentFixture<AnimationPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimationPlayerComponent, DotLottieWebComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AnimationPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve vincular a propriedade src corretamente', () => {
    const caminhoTeste = 'assets/media/loading.lottie';
    component.src = caminhoTeste;
    fixture.detectChanges();
    const dotLottieDebugEl = fixture.debugElement.query(
      By.css('[data-test-id="animation-player"]'),
    );
    const dotLottieComp = dotLottieDebugEl.componentInstance as DotLottieWebComponent;
    expect(dotLottieComp.src()).toBe(caminhoTeste);
  });
});
