import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { endpointPI } from './endpoints/endpointsPI';

@Injectable({
  providedIn: 'root'
})
export class InvestigatorService {

  principalList = new Subject();
  private principal: any[] = [];

  constructor(private http: HttpClient,
    private ngxService: NgxUiLoaderService) { }

  getPI() {
    return this.principal;
  }

  getPIById(id: any) {
    return this.principal[id];
  }

  setPI(org: any[]) {
    return this.principal = org;
  }

  GetPIList() {
    this.ngxService.start();
    return this.http.get<any>(environment.baseUserApi + endpointPI.GetPIList)
      .pipe(
        map((response: any) => {
          this.principalList = response.data.organizations;
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

  GetPIbyId(id:any){
    this.ngxService.start();
    return this.http.get<any>(environment.baseUserApi + endpointPI.GetPI + "?id=" + id)
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

  searchPI(search: string) {
    this.ngxService.start();
    return this.http.get<any>(environment.baseUserApi + endpointPI.SearchPI + "?search=" + search)
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

  deletePI(id: any) {
    this.ngxService.start();
    return this.http.post<any>(environment.baseUserApi + endpointPI.DeletePI, id)
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

  SavePI(model: any) {
    this.ngxService.start();
    return this.http.post<any>(environment.baseUserApi + endpointPI.SavePI, model)
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

  UpdatePI(model: any) {
    this.ngxService.start();
    return this.http.post<any>(environment.baseUserApi + endpointPI.UpdatePI, model)
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

  saveAdmin(Model: any) {
    this.ngxService.start();
    return this.http.post<any>(environment.baseUserApi + endpointPI.AdminInvite, Model)
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

  updateAdmin(Model: any) {
    this.ngxService.start();
    return this.http.post<any>(environment.baseUserApi + endpointPI.UpdateAdmin, Model)
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
