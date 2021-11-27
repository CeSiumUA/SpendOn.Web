import { AddTransactionModel } from './add.transaction';
export interface StoredTransactionModel extends AddTransactionModel {
    id: number
}