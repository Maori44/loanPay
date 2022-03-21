import { sponsorConstant } from 'src/app/shared/constants/sponsorConstant';
import { SelectOptionModel } from './../../models/selectOptionModel';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SponsorService } from 'src/app/utilities/_services/sponsor.service';
import { NotificationService } from 'src/app/utilities/_services/notification.service';
import { LocalStorageService } from 'src/app/utilities/_services/localStorageService';
import { HttpStatusCode } from '../../models/HttpStatusCode';
import { NotificationMessages } from '../../constants/notificationMessages';
import { CommonService } from 'src/app/utilities/_services/common.service';
import { decryption } from '../../genericFunctions/encryptionFun';
import { CSStudyCROInviteModel } from '../../models/CSStudyCROInviteModel';
import { DocumentCenterFileModel } from '../../models/DocumentCenterFileModel';
import { DocumentCenterModel } from '../../models/DataCenterModel';
import { CSStudyCROModel } from '../../models/CSStudyCROModel';
import * as _ from 'lodash';

@Component({
  selector: 'app-invites',
  templateUrl: './invites.component.html',
  styleUrls: ['./invites.component.css']
})
export class InvitesComponent implements OnInit {
  @Input() loginUserId: any;
  @Input() croInformation: any[] = [];
  @Input() studyId: any;
  @Input() csGUID: any;
  @Input() csStudyCode: any;

  title: string = "Invite"
  inviteForm: FormGroup;
  submitted: boolean = false;
  IsViewOnly: boolean = true;
  dataFileList: any[];
  dataURL: any;
  fileList: any;
  ext: any;
  uploadedfile: any;
  testListForLogo: any[] = [];
  isFileSelected: boolean = false;
  croInformationList: any[] = [];


  selectedFile: string = "";
  fileExtention: any;
  userId: any;
  selectModel: SelectOptionModel;
  selectModelList: SelectOptionModel[] = [];
  studyDetails: any;
  selectedFiles: any[];
  selFiles: FileList | null;
  formData: FormData;
  fileManagerApi: any;
  startDownloadFiles: any;
  uploadErrorMessage: any;
  actualSelectedFiles: any[];

  myFiles: any[] = [];

  fileModelObj: DocumentCenterModel; 

  // myForm = new FormGroup({
  //   //name: new FormControl('', [Validators.required, Validators.minLength(3)]),
  //   file: new FormControl('', [Validators.required])
  // });

  constructor(private router: Router, private sponsorService: SponsorService, private commonService: CommonService, private notificationService: NotificationService, private localStorage: LocalStorageService) {
    this.croInformationList = new Array<any>();
    this.actualSelectedFiles = new Array<any>();
    this.fileModelObj = new DocumentCenterModel();
    //this.studyDetails = new Array<any>();
  }



  selectedCROEmails = [];

  ngOnInit() {
        
    // this.croInformationList = this.croInformation;
    //alert(this.croInformation)
    //alert(this.loginUserId);
    //console.log(this.croInformationList);  
    // alert(this.studyId);

    if (this.studyId != null || this.studyId != undefined) {

      let studyCROModel: CSStudyCROModel = new CSStudyCROModel();
      studyCROModel.SponsorID = this.loginUserId;
      studyCROModel.StudyID = this.studyId;

      // console.log(studyCROModel)
      this.GetCROListForInvites(studyCROModel);
      this.GetStudyDetails(this.studyId);
    }
    else {
      //this.studyDetails =[];
    }

    this.init();
  }



  init() {
    this.inviteForm = new FormGroup({
      croInviteEmail: new FormControl(''),
      browseFile: new FormControl('', [Validators.required]),
      notes: new FormControl('', [Validators.required]),
    });

  }


  GetCROListForInvites(model: any) {

    this.sponsorService.GetCROListForInvites(model).subscribe(res => {
      if (res) {
        if (res.data && res.statusCode.toString() == HttpStatusCode.StatusCode200) {
          this.croInformationList = res.data.croInviteList;          
        }
        else {
          this.notificationService.error(NotificationMessages.invalidErrorDueToNet);
        }
      } else {
        this.notificationService.error(NotificationMessages.invalidError);
      }
    })
  }

  GetStudyDetails(id: any) {
    this.sponsorService.GetStudyDetailsForInvites(id).subscribe(res => {
      if (res) {
        if (res.data && res.statusCode.toString() == HttpStatusCode.StatusCode200) {
          this.filterData(res.data);
        }
        else {
          this.notificationService.error(NotificationMessages.invalidErrorDueToNet);
        }
      } else {
        this.notificationService.error(NotificationMessages.invalidError);
      }
    })
  }

  
  filterData(data:any) {
    this.studyDetails = Object.assign({}, data);  
  }


