
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { CommonService } from 'src/app/utilities/_services/common.service';
import { LocalStorageService } from 'src/app/utilities/_services/localStorageService';
import { MasterService } from 'src/app/utilities/_services/master.service';
import { NotificationService } from 'src/app/utilities/_services/notification.service';
import { StaffService } from 'src/app/utilities/_services/staff.service';
import { NotificationMessages } from '../../constants/notificationMessages';
import { HttpStatusCode } from '../../models/HttpStatusCode';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-staff-view',
  templateUrl: './profile-staff-view.component.html',
  styleUrls: ['./profile-staff-view.component.scss']
})
export class ProfileStaffViewComponent implements OnInit {

  @Input() manageStaffList: any;
  @Input() type: any;
  Form: FormGroup;

  @ViewChild('tabset') tabset: TabsetComponent;
  tempData: any;
  IsViewOnly: boolean = true;

  multiFileListForProfile: any[];
  dataURL: any;
  fileList: any;
  ext: any;
  isUploadForProfile: boolean = false;
  isUploaddoneForProfile: boolean = true;
  imagePreviewForProfile: any;
  uploadedfileForProfile: any;
  userLoggedInAccountId: any;
  userId: any;
  CountryList: any;
  StateList: never[];
  isStateDisabled: boolean = true;
  submitted: boolean = false;
  isEdit: boolean = false;
  getProfileFile: any;
  routerPath: string;

  constructor(private staffService: StaffService,
    private masterService: MasterService,
    private localStorage: LocalStorageService,
    private notificationService: NotificationService,
    private commonService: CommonService,
    private router: Router) { }

  ngOnInit() {
    this.userId = this.localStorage._getUserId();
    this.userLoggedInAccountId = this.localStorage._getUserAccountId();
    this.init();
    this.routerPath = this.commonService.getRouterPath();
    this.getCountryData();
    this.getStaffData();
  }

