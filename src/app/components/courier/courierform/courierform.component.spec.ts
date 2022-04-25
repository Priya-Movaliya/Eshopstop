import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourierformComponent } from './courierform.component';

describe('CourierformComponent', () => {
  let component: CourierformComponent;
  let fixture: ComponentFixture<CourierformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourierformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourierformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
