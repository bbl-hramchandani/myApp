import { Component } from '@angular/core';

import { TransactionListPage } from '../transaction-list/transaction-list';
import { LogoffPage } from '../logoff/logoff';
import { OperationPage } from '../operation/operation';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = OperationPage;
  tab2Root = TransactionListPage;
  tab3Root = LogoffPage;

  constructor() {

  }
}
