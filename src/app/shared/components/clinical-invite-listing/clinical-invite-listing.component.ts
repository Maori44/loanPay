import { SponsorService } from 'src/app/utilities/_services/sponsor.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { routerLinks } from 'src/app/shared/constants/routerLinks';
import { CROService } from 'src/app/utilities/_services/cro.service';
import { LocalStorageService } from 'src/app/utilities/_services/localStorageService';
import { encryption } from '../../genericFunctions/encryptionFun';
import { HttpStatusCode } from '../../models/HttpStatusCode';
import { sponsorConstant } from '../../constants/sponsorConstant';
import { NotificationService } from 'src/app/utilities/_services/notification.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { NotificationMessages } from '../../constants/notificationMessages';
import { FormControl, FormGroup } from '@angular/forms';
import { result } from 'lodash';


@Component({
  selector: 'clinical-invite-listing',
  templateUrl: './clinical-invite-listing.component.html',
  styleUrls: ['./clinical-invite-listing.component.css']
})
export class ClinicalInviteListingComponent implements OnInit {
  @Input() loginUserId: any;
  @Input() studyList: any;
  @Input() csStudyID: any;
  @Input() csGUID: any;
  @Input() csSponserId: any;
  @Input() csCroId: any;
  studyListData: any;
  isInvitationAccepted: boolean = false;
  croInfo: any;
  SearchForm: FormGroup;
  tempData: any;
  studyData: any;
  filteredStudyList: any;

  constructor(private router: Router, private croService: CROService, private sponsorService: SponsorService, private notificationService: NotificationService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    if (this.loginUserId != null || this.loginUserId != undefined) {
      this.getStudyListByCROID(this.loginUserId);
    }

    this.init();
  }


  init(): void {
    this.SearchForm = new FormGroup({
      csTitle: new FormControl(''),
      csCode: new FormControl(''),
      sponsorName: new FormControl(''),
      organizationName: new FormControl(''),
      croName: new FormControl('')
    });
  }


  showCSStudyDetails(CSGUID: any) {
    let EncryptedID = encryption(CSGUID)
    this.router.navigate([routerLinks.publicStudyView, EncryptedID]);
  }



  getStudyListByCROID(id: any) {
    this.croService.GetStudyListByCROId(id).subscribe((res: any) => {
      if (res) {
        if (res.statusCode === HttpStatusCode.StatusCode200) {
          if (res) {
            this.studyListData = res.data;
            if (res.data.length > 0) {
              this.filterData(this.studyListData);
            }
          } else {
            this.notificationService.error(NotificationMessages.invalidErrorDueToNet);
          }
        } else {
          this.notificationService.error(NotificationMessages.invalidError);
        }
      }
    })
  }

  filterData(data: any) {
    for (let index = data.length-1; index >=0; index--) {
      const element = data[index];
      const csCode = 'CTS-00' + element.csStudyID;     
      if (element.sponsorID == this.csSponserId && element.csCode == csCode) {
        this.SearchForm.patchValue({ sponsorName: element.sponsorName });
        this.SearchForm.patchValue({ organizationName: element.organizationName })
        this.SearchForm.patchValue({ croName: element.croName })   
        this.SearchForm.patchValue({ csCode: element.csCode })     
        this.searchStudyList();
      }
    }
  }


  acceptInvitation(croId: any, sponsorId: any, csStudyId: any, comment: any) {
    if ((croId !== null || croId !== undefined) && (sponsorId !== null || sponsorId !== undefined) && (csStudyId !== null || csStudyId !== undefined)) {
      var AcceptCSInviteModel = {
        CROID: croId,
        SponsorID: sponsorId,
        CSStudyID: csStudyId,
        ISAccept: true,
        Comment: comment
      }
      this.sponsorService.SendCROInvitationAcceptenceStatusForStudy(AcceptCSInviteModel).subscribe(result => {
        if (result) {
          if (result.statusCode === HttpStatusCode.StatusCode200) {
            this.notificationService.success(sponsorConstant.sendCROStudyInvitationAcceptanceStatus);
          }
        }
      });


    }
  }


