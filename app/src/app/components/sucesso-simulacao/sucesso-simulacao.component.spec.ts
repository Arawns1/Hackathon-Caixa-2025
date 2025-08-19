import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SucessoSimulacaoComponent } from './sucesso-simulacao.component';

describe('SucessoSimulacaoComponent', () => {
  let component: SucessoSimulacaoComponent;
  let fixture: ComponentFixture<SucessoSimulacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SucessoSimulacaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SucessoSimulacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
