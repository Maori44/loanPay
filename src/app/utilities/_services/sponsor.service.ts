import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { endpointSponsor } from './endpoints/endpointSponsor';


@Injectable({
  providedIn: 'root'
})
export class SponsorService {

  sponsorList = new Subject();

  croInviteListForStudies = new Subject();
  croListForInvites = new Subject();
  private sponsors: any[] = [];
  private CroInviteList: any[] = [];

  allPassedData: BehaviorSubject<any>;
 

  constructor(private http: HttpClient,
    private ngxService: NgxUiLoaderService) {
      this.CroInviteList = new Array<any>();
     this.allPassedData = new BehaviorSubject<any>([]);
     }

    getSponsorList() {
      return this.sponsors;
    }
  
    getSponsorById(id:any) {
      return this.sponsors[id];
    }
  
    setSponsor(org: any[]) {
      return this.sponsors = org;
    }
   

    setCroInviteList(passedData: any[]) {
      this.allPassedData.next(passedData);
      //this.CroInviteList = cros;
    }

    getCroInviteList():any{
      return this.allPassedData.getValue(); 
    }

  GetSponsorList() {
    this.ngxService.start();
    return this.http.get<any>(environment.baseUserApi + endpointSponsor.GetSponsorList)
      .pipe(
        map((response: any) => {
          this.sponsorList = response.data.organizations;
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

  GetSponsor(id:any) {
    this.ngxService.start();
    return this.http.get<any>(environment.baseUserApi + endpointSponsor.GetSponsor + "?id=" + id)
      .pipe(
        map((response: any) => {
          this.sponsorList = response.data.organizations;
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
    return this.http.get<any>(environment.baseUserApi + endpointSponsor.SearchSponsor+ "?search=" + search)
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

  deleteSponsor(id: any) {
    this.ngxService.start();
    return this.http.post<any>(environment.baseUserApi + endpointSponsor.DeleteSponsor, id)
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

  SaveSponser(model: any) {
    this.ngxService.start();
    return this.http.post<any>(environment.baseUserApi + endpointSponsor.SaveSponsor, model)
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

  UpdateSponsor(model: any) {
    this.ngxService.start();
    return this.http.post<any>(environment.baseUserApi + endpointSponsor.UpdateSponsor, model)
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
    return this.http.post<any>(environment.baseUserApi + endpointSponsor.SaveAdmin, Model)
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
    return this.http.post<any>(environment.baseUserApi + endpointSponsor.UpdateAdmin, Model)
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

  

  GetCROInviteListForStudies() {
    this.ngxService.start();
    return this.http.get<any>(environment.baseUserApi + endpointSponsor.GetCROInviteListForStudies)
      .pipe(
        map((response: any) => {
          this.croInviteListForStudies = response.data.croInviteForStudies;
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


  GetCROListForInvites(Model:any) {
    this.ngxService.start();
    return this.http.post<any>(environment.baseUserApi + endpointSponsor.GetCROListForInvites, Model)    
      .pipe(
        map((response: any) => {
          this.croListForInvites = response.data.croListForInvites;
          this.setCroInviteList(response.data.croListForInvites);         
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


  GetStudyDetailsForInvites(id:any) {
    this.ngxService.start();
    return this.http.get<any>(environment.baseUserApi + endpointSponsor.GetCSStudyDetails + "?id=" + id)
      .pipe(
        map((response: any) => {
          //this.croListForInvites = response.data.croListForInvites;
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


  SendCROInvitationForStudy(Model:any){
    this.ngxService.start();
    return this.http.post<any>(environment.baseUserApi + endpointSponsor.SendCROInvitationForStudy, Model)
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


  SendCROInvitationAcceptenceStatusForStudy(Model:any){
    this.ngxService.start();
    return this.http.post<any>(environment.baseUserApi + endpointSponsor.SendCROInvitationAcceptenceStatusForStudy, Model)
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



  GetInviteStatusBySponsorId(id:any,code:any) {
    this.ngxService.start();
    return this.http.get<any>(environment.baseUserApi + endpointSponsor.GetInviteStatusBySponsorId + "?SponsorID=" + id + "&Code=" + code)
      .pipe(
        map((response: any) => {
          //this.croListForInvites = response.data.croListForInvites;
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

  SaveConsentForm(model: any) {
    this.ngxService.start();
    return this.http.post<any>(environment.baseUserApi + endpointSponsor.SaveConsentForm, model)
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

 
  SearchStudy(search: string) {
    this.ngxService.start();
    return this.http.get<any>(environment.baseUserApi + endpointSponsor.SearchStudyByStudyCodeOrTitle + "?search=" + search)
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



