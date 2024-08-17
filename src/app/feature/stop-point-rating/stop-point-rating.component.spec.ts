import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StopPointRatingComponent } from './stop-point-rating.component';

describe('StopPointRatingComponent', () => {
  let component: StopPointRatingComponent;
  let fixture: ComponentFixture<StopPointRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StopPointRatingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StopPointRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
