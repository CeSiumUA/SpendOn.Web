import { StoredTransactionModel } from './stored.transaction';
export interface PagedTransactions{
    Transactions: StoredTransactionModel[]
    Count: number
}