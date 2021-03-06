import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTransactionDialogComponent } from './add.transaction.dialog.component';

describe('Add.Transaction.DialogComponent', () => {
  let component: AddTransactionDialogComponent;
  let fixture: ComponentFixture<AddTransactionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTransactionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTransactionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
