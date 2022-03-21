import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { endpointDocumentCenter } from 'src/app/utilities/_services/endpoints/endpointDocumentCenter';

@Injectable({
  providedIn: 'root'
})
export class DocumentCenterService {
  croList = new Subject();
  private cros: any[] = [];

  constructor(private http: HttpClient,
    private ngxService: NgxUiLoaderService) { }


  SaveData(model: any) {
    this.ngxService.start();
    return this.http.post<any>(environment.baseUserApi + endpointDocumentCenter.SaveDocument, model)
      .pipe(
        map((response: any) => {
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

  SearchDocument(model: any) {
    this.ngxService.start();
    return this.http.post<any>(environment.baseUserApi + endpointDocumentCenter.SearchDocument, model)
      .pipe(
        map((response: any) => {
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



  GetDocumentDownloadFile(link: any) {
    this.ngxService.start();
    return this.http.get<any>(environment.baseUserApi + endpointDocumentCenter.GetDocumentCenterFiledownloadBylink + '?link=' + link )
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



  
  GetDocumentCenterFileById(model: any) {
    this.ngxService.start();
    return this.http.post<any>(environment.baseUserApi + endpointDocumentCenter.GetDocumentCenterFileById,model)
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


    
  GetExistingDocumentTitlesById(id: any) {
    this.ngxService.start();
    return this.http.get<any>(environment.baseUserApi + endpointDocumentCenter.GetExistingDocumentTitlesById + '?id=' + id )
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