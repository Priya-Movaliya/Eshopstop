import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatecourierComponent } from './updatecourier.component';

describe('UpdatecourierComponent', () => {
  let component: UpdatecourierComponent;
  let fixture: ComponentFixture<UpdatecourierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatecourierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatecourierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
