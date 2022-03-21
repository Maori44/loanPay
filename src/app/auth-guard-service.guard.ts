import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardServiceGuard implements CanActivate {

  constructor(private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let UserLoggedIn: any = localStorage.getItem('UserLoggedIn');
    if (UserLoggedIn == "false" || UserLoggedIn == undefined || UserLoggedIn == null || UserLoggedIn == false) {
      if(route.routeConfig?.path=='user'){
        this.router.navigate(['/superadmin/sign-in']);
      }
      else if(route.routeConfig?.path=='sponsor'){
        this.router.navigate(['/sponsor/sign-in']);
      }
      else if(route.routeConfig?.path=='cro'){
        this.router.navigate(['/cro/sign-in']);
      }
    }
    return true;
  }

}
