import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhamentoParcelasComponent } from './detalhamento-parcelas.component';

describe('DetalhamentoParcelasComponent', () => {
  let component: DetalhamentoParcelasComponent;
  let fixture: ComponentFixture<DetalhamentoParcelasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalhamentoParcelasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalhamentoParcelasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
