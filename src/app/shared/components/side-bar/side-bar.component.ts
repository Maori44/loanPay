import { Component, OnInit, HostListener, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/utilities/_services/app.service';
import { LocalStorageService } from 'src/app/utilities/_services/localStorageService';
import { decryption } from '../../genericFunctions/encryptionFun';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
  providers: [SidebarService],
})
export class SideBarComponent implements OnInit {
  visible = true;
  @Output() sidebarItem = new EventEmitter<string>();
  sideMenuList: any;
  constructor(private SidebarService: SidebarService, private appService: AppService, private router: Router,private localStorage: LocalStorageService) { }

  ngOnInit(): void {
    this.getRoleSideMenuPermission();
  }

  sidebarHandler() {
    this.SidebarService.isVisible(!this.visible);
  }

  toggleMenus(e:any) {
    e.target.closest('.left-menu-link').nextSibling.classList.toggle('expanded');
    e.target.closest('.left-menu-link').classList.toggle('active');
  }

  getRoleSideMenuPermission() {
    let menuList = localStorage.getItem("NewShadowMenu");
    menuList = menuList ? menuList : sessionStorage.getItem('NewShadowMenu');
    menuList = decryption(menuList);
    this.sideMenuList = JSON.parse(menuList);
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

  navigation(route: any, value: string) {
    if (route != "null") {
      this.router.navigateByUrl(route);
    } else {
      this.router.navigateByUrl(this.router.url);      
    }
    localStorage.removeItem('headerTitle');
    this.sidebarItem.emit(value);
  }

  pool(){
    this.router.navigate(['/clinical-pool/find-study']) 
  }
  
  
}
