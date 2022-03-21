import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { CommonModule } from '@angular/common';
import { ActivationComponent } from './activation/activation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoanOfferComponent } from './loan-offer/loan-offer.component';
import { RegistrationComponent } from './registration/registration.component';

@NgModule({
  imports: [CommonModule,SharedModule,AuthRoutingModule],
  declarations: [
    SignInComponent,
    ActivationComponent,
    DashboardComponent,
    LoanOfferComponent,
    RegistrationComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AuthModule {}
