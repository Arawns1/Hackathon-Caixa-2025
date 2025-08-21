import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulacaoProviderComponent } from './simulacao-provider.component';

describe('SimulacaoProviderComponent', () => {
  let component: SimulacaoProviderComponent;
  let fixture: ComponentFixture<SimulacaoProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimulacaoProviderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimulacaoProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
