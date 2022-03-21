import { SponsorService } from 'src/app/utilities/_services/sponsor.service';

import { Component, OnInit  ,Input} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { NotificationMessages } from 'src/app/shared/constants/notificationMessages';
import { routerLinks } from 'src/app/shared/constants/routerLinks';
import { StudyConstant } from 'src/app/shared/constants/studyConstant';
import { encryption } from 'src/app/shared/genericFunctions/encryptionFun';
import { HttpStatusCode } from 'src/app/shared/models/HttpStatusCode';
import { LocalStorageService } from 'src/app/utilities/_services/localStorageService';
import { NotificationService } from 'src/app/utilities/_services/notification.service';
import { StudyService } from 'src/app/utilities/_services/study.service';

@Component({
  selector: 'invite-status',
  templateUrl: './invite-status.component.html',
  styleUrls: ['./invite-status.component.css']
})
export class InviteStatusComponent implements OnInit {

  @Input() loginUserId: any;
  @Input() croInformation: any[] = [];
  @Input() studyId: any;
  @Input() csStudyCode: any;

  Form: FormGroup;
  tempData: any;
  inviteStatusData:any;
  constructor(private router: Router,
    public dialog: MatDialog,
    private studyService: StudyService, private sponsorService:SponsorService,
    private notificationService: NotificationService, private localStorageService:LocalStorageService) { }

  ngOnInit(): void {   
    if(this.loginUserId!=null || this.loginUserId!=undefined){
      this.getInviteStatusBySponsorId(this.loginUserId);
    }   
  }

  getInviteStatusBySponsorId(id:any){ 
      this.sponsorService.GetInviteStatusBySponsorId(id,this.csStudyCode).subscribe(res => {
        if (res) {
          if (res.statusCode === HttpStatusCode.StatusCode200) {          
            this.inviteStatusData = res.data;
          } else {
            this.notificationService.error(NotificationMessages.invalidErrorDueToNet);
          }
        } else {
          this.notificationService.error(NotificationMessages.invalidError);
        }
      })
  }

  upLoadConsent(croStudyInviteID:any,sponsorId:any,csStudyId:any){    
    var uploadConsentString = 'croStudyInviteId=' +croStudyInviteID + "$"+'sponsorId='+sponsorId + "$"  +'csStudyId='+csStudyId;
    let EncryptedID = encryption(uploadConsentString)
      this.router.navigate([routerLinks.sponsorUploadConsent, EncryptedID, "Id"]);
    }

}
