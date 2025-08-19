import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumoSimulacaoComponent } from './resumo-simulacao.component';

describe('ResumoSimulacaoComponent', () => {
  let component: ResumoSimulacaoComponent;
  let fixture: ComponentFixture<ResumoSimulacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumoSimulacaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumoSimulacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
