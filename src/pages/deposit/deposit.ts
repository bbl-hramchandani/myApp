import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AtmserviceProvider } from '../../providers/atmservice/atmservice';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-deposit',
  templateUrl: 'deposit.html',
})
export class DepositPage {

  myForm: FormGroup;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public atmService: AtmserviceProvider,
              public alertCtrl: AlertController) {

      this.myForm = new FormGroup({
        amount : new FormControl('', Validators.required)
      });   

  }

  performDeposit() {

    let amount = this.myForm.get("amount").value;

    this.atmService.deposit(this.atmService.getAccountNumber(), amount).then( result => {
      
      let alert = this.alertCtrl.create({
        title: 'ATM Project',
        subTitle: 'Deposit was successful',
        buttons: ['OK']
      });
      alert.present();

      this.myForm.reset();


    });    

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DepositPage');
  }

}
