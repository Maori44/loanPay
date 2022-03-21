import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { endpointStaff } from './endpointStaff';



@Injectable({
  providedIn: 'root'
})
export class StaffService {
  constructor(
    private http: HttpClient,
    private ngxService: NgxUiLoaderService
  ) { }


  SearchStaff(model: any) {   
    this.ngxService.start();
    return this.http.post<any>(environment.baseUserApi + endpointStaff.SearchStaff, model)
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

  GetStaffInvites(model: any) {
    this.ngxService.start();
    return this.http.post<any>(environment.baseUserApi + endpointStaff.GetStaffInvites, model)
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

  GetStaffAdminInvite(model: any) {
    this.ngxService.start();
    return this.http.post<any>(environment.baseUserApi + endpointStaff.GetStaffAdminInvite, model)
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

  ViewStaffInviteById(model: any) {
    this.ngxService.start();
    return this.http.post<any>(environment.baseUserApi + endpointStaff.ViewStaffInvite, model)
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

  changeStatus(model: any) {
    this.ngxService.start();
    return this.http.post<any>(environment.baseUserApi + endpointStaff.BlockStaff, model)
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

  deleteStaff(model: any) {
    this.ngxService.start();
    return this.http.post<any>(environment.baseUserApi + endpointStaff.DeleteStaff, model)
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

  ActiveInactiveStaff(model: any) {
    this.ngxService.start();
    return this.http.post<any>(environment.baseUserApi + endpointStaff.ActiveInactiveStaff, model)
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

  sendInviteToStaff(model: any) {
    this.ngxService.start();
    return this.http.post<any>(environment.baseUserApi + endpointStaff.sendInviteToStaff, model)
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

  UpdateAdminInvite(model: any){
    this.ngxService.start();
    return this.http.post<any>(environment.baseUserApi + endpointStaff.UpdateAdminInvite, model)
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

  GetStaffDetails(model: any){
    this.ngxService.start();
    return this.http.post<any>(environment.baseUserApi + endpointStaff.GetStaffDetails, model)
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

  UpdateStaffDetails(model: any){
    this.ngxService.start();
    return this.http.post<any>(environment.baseUserApi + endpointStaff.UpdateStaffDetails, model)
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
