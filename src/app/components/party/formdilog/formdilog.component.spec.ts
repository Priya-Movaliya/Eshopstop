import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormdilogComponent } from './formdilog.component';

describe('FormdilogComponent', () => {
  let component: FormdilogComponent;
  let fixture: ComponentFixture<FormdilogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormdilogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormdilogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
