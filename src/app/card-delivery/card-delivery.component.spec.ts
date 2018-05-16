import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDeliveryComponent } from './card-delivery.component';

describe('CardDeliveryComponent', () => {
  let component: CardDeliveryComponent;
  let fixture: ComponentFixture<CardDeliveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardDeliveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
