import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterOutlet } from '@angular/router';
import { provideRouter } from '@angular/router';
import { SimulacaoContextService } from '../../services/context/simulacao/simulacao-context.service';

import { SimulacaoProviderComponent } from './simulacao-provider.component';

describe('SimulacaoProviderComponent', () => {
  let component: SimulacaoProviderComponent;
  let fixture: ComponentFixture<SimulacaoProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimulacaoProviderComponent, RouterOutlet],
      providers: [provideRouter([]), SimulacaoContextService],
    }).compileComponents();

    fixture = TestBed.createComponent(SimulacaoProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