  confirmAcceptDialog(croId: any, sponsorId: any, csStudyId: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '600px',
      data: {
        header: 'Confirm',
        message: 'Are you sure, Do you want to accept this invitation?',
        commentShow: true
        //confirmButtonShow:true
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.acceptInvitation(croId, sponsorId, csStudyId, result.data);
        this.router.navigate([routerLinks.underConstructionPage]);
      }
    });

  }

  declinedInvitation(croId: any, sponsorId: any, csStudyId: any) {
    this.confirmDialog(croId, sponsorId, csStudyId);
  }


  confirmDialog(croId: any, sponsorId: any, csStudyId: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '600px',
      data: {
        header: 'Confirm',
        message: 'Are you sure, Do you want to decline this invitation?',
        confirmButtonShow: true,
        commentShow: true
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let acceptCSInviteModelObj = {
          CROID: croId,
          SponsorID: sponsorId,
          CSStudyID: csStudyId,
          ISAccept: false,
          Comment: result.data
        }
        console.log(acceptCSInviteModelObj);
        this.sponsorService.SendCROInvitationAcceptenceStatusForStudy(acceptCSInviteModelObj).subscribe(result => {
          if (result) {
            if (result.statusCode === HttpStatusCode.StatusCode200) {
              this.notificationService.success(sponsorConstant.sendCROStudyInvitationAcceptanceStatus);
              this.getStudyListByCROID(this.loginUserId);
            }

          }
        });

        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          width: '600px',
          data: {
            header: 'Information',
            message: 'Thank you for your confirmation.',
            confirmButtonShow: false
          },
        });
        dialogRef.afterClosed().subscribe(result => { });
      }
    });

  }

  redirectRouteLink() {
  }


  getDefaultStudyListByCROID(id: any) {
    this.croService.GetStudyListByCROId(id).subscribe((res: any) => {
      if (res) {
        if (res.statusCode === HttpStatusCode.StatusCode200) {
          if (res) {
            this.studyListData = res.data;
          } else {
            this.notificationService.error(NotificationMessages.invalidErrorDueToNet);
          }
        } else {
          this.notificationService.error(NotificationMessages.invalidError);
        }
      }
    })
  }

  searchStudyList() {

    let studyObj = {
      CROID: this.loginUserId == '' ? 0 : this.loginUserId,
      CSTitle: this.SearchForm.value.csTitle == '' ? '' : this.SearchForm.value.csTitle,
      CSCode: this.SearchForm.value.csCode == '' ? '' : this.SearchForm.value.csCode,
      OrganizationName: this.SearchForm.value.organizationName == '' ? '' : this.SearchForm.value.organizationName,
      SponsorName: this.SearchForm.value.sponsorName == '' ? '' : this.SearchForm.value.sponsorName,
      CROName: this.SearchForm.value.croName == '' ? '' : this.SearchForm.value.croName
    }

    this.croService.SearchStudyList(studyObj).subscribe(res => {
      if (res) {
        if (res.statusCode === HttpStatusCode.StatusCode200) {
          this.studyListData = res.data;
          if (this.studyListData.length > 0) {
            this.studyListData.array.forEach((element: { sponsorName: any; }) => {
              this.SearchForm.patchValue({ sponsorName: element.sponsorName })
            });
          }
          if (res.data.length == 0) {
            this.studyListData = null;
          }
        } else {
          this.notificationService.error(NotificationMessages.invalidErrorDueToNet);
        }
      } else {
        this.notificationService.error(NotificationMessages.invalidError)
      }
    })
  }

  clear() {
    this.SearchForm.reset();
    if (this.loginUserId != null || this.loginUserId != undefined) {
      this.getDefaultStudyListByCROID(this.loginUserId);
    }
  }


  // urlRedirect(){
  //   this.router.navigate(['sponsor/dashboard']) 
  // }

}


