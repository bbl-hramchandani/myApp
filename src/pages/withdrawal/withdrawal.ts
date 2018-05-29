import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AtmserviceProvider } from '../../providers/atmservice/atmservice';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertController } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-withdrawal',
  templateUrl: 'withdrawal.html',
})
export class WithdrawalPage {

  myForm: FormGroup;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public atmService: AtmserviceProvider,
              public alertCtrl: AlertController) {

      this.myForm = new FormGroup({
        amount : new FormControl('', Validators.required)
      });   

  }

  performWithdrawal() {

    let amount = this.myForm.get("amount").value;

    if (amount > this.atmService.getCurrentBalance(this.atmService.accountNumber)) {

      this.alertCtrl.create({
        title: 'ATM Project',
        subTitle: 'Insufficient Funds Error',
        buttons: ['OK']
      }).present();

    } else {

      this.atmService.withDraw(this.atmService.getAccountNumber(), amount).then( result => {

        let alert = this.alertCtrl.create({
          title: 'ATM Project',
          subTitle: 'Withdrawal was successful',
          buttons: ['OK']
        });
        alert.present();
  
        this.myForm.reset();
  
      });    
  
      
    }

    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WithdrawalPage');
  }

}