  formatDate(date: any) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }

  goto(id: any) {
    this.tabset.tabs[id].active = true;
  }

  getCountryData() {
    this.masterService.GetCountry().subscribe(res => {
      if (res) {
        if (res.statusCode === HttpStatusCode.StatusCode200) {
          this.CountryList = res.data;
        }
      }
    })
  }

  selectCountry(event: any) {
    this.StateList = [];
    this.Form.patchValue({ state: '' })
    if (event) {
      if (event.target.value) {
        this.masterService.GetState(event.target.value).subscribe((res: any) => {
          if (res) {
            if (res.statusCode === HttpStatusCode.StatusCode200) {
              this.StateList = res.data;
              this.isStateDisabled = false;
            }
          }
        })
      }
    }
  }

  init() {
    this.Form = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      middleName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      maidenName: new FormControl('', [Validators.required]),
      otherName: new FormControl('', [Validators.required]),
      genderId: new FormControl('', Validators.required),
      maritalStatusId: new FormControl('', [Validators.required]),
      age: new FormControl(''),
      nativeSpokenLanguage: new FormControl('', [Validators.required]),
      dob: new FormControl('', [Validators.required]),
      emailAddress: new FormControl('', [Validators.required]),
      primaryContactNumber: new FormControl('', [Validators.required]),
      secondaryContactNumber: new FormControl('', [Validators.required]),
      roleName: new FormControl('', [Validators.required]),
      // departmentName: new FormControl('Clinical Trial'),
      description: new FormControl('', [Validators.required]),
      staffCode: new FormControl(''),
      userName: new FormControl(''),
      activeInactive: new FormControl(''),
      blockUnblock: new FormControl(''),
      countryID: new FormControl('', Validators.required),
      state: new FormControl('', [Validators.required]),
      lastLogin: new FormControl('')
    });
  }

  getStaffData() {
    let obj = {
      guid: this.manageStaffList
    }
    this.staffService.GetStaffDetails(obj).subscribe(res => {
      if (res) {
        if (res.statusCode === HttpStatusCode.StatusCode200) {
          this.tempData = res.data;
          this.updateProfile(this.tempData, this.type);
          this.getProfileFile = res.data.profilePicture;
        } else {
          this.notificationService.error(NotificationMessages.invalidError);
        }
      } else {
        this.notificationService.error(NotificationMessages.invalidError);
      }
    })
  }

  updateProfile(item: any, type: any) {
    if (type == 'View') {
      this.Form.disable();
      this.IsViewOnly = false;
      this.isStateDisabled = true;
    } else {
      this.isEdit = true;
      this.isStateDisabled = false;     
    }

    this.masterService.GetState(item.countryID).subscribe((result: any) => {
      if (result != null) {
        this.StateList = result.data;
      }
    })
    this.Form.patchValue({
      firstName: item?.firstName,
      middleName: item?.middleName,
      lastName: item?.lastName,
      maidenName: item?.maidenName,
      otherName: item?.otherName,
      genderId: item?.genderId == 0 ? '' : item?.genderId,
      maritalStatusId: item?.maritalStatusId,
      age: item?.age,
      nativeSpokenLanguage: item?.nativeSpokenLanguage,
      dob: this.formatDate(item?.dob),
      emailAddress: item?.email,
      primaryContactNumber: item?.primaryContactNumber,
      secondaryContactNumber: item?.secondaryContactNumber,
      roleName: item?.roleName,
      description: item?.description,
      staffCode: item?.staffCode,
      userName: item?.userName,
      blockUnblock: item?.isBlocked == true ? 'Block' : 'Unblock',
      activeInactive: item?.isActive == true ? 'Active' : 'Inactive',
      lastLogin: moment(new Date()).format('MMMM Do YYYY, h:mm:ss a'),
      countryID: item?.countryID  == 0 ? '' : item?.countryID,
      state: item?.stateName,
    })    
    this.isUploadForProfile = true;
    this.isUploaddoneForProfile = false;
    this.imagePreviewForProfile = item?.profilePictureBase64;
  }

  selectFile(e: any) {
    if (this.commonService.isValidFileType(e.target.files[0].name, "image")) {
      if (e.target.files[0].size > 500000) {
        this.notificationService.error(NotificationMessages.profileSizeError);
        return
      }
      this.multiFileListForProfile = [];
      let fileExtension = e.target.files[0].name.split('.').pop().toLowerCase();
      var input = e.target;
      var reader = new FileReader();
      reader.onload = () => {
        this.dataURL = reader.result;
        this.fileList = this.dataURL;
        this.ext = fileExtension;
        this.multiFileListForProfile.push({
          fileName: this.fileList,
          fileExtension: this.ext,
          fileType: 'image'
        });
        this.isUploadForProfile = true;
        this.isUploaddoneForProfile = false;
        this.imagePreviewForProfile = this.dataURL;
        this.uploadedfileForProfile = e.target.files[0];
      };
      reader.readAsDataURL(input.files[0]);
    }
    else {
      this.notificationService.error(NotificationMessages.validType);
    }
  }

  onSubmit(type: string) {
    this.submitted = true;
    if (this.Form.invalid) {
      return;
    }
    let obj = {}
    if (type == 'save') {
      obj = {
        firstName: this.Form.value.firstName,
        lastName: this.Form.value.lastName,
        middleName: this.Form.value.middleName,
        maidenName: this.Form.value.maidenName,
        otherName: this.Form.value.otherName,
        genderId: this.Form.value.genderId,
        email: this.Form.value.emailAddress,
        maritalStatusId: 1,
        age: this.Form.value.dob,
        dobDateTime: new Date(this.Form.value.dob),
        dob: this.Form.value.dob,
        primaryContactNumber: this.Form.value.primaryContactNumber,
        secondaryContactNumber: this.Form.value.secondaryContactNumber,
        countryID: this.Form.value.countryID,
        stateName: this.Form.value.state,
        nativeSpokenLanguage: this.Form.value.nativeSpokenLanguage,
        ProfilePicturebase64: this.multiFileListForProfile == undefined ? null : this.multiFileListForProfile[0].fileName,
        userID: this.userId,
        staffGuid: this.userLoggedInAccountId,
        createdByLoginID: 5,
        isEdit: false
      }

    }
    else {
      obj = {
        firstName: this.Form.value.firstName,
        lastName: this.Form.value.lastName,
        middleName: this.Form.value.middleName,
        maidenName: this.Form.value.maidenName,
        otherName: this.Form.value.otherName,
        genderId: this.Form.value.genderId,
        email: this.Form.value.emailAddress,
        maritalStatusId: 1,
        age: this.Form.value.dob,
        dobDateTime: new Date(this.Form.value.dob),
        dob: this.Form.value.dob,
        primaryContactNumber: this.Form.value.primaryContactNumber,
        secondaryContactNumber: this.Form.value.secondaryContactNumber,
        countryID: this.Form.value.countryID,
        stateName: this.Form.value.state,
        nativeSpokenLanguage: this.Form.value.nativeSpokenLanguage,
        profilePicture: this.getProfileFile,
        profilePicturebase64: this.multiFileListForProfile == undefined ? null : this.multiFileListForProfile[0].fileName,
        userID: this.userId,
        staffGuid: this.userLoggedInAccountId,
        createdByLoginID: 5,
        isEdit: true
      }
    }

    this.staffService.UpdateStaffDetails(obj).subscribe(res => {
      if (res) {
        if (res.statusCode === HttpStatusCode.StatusCode200) {
          this.notificationService.success(NotificationMessages.sucessfullySave);
          this.router.navigate([this.routerPath + '/dashboard'])
        } else {
          this.notificationService.error(NotificationMessages.invalidErrorDueToNet);
        }
      } else {
        this.notificationService.error(NotificationMessages.invalidErrorDueToNet);
      }
    })
  }

}
