import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { endpointParticipants } from './endpoints/endpointParticipants';

@Injectable({
  providedIn: 'root'
})
export class ParticipantsService {

  constructor(
    private http: HttpClient,
    private ngxService: NgxUiLoaderService
  ) { }


  GetParticipantList(model: any) {
    this.ngxService.start();
    return this.http.post<any>(environment.baseUserApi + endpointParticipants.GetParticipantList, model)
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

  GetParticipantInviteById(model: any) {
    this.ngxService.start();
    return this.http.post<any>(environment.baseUserApi + endpointParticipants.GetParticipant, model)
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
    return this.http.post<any>(environment.baseUserApi + endpointParticipants.BlockParticipant, model)
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

  deleteParticipants(model: any) {
    this.ngxService.start();
    return this.http.post<any>(environment.baseUserApi + endpointParticipants.DeleteParticipant, model)
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


  sendInviteToParticipant(model: any) {
    this.ngxService.start();
    return this.http.post<any>(environment.baseUserApi + endpointParticipants.sendInviteToParticipant, model)
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
    return this.http.post<any>(environment.baseUserApi + endpointParticipants.UpdateAdminInvite, model)
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
