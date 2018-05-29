import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AtmserviceProvider } from '../../providers/atmservice/atmservice';

@Component({
  selector: 'page-logoff',
  templateUrl: 'logoff.html'
})
export class LogoffPage {

  constructor(public navCtrl: NavController,
              public atmService: AtmserviceProvider) {

      this.atmService.logOff();
      this.navCtrl.setRoot("LoginPage");

  }

}
