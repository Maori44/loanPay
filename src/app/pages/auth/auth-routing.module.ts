
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ActivationComponent } from './activation/activation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoanOfferComponent } from './loan-offer/loan-offer.component';
import { RegistrationComponent } from './registration/registration.component';
import { SignInComponent } from './sign-in/sign-in.component';


const appRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'sign-in',
        component: SignInComponent,
      },
      {
        path: 'activation',
        component: ActivationComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'loan',
        component: LoanOfferComponent,        
      },
      {
        path: 'registration',
        component: RegistrationComponent,        
      },
      {
        path: '',
        redirectTo: 'sign-in',
      }     
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
