import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParcelaItemComponent } from './parcela-item.component';

describe('ParcelaItemComponent', () => {
  let component: ParcelaItemComponent;
  let fixture: ComponentFixture<ParcelaItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParcelaItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParcelaItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
