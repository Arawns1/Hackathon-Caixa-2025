import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingSimulacaoComponent } from './loading-simulacao.component';

describe('LoadingSimulacaoComponent', () => {
  let component: LoadingSimulacaoComponent;
  let fixture: ComponentFixture<LoadingSimulacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingSimulacaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingSimulacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
