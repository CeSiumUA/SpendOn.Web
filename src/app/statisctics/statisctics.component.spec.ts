import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatiscticsComponent } from './statisctics.component';

describe('StatiscticsComponent', () => {
  let component: StatiscticsComponent;
  let fixture: ComponentFixture<StatiscticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatiscticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatiscticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
