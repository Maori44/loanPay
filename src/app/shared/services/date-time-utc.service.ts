import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class DateTimeUtcService {
  constructor() {}

  getNowUTC() {
    const now = new Date();
    return moment.utc(now).format('l');
  }

  //Start Date and End Date
  getUTCDate(date: any) {
    return moment.utc(date).valueOf();
  }

  convertDateToLocalDate(date: any) {
    return moment.utc(date).local().format('DD-MM-YYYY HH:mm:ss').valueOf();
  }

  // Get Date DD/MM/YYYY format date string
  getDateFormate(date: Date) {
    var dd: any = date.getDate();
    var mm: any = date.getMonth() + 1;
    var yyyy = date.getFullYear();

    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    return dd + '/' + mm + '/' + yyyy;
  }
}
