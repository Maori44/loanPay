import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/utilities/_services/app.service';
import { CommonService } from 'src/app/utilities/_services/common.service';
import { LocalStorageService } from 'src/app/utilities/_services/localStorageService';
import { routerLinks } from '../../constants/routerLinks';
import { encryption } from '../../genericFunctions/encryptionFun';
import { SidebarService } from '../side-bar/sidebar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [SidebarService],
})
export class HeaderComponent implements OnInit {

  inputVisible = false;
  loggedInUserName: any;
  loggedInUserAccountId: any;
  checkStaffRole: any;
  routerPath: string;
  logo: any;

  constructor(private sidebarService: SidebarService,
    private appService: AppService,
    private router: Router,
    private commonService: CommonService,
    private localStorage: LocalStorageService) { }

  ngOnInit(): void {
    this.loggedInUserName = this.localStorage._getUserName();
    this.loggedInUserAccountId = this.localStorage._getUserAccountId();
    this.checkStaffRole = this.localStorage._getCheckStaffRole();
    this.routerPath = this.commonService.getRouterPath();
    //this.logo = this.localStorage._getLogo();
  }

  inputSrchHandler() {
    this.inputVisible = true;
    this.sidebarService.isVisible(!this.sidebarService.visible);
  }

  editProfile(staffRole: any) {
    let EncryptedID = encryption(this.loggedInUserAccountId)
      //alert(staffRole);
    if (staffRole == 'True') {
     
      this.router.navigate([this.routerPath + '/view-staff-profile', EncryptedID, 'Edit']);
    }
    else if ((staffRole == 'false') || (staffRole == 'False')) {
      this.router.navigate([this.routerPath + '/view-profile', EncryptedID, 'Edit']);
    }

  }

  logout() {
    this.appService.setUserLoggedIn(false);
    this.localStorage.clear();
    localStorage.clear();
    if (this.router.url.includes('/sponsor')) {
      this.router.navigate(['/sponsor/sign-in'])
    }
    else if (this.router.url.includes('/cro')) {
      this.router.navigate(['/cro/sign-in'])
    }
    else {
      this.router.navigate(['/superadmin/sign-in'])
    }
  }
}
