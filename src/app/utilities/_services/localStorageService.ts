import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { decryption } from 'src/app/shared/genericFunctions/encryptionFun';
import jwt_decode from "jwt-decode";

export interface selectPatientParam {
  id: number,
  mrn: string,
  userId: number,
  fullName: string,
  emailAddress: string,
  telephone: string,
  imgSrc: string,
}

@Injectable()
export class LocalStorageService {

  private userId: any;
  private userName: any;
  private userRoleId: any;
  private EmailAddress: any;
  private ContactNumber: any;
  private StaffId: any;
  private PatientId: any;
  private FullName: any;
  private OrganizationId: any;
  private OrganizationName: any;
  private lastLoginDate: any;
  private seletedPatient: selectPatientParam;
  private accessToken: any;
  private refreshToken: any;
  private rolePermission: any;
  private userType: any;
  private staffName: any;
  private labId: any;
  private pharmacyId: any;
  private providerTypeId: any;
  decryptToken: string;
  sideMenuRolePermission: any;
  orgId: any;
  private csStudyId:any;
  userAccountId: string;
  staffRole: any;
  logo: string;

  constructor(
    private router: Router
  ) {
    this.storeDataInLocalStorageService();
  }

  clear() {
    this._setUserId(null);
    this._setUserName(null);
    //this._setLogo(null);
    this._setUserAccountId(null);
    this._setCheckStaffRole(null);
    this._setOrgId(null);
    this._setUserRoleId(null);
    this._setAccessToken(null);
    this._setRolePermission(null);
    this._setSideMenuRolePermission(null);
  }

  _getUserId(): any {
    this.getUserId();
    if (this.userId == undefined || this.userId == null || this.userId == "") {
      this.userId == 0;
    }
    return this.userId;
  }
  _setUserId(userId: any) {
    this.userId = userId;
  }

  // _getLogo(): any {
  //   this.storeDataInLocalStorageService();
  //   if (this.logo == undefined || this.logo == null || this.logo == "") {
  //     this.logo == "";
  //   }
  //   return this.logo;
  // }
  // _setLogo(logo: any) {
  //   this.logo = logo;
  // }
  _getCheckStaffRole(): any {
    this.storeDataInLocalStorageService();
    if (this.staffRole == undefined || this.staffRole == null || this.staffRole == "") {
      this.staffRole == 0;
    }
    return this.staffRole;
  }

  _setCheckStaffRole(role:any){
    this.staffRole = role;
  }

  _getUserName(): any {
    this.storeDataInLocalStorageService();
    if (this.userName == undefined || this.userName == null || this.userName == "") {
      this.userName == "";
    }
    return this.userName;
  }
  _setUserName(userName: any) {
    this.userName = userName;
  }

  _getUserAccountId(): any {
    this.storeDataInLocalStorageService();
    if (this.userAccountId == undefined || this.userAccountId == null || this.userAccountId == "") {
      this.userAccountId == "";
    }
    return this.userAccountId;
  }
  _setUserAccountId(userAccountId: any) {
    this.userAccountId = userAccountId;
  }

  _getOrgId(): any {
    this.getOrganizationId();
    if (this.orgId == undefined || this.orgId == null || this.orgId == "") {
      this.orgId == 0;
    }
    return this.orgId;
  }
  _setOrgId(organizaitonID: any) {
    this.orgId = organizaitonID;
  }
 
  _getUserRoleId(): any {
    this.getUserRoleId();
    if (this.userRoleId == undefined || this.userRoleId == null || this.userRoleId == "") {
      this.userRoleId == 0;
    }
    return this.userRoleId;
  }
  _setUserRoleId(userRoleId: any) {
    this.userRoleId = userRoleId;
  }

  _getAccessToken(): any {
    this.storeDataInLocalStorageService();
    return this.accessToken;
  }
  _setAccessToken(accessToken: any) {
    this.accessToken = accessToken;
  }
  _getRolePermission(): any {
    this.getMenuListPermissions();
    return this.rolePermission;
  }
  _setRolePermission(rolePermission: any) {
    this.rolePermission = rolePermission;
  }

  _getSideMenuRolePermission(): any {
    this.getMenuListRolePermissions();
    return this.sideMenuRolePermission;
  }
  _setSideMenuRolePermission(sideMenuRolePermission: any) {
    this.sideMenuRolePermission = sideMenuRolePermission;
  }

  _setClinicalStudyData(studyId:any){
    
    this.csStudyId =  studyId;
  }


  _getClinicalStudyData():any{
    return this.csStudyId;
  }
  storeDataInLocalStorageService() {
    let encryptedtoken:any = localStorage.getItem("NewShadow");
    if (encryptedtoken != null){
      encryptedtoken = encryptedtoken ? encryptedtoken : sessionStorage.getItem('NewShadow');
        if (encryptedtoken != null) {
        this.decryptToken = decryption(encryptedtoken);  
        let decodedToken:any = jwt_decode(this.decryptToken);
        console.log(decodedToken);
        let token = JSON.stringify(this.decryptToken);
        let objtoken: any = JSON.parse(token);
        this._setAccessToken(objtoken.AccessToken);
        this._setUserName(decodedToken.FullName);
        //this._setLogo(decodedToken.Logo);
        this._setUserAccountId(decodedToken.AccountId);
        this._setCheckStaffRole(decodedToken.IsStaff);
      }
    }
  }

  getMenuListPermissions(){
    let encryptedtokenMenu = localStorage.getItem("NewShadowMenu");
    if (encryptedtokenMenu != null) {
      encryptedtokenMenu = encryptedtokenMenu ? encryptedtokenMenu : sessionStorage.getItem('NewShadowMenu');
      if (encryptedtokenMenu != null) {
        this.decryptToken = decryption(encryptedtokenMenu);  
        let token = JSON.stringify(this.decryptToken);
        let objtoken: any = JSON.parse(token);
        objtoken = JSON.parse(objtoken)
        this._setRolePermission(objtoken);
      }
    }
  }

  getMenuListRolePermissions(){
    let encryptedtokenMenu = localStorage.getItem("NewShadowActionMenu");
    if (encryptedtokenMenu) {
      encryptedtokenMenu = encryptedtokenMenu ? encryptedtokenMenu : sessionStorage.getItem('NewShadowActionMenu');
      if (encryptedtokenMenu != null) {
        this.decryptToken = decryption(encryptedtokenMenu);  
        let token = JSON.stringify(this.decryptToken);
        let objtoken: any = JSON.parse(token);
        let finalValue: any = JSON.parse(objtoken);
        this._setSideMenuRolePermission(finalValue);
      }
    }
  }

  getUserId(){
    let encryptedtokenID = localStorage.getItem("shadowID");
    if (encryptedtokenID != null) {
      this.decryptToken = decryption(encryptedtokenID); 
      this._setUserId(this.decryptToken);
    }
  }

  getUserRoleId(){
    let encryptedtokenDomainID:any = localStorage.getItem("shadowDomainID");
    if (encryptedtokenDomainID != null) {
      this.decryptToken = encryptedtokenDomainID == 0 ? "0" : decryption(encryptedtokenDomainID); 
      this._setUserRoleId(this.decryptToken);
    }
  }

  getOrganizationId(){
    let encryptedtokenOrganizationId:any = localStorage.getItem("OrganizationID");
    if (encryptedtokenOrganizationId != null) {
      this.decryptToken = encryptedtokenOrganizationId == 0 ? "0" : encryptedtokenOrganizationId; 
      this._setOrgId(this.decryptToken);
    }
  }
  
}