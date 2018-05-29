import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AtmserviceProvider } from '../atmservice/atmservice';

@Injectable()
export class HttpinterceptorProvider {

  constructor(public atmService: AtmserviceProvider) {
    console.log('Hello HttpinterceptorProvider Provider');
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    const request = req.clone({
      headers: req.headers.set('bbank-ApiKey', 'heregoesastrongpasswordfortheApiKey').set('bbank-secure', this.atmService.getToken())
    });

    return next.handle(request);

  }  

}
