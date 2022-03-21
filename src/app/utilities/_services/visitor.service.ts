import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


const httpOptions = {

  headers: new HttpHeaders({

   'x-rapidapi-key':  '7fa7ecdbb2msh0b221480e04af4fp185453jsnd492922e6e14',

   'x-rapidapi-host':  'find-any-ip-address-or-domain-location-world-wide.p.rapidapi.com'

  })};

@Injectable({
  providedIn: 'root',
})
export class VisitorsService {
  constructor(private http: HttpClient) {}

  getIpAddress() {
    return this.http
      .get('https://find-any-ip-address-or-domain-location-world-wide.p.rapidapi.com/iplocation?apikey=873dbe322aea47f89dcf729dcc8f60e8',httpOptions)
      .pipe(catchError(this.handleError));
  }

  getGEOLocation(ip: any) {
    // Update your api key to get from https://ipgeolocation.io
    let url = 'https://api.ipgeolocation.io/ipgeo?apiKey=c08f361cb6a345b9a0c97724a4fece69&ip=' + ip;
    return this.http.get(url).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}
