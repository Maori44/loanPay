import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { I18nModule } from '../utilities/_helper/i18n/i18n.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AdvancedTableComponent } from './components/advanced-table/advanced-table.component';
import { HeaderComponent } from './components/header/header.component';
import { SelectLanguageComponent } from './components/select-language/select-language.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { DataPropertyGetterPipe } from './pipes/DataPropertyGetterPipe.pipe';
import { ControlMessagesComponent } from './validators/validation-message.component';
import { FooterComponent } from './components/footer/footer.component';
import { AvatarModule } from 'ngx-avatar';
import { RouterModule } from '@angular/router';
import {NgxPaginationModule} from 'ngx-pagination';
import { FormatTimePipe } from './pipes/formatTime.pipe';
import { MobilePhoneDirective } from './directives/MobilePhoneDirective.directive';
import { ManageListComponent } from './components/manage-list/manage-list.component';
import { SortDirective } from './directives/NgbdSortableHeader.directive';
import { LocalStorageService } from '../utilities/_services/localStorageService';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { DocumentUploadComponent } from './components/document-upload/document-upload.component';
import { ManageDocumentCenterComponent } from './components/manage-document-center/manage-document-center.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { DocumentListComponent } from './components/document-list/document-list.component';
import { DocumentUploadEditComponent } from './components/document-upload-edit/document-upload-edit.component';
import { ProfileStaffViewComponent } from './components/profile-staff-view/profile-staff-view.component';
import { InvitesComponent } from './components/invites/invites.component';
import { StudySummaryViewComponent } from './components/study-summary-view/study-summary-view.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ClinicalInviteListingComponent } from './components/clinical-invite-listing/clinical-invite-listing.component';
import { PageUnderConstructionComponent } from './components/page-under-construction/page-under-construction.component';
import { AdvancedLisitingComponent } from './components/advanced-lisiting/advanced-lisiting.component';
import { ListingViewComponent } from './components/listing-view/listing-view.component';
import { DetailedStudySummaryViewComponent } from './components/detailed-study-summary-view/detailed-study-summary-view.component';
import { InviteStatusComponent } from './components/invite-status/invite-status.component';
import { ProfileUserViewComponent } from './components/profile-user-view/profile-user-view.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';


@NgModule({
  declarations: [
    HeaderComponent,
    SideBarComponent,
    SelectLanguageComponent,
    ControlMessagesComponent,
    AdvancedTableComponent,
    DataPropertyGetterPipe,
    FooterComponent,
    FormatTimePipe,
    MobilePhoneDirective,
    ManageListComponent,
    SortDirective,
    ConfirmDialogComponent,
    DocumentUploadComponent,
    ManageDocumentCenterComponent,
    DocumentListComponent,
    DocumentUploadEditComponent,
    ProfileStaffViewComponent,
    InvitesComponent,
    StudySummaryViewComponent,
    ClinicalInviteListingComponent,
    PageUnderConstructionComponent,
    AdvancedLisitingComponent,
    ListingViewComponent,
    DetailedStudySummaryViewComponent,
    InviteStatusComponent,
    ProfileUserViewComponent,
  
  ],
  imports: [
    CommonModule,
    NgxIntlTelInputModule,
    FormsModule,
    NgSelectModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
    I18nModule,
    AvatarModule,
    NgxPaginationModule,
    BsDropdownModule.forRoot(),
    AccordionModule.forRoot(),
    TabsModule.forRoot(),
  ],
  exports: [
    SelectLanguageComponent,
    NgxIntlTelInputModule,
    ManageListComponent,
    ControlMessagesComponent,
    AdvancedTableComponent,
    DataPropertyGetterPipe,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    I18nModule,
    AvatarModule,
    HeaderComponent,
    SideBarComponent,
    FooterComponent,
    FormatTimePipe,
    NgxPaginationModule,
    MobilePhoneDirective,
    SortDirective,
    ConfirmDialogComponent,
    DocumentUploadComponent,
    ManageDocumentCenterComponent,
    DocumentListComponent,
    DocumentUploadEditComponent,
    ProfileStaffViewComponent,
    InvitesComponent,
    StudySummaryViewComponent,
    ClinicalInviteListingComponent,
    AdvancedLisitingComponent,
    ListingViewComponent,
    DetailedStudySummaryViewComponent,
    InviteStatusComponent,ProfileUserViewComponent
  ],
  providers: [LocalStorageService],
  entryComponents: [
    ConfirmDialogComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class SharedModule {}
