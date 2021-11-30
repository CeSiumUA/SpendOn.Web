import { AddTransactionModel } from './add.transaction';
export interface StoredTransactionModel extends AddTransactionModel {
    Id: number
}

export interface DisplayTransactonModel extends StoredTransactionModel{
    CategoryName: string
}