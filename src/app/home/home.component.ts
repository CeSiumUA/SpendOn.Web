import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddTransactionModel } from 'src/models/add.transaction';
import { ApifetcherService } from 'src/services/apifetcher.service';
import { AddTransactionDialogComponent } from '../dialogs/add.transaction.dialog/add.transaction.dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private dialog: MatDialog, private fetcherService: ApifetcherService, private matSnackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddTransactionDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.uploadStoredTransactions();
    });
  }

  uploadStoredTransactions(): void{
    const transactions: AddTransactionModel[] = JSON.parse(localStorage.getItem('transactions') ?? '[]')
    this.fetcherService.bulkAddTransactions(transactions).subscribe(result => {
      this.matSnackBar.open('Uploaded successfully!', 'Ok', {duration: 2000})
      localStorage.removeItem('transactions')
    }, err => {
      this.matSnackBar.open('Upload failed!', 'Ok', {duration: 2000})
    });
  }
}
