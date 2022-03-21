import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { LocalStorageService } from 'src/app/utilities/_services/localStorageService';
import * as _ from 'lodash';
import { MasterService } from 'src/app/utilities/_services/master.service';
import { HttpStatusCode } from 'src/app/shared/models/HttpStatusCode';
import { NotificationService } from 'src/app/utilities/_services/notification.service';
import { NotificationMessages } from 'src/app/shared/constants/notificationMessages';
import { Router } from '@angular/router';
import { DocumentCenterService } from '../../services/document-center.service';
import { DocumentCenterDataService } from '../../services/document-center-data.service';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {


  @Input() loginUserId: any;

  oneAtATime = true;

  tempItem = [0, 0, 0, 0, 0];
  initialOpen = true;
  permission: any = [];
  userId: any;
  roleList: any;
  rolePermission: any;
  finalArray: any = [];
  selectedRole: string;
  selectedRoleID: any;
  isEdit: boolean = false;

  constructor(private documentCenterService: DocumentCenterService, private localStorage: LocalStorageService, private fb: FormBuilder, private masterService: MasterService, private notificationService: NotificationService, private router: Router, private dataService: DocumentCenterDataService) { }

  DocumentCenterForm: FormGroup;
  items: FormArray;
  documentFilesArray: any = [];
  tempArray: any = [];
  search: any;

  ngOnInit(): void {
    // this.userId = this.localStorage._getUserId();
    this.userId = this.loginUserId;
    this.init();
    //this.getUserRoleList();
    this.getDocumentFileListById(this.userId);

  }



  getDocumentFileListById(id: any) {
    let obj = {
      id : id, //int needed
      search: this.search == null || this.search == ''  ? '' : this.search
    }

    this.documentCenterService.GetDocumentCenterFileById(obj).subscribe((res: any) => {
      if (res) {
        if (res.statusCode === HttpStatusCode.StatusCode200) {
          if (res.data.length > 0) {
            this.documentFilesArray = res.data;
            //console.log(this.documentFilesArray);
          }
        }
      }
    })

  }

  onSearchDocument(){
    let obj = {
      id : this.userId, //int needed
      search: this.search == null || this.search == ''  ? '' : this.search
    }

    this.documentCenterService.GetDocumentCenterFileById(obj).subscribe((res: any) => {
      if (res) {
        if (res.statusCode === HttpStatusCode.StatusCode200) {
          if (res.data.length > 0) {
            this.documentFilesArray = res.data;
            //console.log(this.documentFilesArray);
          }
        }
      }
    })

  }

  urlBackRedirect() {
    if (this.router.url.includes('/sponsor')) {
      this.router.navigate(['sponsor/dashboard'])
    }
    else if (this.router.url.includes('/cro')) {
      this.router.navigate(['cro/dashboard'])
    }
    else if (this.router.url.includes('/principal-investigator')) {
      this.router.navigate(['principal-investigator/dashboard'])
    }
  }


  urlAddRedirect() {
    if (this.router.url.includes('/sponsor')) {
      this.router.navigate(['sponsor/document-center/add-document'])
    }
    else if (this.router.url.includes('/cro')) {
      this.router.navigate(['cro/document-center/add-document'])
    }
    else if (this.router.url.includes('/principal-investigator')) {
      this.router.navigate(['principal-investigator/document-center/add-document'])
    }
  }

  urlHomeRedirect() {
    if (this.router.url.includes('/sponsor')) {
      this.router.navigate(['sponsor/dashboard'])
    }
    else if (this.router.url.includes('/cro')) {
      this.router.navigate(['cro/dashboard'])
    }

  }

  urldocumentRedirect() {
    if (this.router.url.includes('/sponsor')) {
      this.router.navigate(['sponsor/document-center/add-document'])
    }
    else if (this.router.url.includes('/cro')) {
      this.router.navigate(['cro/document-center/add-document'])
    }

  }


  urlEditRedirect(id: number) {
    if (this.router.url.includes('/sponsor')) {
      this.dataService.setData(id);
      this.router.navigate(['sponsor/document-center/edit-document'])

    }
    else if (this.router.url.includes('/cro')) {
      this.dataService.setData(id);
      this.router.navigate(['cro/document-center/edit-document'])
    }
    else if (this.router.url.includes('/principal-investigator')) {
      this.router.navigate(['principal-investigator/document-center/edit-document'])
    }
  }

  getFileDownloadLink(link: any, fileName: any) {

    this.documentCenterService.GetDocumentDownloadFile(link).subscribe((res: any) => {
      if (res) {
        if (res.statusCode === HttpStatusCode.StatusCode200) {
          if (res.data.length > 0) {
            return this.downloadFile(res.data, fileName);
          }
          else {
            this.notificationService.error(NotificationMessages.invalidFileType);
          }
        }
      }
    })

  }

  downloadFile(base64String: any, fileName: string) {
    const source = base64String;
    const link = document.createElement("a");
    link.href = source;
    link.download = `${fileName}`
    link.click();
  }

  init() {
    this.DocumentCenterForm = this.fb.group({
      moduleName: new FormControl(''),
      roles: new FormControl(''),
      modules: this.fb.array([])
    });
  }



}
