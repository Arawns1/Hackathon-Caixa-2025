import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VLibrasComponent } from './v-libras.component';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';

describe('VLibrasComponent', () => {
  let component: VLibrasComponent;
  let fixture: ComponentFixture<VLibrasComponent>;
  let innerWidthSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, VLibrasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VLibrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    if (innerWidthSpy) {
      innerWidthSpy.and.callThrough();
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve definir isDesktop como true se window.innerWidth >= 1280', () => {
    innerWidthSpy = spyOnProperty(window, 'innerWidth', 'get').and.returnValue(1200);
    component.ngOnInit();
    expect(component.isDesktop).toBeTrue();
  });

  it('deve definir isDesktop como false se window.innerWidth < 1280', () => {
    innerWidthSpy = spyOnProperty(window, 'innerWidth', 'get').and.returnValue(800);
    component.ngOnInit();
    expect(component.isDesktop).toBeFalse();
  });

  it('deve atualizar isDesktop ao redimensionar a janela', () => {
    innerWidthSpy = spyOnProperty(window, 'innerWidth', 'get').and.returnValue(1300);
    component.onResize();
    expect(component.isDesktop).toBeTrue();

    innerWidthSpy.and.returnValue(500);
    component.onResize();
    expect(component.isDesktop).toBeFalse();
  });

  it('deve aplicar a classe hidden corretamente', () => {
    innerWidthSpy = spyOnProperty(window, 'innerWidth', 'get').and.returnValue(800);
    component.ngOnInit();
    fixture.detectChanges();
    let vlibrasEl = fixture.debugElement.query(By.css('angular-vlibras'));
    expect(vlibrasEl.nativeElement.classList).toContain('hidden');

    innerWidthSpy.and.returnValue(1200);
    component.ngOnInit();
    fixture.detectChanges();
    vlibrasEl = fixture.debugElement.query(By.css('angular-vlibras'));
    expect(vlibrasEl.nativeElement.classList).not.toContain('hidden');
  });
});
