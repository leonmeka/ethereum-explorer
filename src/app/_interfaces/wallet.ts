export interface Wallet {
    adress:string;
    balance:number;
    value:number;
    transactions_number:number;
    unconfirmed_transactions_number:number;
    qr_url:string;
    collapsed:boolean;
}
