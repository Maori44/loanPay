import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { endpointMaster } from './endpoints/endpointMaster';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http: HttpClient,
    private ngxService: NgxUiLoaderService) { }

  GetCountry() {
    this.ngxService.start();
    return this.http.get<any>(environment.baseUserApi + endpointMaster.selectCountry)
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

  GetState(id: any) {
    this.ngxService.start();
    return this.http.get<any>(environment.baseUserApi + endpointMaster.selectState + '?id=' + id)
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

  GetCity(id: any) {
    this.ngxService.start();
    return this.http.get<any>(environment.baseUserApi + endpointMaster.selectCity + '?id=' + id)
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

  GetRoleList(id: any) {
    this.ngxService.start();
    return this.http.get<any>(environment.baseUserApi + endpointMaster.GetRolesList + '?id=' + id )
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

  GetRoleById(id:any) {
    this.ngxService.start();
    return this.http.get<any>(environment.baseUserApi + endpointMaster.GetRoleById + '?id=' + id )
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

  SaveUserRole(model: any) {
    this.ngxService.start();
    return this.http.post<any>(environment.baseUserApi + endpointMaster.AddRole , model)
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

  UpdateUserRole(model: any) {
    this.ngxService.start();
    return this.http.post<any>(environment.baseUserApi + endpointMaster.UpdateRole , model)
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

  DeleteRole(id: any) {
    this.ngxService.start();
    return this.http.post<any>(environment.baseUserApi + endpointMaster.DeleteRole, id )
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

  GivePermission(model: any) {
    this.ngxService.start();
    return this.http.post<any>(environment.baseUserApi + endpointMaster.GivePermission, model )
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

  GetActionWithMenu(id: any) {
    this.ngxService.start();
    return this.http.get<any>(environment.baseUserApi + endpointMaster.GetActionWithMenu + '?UserId=' + id )
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

  GetMenuPermissionForEdit(id: any) {
    this.ngxService.start();
    return this.http.get<any>(environment.baseUserApi + endpointMaster.GetMenuPermissionForEdit + '?RoleId=' + id )
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