  selectcroInviteList(event: any) {
  }

  get f() {
    return this.inviteForm.controls;
  }

  deleteOperation(fileName: string) {
    this.actualSelectedFiles.splice(this.actualSelectedFiles.indexOf('fileName'));
    console.log(this.actualSelectedFiles);

    if (this.actualSelectedFiles.length == 0) {
      this.isFileSelected = false;
    }
  }

  onFileSelect(event: any) {
    var leng = event.target.files.length;
    for (var i = 0; i < leng; i++) {
      this.checkValidFile(event.target.files[i]);
    }
  }

  checkValidFile(e: any) {
    console.log(e);
    if ((this.commonService.isValidFileType(e.name.toLowerCase(), "text")) || (this.commonService.isValidFileType(e.name.toLowerCase(), "word")) || (this.commonService.isValidFileType(e.name.toLowerCase(), "excel")) || (this.commonService.isValidFileType(e.name.toLowerCase(), "pdf")) || (this.commonService.isValidFileType(e.name.toLowerCase(), "image")) || (this.commonService.isValidFileType(e.name.toLowerCase(), "csv"))) {
      if (e.size > 4194304) {
        this.notificationService.error(NotificationMessages.dataFileSizeError);
        return;
      }
      else if ((e.size > 0) && (e.size <= 4194304)) {
        this.isFileSelected = true;
        this.selectedFile = e.name;
        this.actualSelectedFiles.push(e);
        this.dataFileList = [];
        let fileExtension = e.name.split('.').pop().toLowerCase();
        var input = e.target;
        var reader = new FileReader();
        reader.onload = () => {
          this.dataURL = reader.result;
          this.fileList = this.dataURL;
          this.ext = fileExtension;
          this.dataFileList.push({
            fileName: this.fileList,
            fileExtension: this.ext,
            fileType: e.name.toLowerCase()
          });

        };
        reader.readAsDataURL(e);
      }

    }
    else {
      this.notificationService.error(NotificationMessages.validType);
    }

  }


  submit() {
    var noOfFiles = this.actualSelectedFiles.length;
    console.log(this.selectedCROEmails);
    this.submitted = true;
    const formData = new FormData();
    for (var i = 0; i < this.actualSelectedFiles.length; i++) {
      formData.append("file[]", this.actualSelectedFiles[i]);
    }

    if (this.inviteForm.invalid) {
      return;
    }
    else {
      let studyCROInviteObj: CSStudyCROInviteModel = new CSStudyCROInviteModel();
      studyCROInviteObj.csGuiD  = this.csGUID;
      studyCROInviteObj.CSStudyStudyID = this.studyId;
      studyCROInviteObj.CROList = this.selectedCROEmails;
      studyCROInviteObj.SponsorID = this.loginUserId;
      studyCROInviteObj.InviteMessage = this.inviteForm.value.notes;
      studyCROInviteObj.FileModel = new Array<DocumentCenterFileModel>();
      this.fileModelObj.FileModel = new DocumentCenterFileModel();
      for (let i = 0; i < this.actualSelectedFiles.length; i++) {
        this.fileModelObj.FileModel = new DocumentCenterFileModel();
        this.fileModelObj.FileModel.OriginalFileName = this.actualSelectedFiles[i].name;
        this.fileModelObj.FileModel.OriginalFileNameBase64 = this.dataFileList == undefined ? null : this.dataFileList[i].fileName;
        this.fileModelObj.FileModel.FileExtension =
          this.fileModelObj.FileModel.SaveFileName = "";
        this.fileModelObj.FileModel.FileExtension = this.dataFileList[i].fileExtension;
        this.fileModelObj.FileModel.CommentText = "";
        this.fileModelObj.FileModel.FileVersion = 0;
        this.fileModelObj.FileModel.FileUploadedBy = this.loginUserId;
        this.fileModelObj.FileModel.FileDownloadLink = "";
        this.fileModelObj.FileModel.CreatedBy = this.loginUserId;
        studyCROInviteObj.FileModel.push(this.fileModelObj.FileModel);
      }

      this.sponsorService.SendCROInvitationForStudy(studyCROInviteObj).subscribe(result => {
        if (result) {
          if (result.statusCode === HttpStatusCode.StatusCode200) {
            this.notificationService.success(sponsorConstant.sendCROStudyInvitation);
            this.router.navigate(['/sponsor/manage-clinical-trials']);
            // this.inviteForm.reset();  
            // this.inviteForm.valid;        
          }
        }
      });
    }
  }
}
