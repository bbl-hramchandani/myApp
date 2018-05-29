import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AtmTransaction } from '../../models/atm.interface';
import { AtmserviceProvider } from '../../providers/atmservice/atmservice';

@Component({
  selector: 'page-transaction-list',
  templateUrl: 'transaction-list.html'
})
export class TransactionListPage {

  transactions: Array<AtmTransaction>;

  constructor(public navCtrl: NavController,
              public atmService: AtmserviceProvider) {

  }

  ionViewWillEnter() {

    this.atmService.getLastOperations(this.atmService.getAccountNumber()).subscribe( data => {
      this.transactions = data.transactions;
    })

  }

  goToItem(item: AtmTransaction) {
    this.navCtrl.push("TransactionDetailPage", {item: item});
  }

}
