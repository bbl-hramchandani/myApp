import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AtmserviceProvider } from '../../providers/atmservice/atmservice';
import { DepositPage } from '../deposit/deposit';
import { WithdrawalPage } from '../withdrawal/withdrawal';

@Component({
  selector: 'page-operation',
  templateUrl: 'operation.html'
})

export class OperationPage {

  currentBalance : number = 0;
  accountName : string = '';

  constructor(public navCtrl: NavController,
              public atmService: AtmserviceProvider) {

  }

  ionViewWillEnter(): void {

    this.atmService.getCurrentBalance(this.atmService.accountNumber).subscribe(resp => {
      this.currentBalance = resp.currentBalance;
      this.accountName = resp.accountName;
    })
    
  }

  ionViewCanEnter(): boolean {
    return this.atmService.accountValid;
  }

  getAccountName() : string {
    return this.accountName;
  }

  getAccountBalance() : number {
    return this.currentBalance;
  }

  performDeposit() {
    this.navCtrl.push('DepositPage');
  }

  performWithdrawal() {
    this.navCtrl.push('WithdrawalPage');
  }  

}
