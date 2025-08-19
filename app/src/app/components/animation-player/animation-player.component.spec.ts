import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimationPlayerComponent } from './animation-player.component';

describe('AnimationPlayerComponent', () => {
  let component: AnimationPlayerComponent;
  let fixture: ComponentFixture<AnimationPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimationPlayerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimationPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
