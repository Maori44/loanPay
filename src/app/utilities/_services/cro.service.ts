import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { endpointCRO } from './endpoints/endpointCRO';



@Injectable({
  providedIn: 'root'
})
export class CROService {
  croList = new Subject();
  studyList = new Subject();
  private cros: any[] = [];

  constructor(private http: HttpClient,
    private ngxService: NgxUiLoaderService) { }

    getCROList() {
      return this.cros;
    }
  
    getCROById(id:any) {
      return this.cros[id];
    }
  
    setCRO(org: any[]) {
      return this.cros = org;
    }

  GetCROList() {
    this.ngxService.start();
    return this.http.get<any>(environment.baseUserApi + endpointCRO.GetCROList)
      .pipe(
        map((response: any) => {
          this.croList = response.data.organizations;
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

  GetCRO(id:any) {
    this.ngxService.start();
    return this.http.get<any>(environment.baseUserApi + endpointCRO.GetCRO + "?id=" + id)
      .pipe(
        map((response: any) => {
          this.croList = response.data.organizations;
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


  GetStudyListByCROId(CROID:any) {
    this.ngxService.start();
    return this.http.get<any>(environment.baseUserApi + endpointCRO.GetStudyListByCROID + "?CROID=" + CROID)
      .pipe(
        map((response: any) => {
          this.studyList = response.data.organizations;
          console.log(response.data.organizations);
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

  searchOrganization(search: string) {
    this.ngxService.start();
    return this.http.get<any>(environment.baseUserApi + endpointCRO.SearchCRO+ "?search=" + search)
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

  deleteCRO(id: any) {
    this.ngxService.start();
    return this.http.post<any>(environment.baseUserApi + endpointCRO.DeleteCRO, id)
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

  ActiveInactiveCro(id: any) {
    this.ngxService.start();
    return this.http.post<any>(environment.baseUserApi + endpointCRO.ActiveInactiveCRO, id)
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

  SaveCRO(model: any) {
    this.ngxService.start();
    return this.http.post<any>(environment.baseUserApi + endpointCRO.SaveCRO, model)
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

  UpdateCRO(model: any) {
    this.ngxService.start();
    return this.http.post<any>(environment.baseUserApi + endpointCRO.UpdateCRO, model)
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
    return this.http.post<any>(environment.baseUserApi + endpointCRO.SaveAdmin, Model)
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
    return this.http.post<any>(environment.baseUserApi + endpointCRO.UpdateAdmin, Model)
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


  SearchStudyList(Model:any) {
    this.ngxService.start();
    return this.http.post<any>(environment.baseUserApi + endpointCRO.SearchStudyList, Model)    
      .pipe(
        map((response: any) => {
          this.studyList = response.data.organizations;
          console.log(response.data.organizations);
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
