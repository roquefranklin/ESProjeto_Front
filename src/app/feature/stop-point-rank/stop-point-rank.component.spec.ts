import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StopPointRankComponent } from './stop-point-rank.component';

describe('StopPointRankComponent', () => {
  let component: StopPointRankComponent;
  let fixture: ComponentFixture<StopPointRankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StopPointRankComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StopPointRankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
