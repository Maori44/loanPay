import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { endpointInventory } from './endpoints/endpointInventory';

@Injectable({
  providedIn: 'root'
})
export class InventoriesService {

constructor(private http: HttpClient,
  private ngxService: NgxUiLoaderService) { }

  GetInventoriesList() {
    this.ngxService.start();
    return this.http.get<any>(environment.baseStudyApi + endpointInventory.getInventoriesList)
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

  GetDrugList() {
    this.ngxService.start();
    return this.http.get<any>(environment.baseStudyApi + endpointInventory.getDrugsList)
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

  GetInventoryRecord(model:any) {
    this.ngxService.start();
    return this.http.post<any>(environment.baseStudyApi + endpointInventory.getInventoryDetails, model)
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

  deleteEntry(model: any) {
    this.ngxService.start();
    return this.http.post<any>(environment.baseStudyApi + endpointInventory.deleteRecord, model)
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

  GetCodeList(id: any) {
    this.ngxService.start();
    return this.http.get<any>(environment.baseStudyApi + endpointInventory.GetCodeList + "?type=" + id)
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

  searchInventory(model: any) {
    this.ngxService.start();
    return this.http.post<any>(environment.baseStudyApi + endpointInventory.SearchInventory,model)
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

  updateEntry(id: any) {
    this.ngxService.start();
    return this.http.post<any>(environment.baseUserApi + endpointInventory.updateRecord, id)
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

  AddStudyInventory(model: any) {
    this.ngxService.start();
    return this.http.post<any>(environment.baseStudyApi + endpointInventory.AddStudyInventory, model)
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

  UpdateStudyInventory(model: any) {
    this.ngxService.start();
    return this.http.post<any>(environment.baseStudyApi + endpointInventory.UpdateStudyInventory, model)
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

  GetStudyInventoryByCSGuid(model: any) {
    this.ngxService.start();
    return this.http.post<any>(environment.baseStudyApi + endpointInventory.GetStudyInventoryByCSGuid, model)
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
