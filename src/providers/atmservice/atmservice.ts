import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AtmResponse, AtmResponseOperationBalance, AtmResponseOperation, AtmResponseTransactions } from '../../models/atm.interface';
import { Observable } from 'rxjs/observable';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class AtmserviceProvider {

  private END_POINT = 'http://localhost:3000/atm';
  //private END_POINT = 'http://192.168.9.154:3000/atm';
    
  public accountNumber : string;
  public accountName   : string;
  public currentBalance : number;

  public  accountValid   : boolean;Y
  public  token          : string;

  constructor( public http: HttpClient) {
    console.log('Hello AtmserviceProvider Provider');
      this.accountValid = undefined;
      this.token = undefined;
  }  

  getToken() {
    return this.token !== undefined ? this.token : '';  
  }

  getLastOperations(acct:string) : Observable<AtmResponseTransactions> {
    let TRANSACTIONS = `/transactions/${acct}`;
    return this.http.get<AtmResponseTransactions>(this.END_POINT + TRANSACTIONS);
  }

  getCurrentBalance(acct: string) : Observable<AtmResponseOperationBalance> {
    let BALANCE = `/${acct}`;
    return this.http.get<AtmResponseOperationBalance>(this.END_POINT + BALANCE );
  }

  logOff() : void {
    this.accountNumber = '';
    this.accountName   = '';
    this.currentBalance = 0;
    this.accountValid  = false;
  }

  setAccountNumber(acct:string, pin:string) : Promise<boolean> {

    return new Promise( (succ, reject) => {

      this.accountExists(acct, pin).then ( resp => {
        if (resp.status == 0 ){
            this.accountNumber = acct;
            this.accountValid = true;
            this.token = resp.token;
            succ(true);
        } else {
            this.accountValid = false;
            reject(false);
        }
      });      

    });

  }

  getAccountNumber() {
      return this.accountNumber;
  }

  accountExists(acct: string, pin:string) : Promise<AtmResponse> {

    return new Promise ( (success, reject) => {

        let FINDACCOUNT  = '/find/' + acct +'/pin/'+pin;
        this.http.get<AtmResponse>(this.END_POINT + FINDACCOUNT ).subscribe (
            resp => { success(resp); },
            err  => { reject(err); }
        );

    });

  }

  withDraw(acct: string, amount:number) : Promise<AtmResponseOperation> {
       
    let WITHDRAW = `/withdraw/${acct}/amount/${amount}`;
    
    return new Promise ( (success,reject) => {
            this.http.get<AtmResponseOperation>(this.END_POINT + WITHDRAW ).subscribe (
                resp => { success(resp) },
                err =>  { reject(err) }
            );
    });  

  }

  deposit(acct: string, amount:number) : Promise<AtmResponseOperation> {

      let DEPOSIT  = `/deposit/${acct}/amount/${amount}`;
    
      return new Promise ( (success,reject)=> {
          this.http.get<AtmResponseOperation>(this.END_POINT + DEPOSIT).subscribe(
              resp => { success(resp) },
              err =>  { reject(err) }         
          );
      });

  }  

}
