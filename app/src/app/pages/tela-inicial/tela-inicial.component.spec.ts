import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { provideRouter } from '@angular/router';
import { CardMenuComponent } from '../../components/card-menu/card-menu.component';

import { TelaInicialComponent } from './tela-inicial.component';

describe('TelaInicialComponent', () => {
  let component: TelaInicialComponent;
  let fixture: ComponentFixture<TelaInicialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaInicialComponent, RouterModule, CardMenuComponent],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelaInicialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
