import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';
import { provideRouter } from '@angular/router';
import { CardMenuComponent } from '../../components/card-menu/card-menu.component';

import { TelaInicialComponent } from './tela-inicial.component';

describe('TelaInicialComponent', () => {
  let component: TelaInicialComponent;
  let fixture: ComponentFixture<TelaInicialComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaInicialComponent, RouterModule, CardMenuComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(TelaInicialComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve redirecionar corretamente', () => {
    spyOn(router, 'navigate');
    const rota = '/produtos';
    component.redirecionar(rota);
    expect(router.navigate).toHaveBeenCalledWith([rota]);
  });
});
