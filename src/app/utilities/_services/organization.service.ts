import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { endpointOrg } from './endpoints/endpointOrg';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  organizationList = new Subject();
  private organizations: any[] = [];

  emailTemplateList = new Subject();
  private emails: any[] = [];

  constructor(
    private http: HttpClient,
    private ngxService: NgxUiLoaderService
  ) { }


  getOrganizationList() {
    return this.organizations;
  }

  getOrganizationById(id: any) {
    return this.organizations[id];
  }

  setOrg(org: any[]) {
    return this.organizations = org;
  }

  getEmailList() {
    return this.emails;
  }

  getEmailById(id: any) {
    return this.emails[id];
  }

  setEmail(emails: any[]) {
    return this.emails = emails;
  }

  GetOrganizationList() {
    this.ngxService.start();
    return this.http.get<any>(environment.baseUserApi + endpointOrg.GetOrganizationList)
      .pipe(
        map((response) => {
          this.organizationList = response.data.organizations;
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

  GetOrganizationById(Model: any) {
    this.ngxService.start();
    return this.http.get<any>(environment.baseUserApi + endpointOrg.GetOrganizationById + "?id=" + Model)
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

  searchOrganization(search: string) {
    this.ngxService.start();
    return this.http.get<any>(environment.baseUserApi + endpointOrg.searchOrganization + "?search=" + search)
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


  saveOrganization(Model: any) {
    this.ngxService.start();
    return this.http.post<any>(environment.baseUserApi + endpointOrg.SaveOrganization, Model)
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

  saveVendor(Model: any) {
    this.ngxService.start();
    return this.http.post<any>(environment.baseUserApi + endpointOrg.SaveVendor, Model)
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

  UpdateAdminInvite(Model: any){
    this.ngxService.start();
    return this.http.post<any>(environment.baseUserApi + endpointOrg.UpdateVendor, Model)
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

  updateOrganization(Model: any) {
    this.ngxService.start();
    return this.http.post<any>(environment.baseUserApi + endpointOrg.UpdateOrganization, Model)
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

  deleteOrganization(id: any) {
    this.ngxService.start();
    return this.http.post<any>(environment.baseUserApi + endpointOrg.DeleteOrganization, id)
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

  ActiveInactiveOrganization(id: any) {
    this.ngxService.start();
    return this.http.post<any>(environment.baseUserApi + endpointOrg.ActiveInactiveOrganization, id)
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

  ActivateAdmin(model: any) {
    this.ngxService.start();
    return this.http.post<any>(environment.baseUserApi + endpointOrg.AcceptInvitation, model)
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

  getTokenData(token: string) {
    this.ngxService.start();
    return this.http.post<any>(environment.baseUserApi + endpointOrg.getTokenData, token)
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


  GetOrganizationDatabaseById(Id: number) {
    this.ngxService.start();
    return this.http.get<any>(environment.baseUserApi + endpointOrg.GetOrganizationDatabaseById + "?id=" + Id)
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

  saveUpdateOrganizationDatabase(Model: any) {
    this.ngxService.start();
    return this.http.post<any>(environment.baseUserApi + endpointOrg.SaveOrganizationDatabase, Model)
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

  GetOrganizationSMTPById(Id: number) {
    this.ngxService.start();
    return this.http.get<any>(environment.baseUserApi + endpointOrg.GetOrganizationSMTPById + "?id=" + Id)
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

  saveUpdateOrganizationSMTP(Model: any) {
    this.ngxService.start();
    return this.http.post<any>(environment.baseUserApi + endpointOrg.SaveOrganizationSMTP, Model)
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

  getEmailTemplateList() {
    this.ngxService.start();
    return this.http.get<any>(environment.baseUserApi + endpointOrg.GetEmailTemplate)
      .pipe(
        map((response) => {
         this.emailTemplateList = response.data.emailTemplate;
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

  saveEmailTemplateList(model: any) {
    this.ngxService.start();
    return this.http.post<any>(environment.baseUserApi + endpointOrg.SaveEmailTemplate, model)
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

  updateEmailTemplateList(model: any) {
    this.ngxService.start();
    return this.http.post<any>(environment.baseUserApi + endpointOrg.UpdateEmailTemplate, model)
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


  deleteEmailTemplate(id: any) {
    this.ngxService.start();
    return this.http.post<any>(environment.baseUserApi + endpointOrg.DeleteEmailTemplate, id)
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

  ActiveInactiveEmailTemplate(id: any) {
    this.ngxService.start();
    return this.http.post<any>(environment.baseUserApi + endpointOrg.EmailTemplateActiveInactive, id)
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

  searchEmailTemplate(search: string) {
    this.ngxService.start();
    return this.http.get<any>(environment.baseUserApi + endpointOrg.searchEmailTemplate + "?search=" + search)
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
