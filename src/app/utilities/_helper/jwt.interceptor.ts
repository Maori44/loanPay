import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { decryption } from 'src/app/shared/genericFunctions/encryptionFun';
import { LocalStorageService } from '../_services/localStorageService';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  reqWithAuth: HttpRequest<any>;
  decryptToken: any;
  constructor() { }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
 
    // add authorization header with jwt token if available
    let IpAddress: any = localStorage.getItem('IpAddress');
    let country: any = localStorage.getItem('country');
    let AuthToken = localStorage.getItem("NewShadow");
    AuthToken = AuthToken ? AuthToken : sessionStorage.getItem('NewShadow');
    this.decryptToken = decryption(AuthToken);

    //For hitting particular url
    let testURL: boolean = req.url.toString().includes("/test");   

    if (!AuthToken) {
      this.reqWithAuth = req.clone({
        setHeaders: {
          "Authorization": "Bearer " + "123",
          "Ip-Address": IpAddress ? IpAddress : "0",
          "Country": country ? country : "United States",
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    } else {
      this.reqWithAuth = req.clone({
        setHeaders: {
          "Authorization": "Bearer " + AuthToken,
          "Ip-Address": IpAddress ? IpAddress : "0",
          "Country": country ? country : "United States",
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }
    return next.handle(this.reqWithAuth);
  }
}
