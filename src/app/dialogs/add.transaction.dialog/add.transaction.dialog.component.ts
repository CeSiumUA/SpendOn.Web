import { Component, Inject, OnInit } from '@angular/core';
import { Category } from '../../../models/category';
import { AddTransactionModel } from '../../../models/add.transaction';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add.transaction.dialog',
  templateUrl: './add.transaction.dialog.component.html',
  styleUrls: ['./add.transaction.dialog.component.css']
})
export class AddTransactionDialogComponent implements OnInit {

  amount: number | undefined = undefined;
  category: number | undefined = undefined;
  noteText: string | undefined = undefined;
  spentAt: FormControl = new FormControl(new Date());
  categories: Category[] = []

  constructor(public dialogRef: MatDialogRef<AddTransactionDialogComponent>) { }

  addTransaction(): void{
    const storedTransactions: AddTransactionModel[] = JSON.parse(localStorage.getItem('transactions') ?? '[]')
    const newTransaction: AddTransactionModel = {
      Amount: this.amount ?? 0,
      SpentAt: this.spentAt.value,
      Note: this.noteText,
      CategoryId: this.category ?? 13
    }
    storedTransactions.push(newTransaction)
    localStorage.setItem('transactions', JSON.stringify(storedTransactions))
    this.dialogRef.close();
  }
  
  ngOnInit(): void {
    this.categories = JSON.parse(localStorage.getItem('categories') ?? '[]')
  }

}
