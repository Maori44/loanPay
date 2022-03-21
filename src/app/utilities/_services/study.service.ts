import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { endpointStudy } from './endpoints/endpointStudy';

@Injectable({
  providedIn: 'root'
})
export class StudyService {
  passedStudyData: BehaviorSubject<any>;
  constructor(
    private http: HttpClient,
    private ngxService: NgxUiLoaderService
  ) { 
    this.passedStudyData = new BehaviorSubject<any>(null);
  }


  setClinicalStudyData(passData:any){
    this.passedStudyData.next(passData);
  }

  getClinicalStudyData():any{
    return this.passedStudyData.getValue(); 
  }

  AddStudy(model: any) {
    this.ngxService.start();
    return this.http.post<any>(environment.baseStudyApi + endpointStudy.AddStudy, model)
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

  SearchStudy(model: any) {
    this.ngxService.start();
    return this.http.post<any>(environment.baseStudyApi + endpointStudy.SearchStudies, model)
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

  SearchAllTypeStudy(model: any) {
    this.ngxService.start();
    return this.http.post<any>(environment.baseStudyApi + endpointStudy.SearchAllTypeStudies, model)
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

  UpdateStudy(model: any) {
    this.ngxService.start();
    return this.http.post<any>(environment.baseStudyApi + endpointStudy.UpdateStudy, model)
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

  GetStudyList() {
    this.ngxService.start();
    return this.http.get<any>(environment.baseStudyApi + endpointStudy.GetStudyList)
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

  GetStudyData(model: any) {
    this.ngxService.start();
    return this.http.post<any>(environment.baseStudyApi + endpointStudy.GetStudyData, model)
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

  DeleteStudy(model: any) {
    this.ngxService.start();
    return this.http.post<any>(environment.baseStudyApi + endpointStudy.DeleteStudy, model)
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

  ActiveInactiveStudy(model: any) {
    this.ngxService.start();
    return this.http.post<any>(environment.baseStudyApi + endpointStudy.ActiveInactiveStudy, model)
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
