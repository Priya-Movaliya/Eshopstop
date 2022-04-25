import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSellComponent } from './update-sell.component';

describe('UpdateSellComponent', () => {
  let component: UpdateSellComponent;
  let fixture: ComponentFixture<UpdateSellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
