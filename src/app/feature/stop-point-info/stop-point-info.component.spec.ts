import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StopPointInfoComponent } from './stop-point-info.component';

describe('StopPointInfoComponent', () => {
  let component: StopPointInfoComponent;
  let fixture: ComponentFixture<StopPointInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StopPointInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StopPointInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
