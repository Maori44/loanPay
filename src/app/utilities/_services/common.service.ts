import { endpointCommon } from './endpoints/endpointCommon';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CSVRecord } from 'src/app/shared/models/CSVModel';
import { HttpClient } from '@angular/common/http';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { endpointStaff } from './endpointStaff';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private router: Router, private http: HttpClient,
    private ngxService: NgxUiLoaderService) { }

  isValidFileType(fileName: any, fileType: any) {
    // let extentionLists: any = { video: [], image: [], pdf: [], excel: [], xml: [] ,word:[] ,powerpoint:[] ,odp:[] ,txt:[] ,csv:[] ,html:[] ,audio:[]};
    let extentionLists: any = { image: [], pdf: [], excel: [], word: [], text: [], csv: [] };
    let isValidType = false;

    extentionLists.image = ['jpg', 'jpeg', 'bmp', 'png', 'ico'];
    extentionLists.pdf = ['pdf'];
    extentionLists.excel = ['xls', 'xlsx'];
    extentionLists.word = ['doc', 'docx'];
    extentionLists.text = ['txt'];
    extentionLists.csv = ['csv'];
    //extentionLists.video = ['m4v', 'avi', 'mpg', 'mp4','mov','flv'];

    // extentionLists.xml = ['xml'];

    // extentionLists.powerpoint = ['ppt','pptx'];
    //extentionLists.odp=['odp'];

    //extentionLists.html = ['htm','html'];
    //extentionLists.audio = ['m4a','mp3','wav'];
    //get the extension of the selected file.
    let fileExtension = fileName.split('.').pop().toLowerCase();
    //alert(extentionLists[fileType].indexOf(fileExtension));
    isValidType = extentionLists[fileType].indexOf(fileExtension) > -1;
    return isValidType;
  }

  getHeaderArray(csvRecordsArr: any) {
    let headers = (<string>csvRecordsArr[0]).split(',');
    let headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }

  getRouterPath() {
    let routerPath = '';
    if (this.router.url.includes('/sponsor')) {
      routerPath = 'sponsor';
    } else if (this.router.url.includes('cro')) {
      routerPath = 'cro';
    }
    return routerPath;
  }

  getDataRecordsArrayFromCSVFile(
    csvRecordsArray: any,
    headerLength: any,
    fileName: any
  ) {
    let csvArr = [];

    for (let i = 1; i < csvRecordsArray.length; i++) {
      let curruntRecord = (<string>csvRecordsArray[i]).split(',');
      if (curruntRecord.length == headerLength) {
        let csvRecord: CSVRecord = new CSVRecord();
        csvRecord.id = curruntRecord[0].trim();
        csvRecord.description = curruntRecord[1].trim();
        csvRecord.discount = curruntRecord[2].trim();
        csvRecord.amount = curruntRecord[3].trim();
        csvRecord.price = curruntRecord[4].trim();
        // //csvRecord.mobile = curruntRecord[5].trim();
        csvArr.push(csvRecord);
      }
    }
    return csvArr;
  }


  GetUserDetails(model: any){
    this.ngxService.start();
    return this.http.post<any>(environment.baseUserApi + endpointCommon.GetUserDetails, model)
      .pipe(
        map((response) => {
          this.ngxService.stop();
          return response;
        }),
        catchError((error: any) => {
          console.log(error);
          this.ngxService.stop();
          return error;
        })
      );
  }

  UpdateUserDetails(model: any){
    this.ngxService.start();
    return this.http.post<any>(environment.baseUserApi + endpointCommon.UpdateUserDetails, model)
      .pipe(
        map((response) => {
          this.ngxService.stop();
          return response;
        }),
        catchError((error: any) => {
          console.log(error);
          this.ngxService.stop();
          return error;
        })
      );
  }
}
