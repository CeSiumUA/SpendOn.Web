import { Component, OnInit } from '@angular/core';
import { Category } from '../../../models/category';
import { AddTransactionModel } from '../../../models/add.transaction';
import { FormControl } from '@angular/forms';

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

  constructor() { }

  addTransaction(): void{
    const storedTransactions: AddTransactionModel[] = JSON.parse(localStorage.getItem('transactions') ?? '[]')
    const newTransaction: AddTransactionModel = {
      amount: this.amount ?? 0,
      spentAt: this.spentAt.value,
      note: this.noteText,
      categoryId: this.category ?? 13
    }
    storedTransactions.push(newTransaction)
    localStorage.setItem('transactions', JSON.stringify(storedTransactions))
  }
  
  ngOnInit(): void {
    this.categories = JSON.parse(localStorage.getItem('categories') ?? '[]')
  }

}
