import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnimationPlayerComponent } from '../animation-player/animation-player.component';

import { LoadingSimulacaoComponent } from './loading-simulacao.component';

describe('LoadingSimulacaoComponent', () => {
  let component: LoadingSimulacaoComponent;
  let fixture: ComponentFixture<LoadingSimulacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingSimulacaoComponent, AnimationPlayerComponent]
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
