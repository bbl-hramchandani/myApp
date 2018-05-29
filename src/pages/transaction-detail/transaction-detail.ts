import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AtmTransaction } from '../../models/atm.interface';

@IonicPage()
@Component({
  selector: 'page-transaction-detail',
  templateUrl: 'transaction-detail.html',
})
export class TransactionDetailPage {

  item : AtmTransaction;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item = navParams.get("item");
  }

  dismissThis() {
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransactionDetailPage');
  }

}
