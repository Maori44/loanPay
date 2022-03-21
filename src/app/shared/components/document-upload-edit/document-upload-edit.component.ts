import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationMessages } from 'src/app/shared/constants/notificationMessages';
import { OrganizationConstantFile } from 'src/app/shared/constants/organizationConstant';
import { routerLinks } from 'src/app/shared/constants/routerLinks';
import { decryption } from 'src/app/shared/genericFunctions/encryptionFun';
import { HttpStatusCode } from 'src/app/shared/models/HttpStatusCode';
import { ValidationService } from 'src/app/shared/validators/validation.service';
import { CommonService } from 'src/app/utilities/_services/common.service';
import { LocalStorageService } from 'src/app/utilities/_services/localStorageService';
import { MasterService } from 'src/app/utilities/_services/master.service';
import { NotificationService } from 'src/app/utilities/_services/notification.service';
import { documentCenterConstant } from '../../constants/documentCenterConstant';
import { DocumentCenterModel } from '../../models/DataCenterModel';
import { DocumentCenterFileModel } from '../../models/DocumentCenterFileModel';
import { SelectOptionModel } from '../../models/selectOptionModel';
import { DocumentCenterDataService } from '../../services/document-center-data.service';
import { DocumentCenterService } from '../../services/document-center.service';

@Component({
  selector: 'app-document-upload-edit',
  templateUrl: './document-upload-edit.component.html',
  styleUrls: ['./document-upload-edit.component.css']
})
export class DocumentUploadEditComponent implements OnInit {

  @Input() loginUserId: any;

  title:string="Edit Document"
  dataCenterForm: FormGroup;
   submitted: boolean = false;  
   IsViewOnly: boolean = true;  
  dataFileList: any[];
  dataURL: any;
  fileList: any;
  ext: any;
  uploadedfile: any;
  testListForLogo: any[] = [];
  isFileSelected:boolean=false; 

  selectedFile:string="";
  fileExtention : any;
   userId: any;   
   documentCenterFileId:any;
   documentCenterId:any;
   editedDocument:any
   existingDocTitleList:any[]=[];
   isNewDocSelected:boolean=false;
   isExistingSelected:boolean=true;
   selectModel:SelectOptionModel;
   selectModelList:SelectOptionModel[]=[];
   selectExistingDocText:string="";
   selectExistingDocTextValue:number;

   documentCenterIdValue:number;
   selectedDocumentCenterId :number;
   
  // roleDataList:any;
  // selectedRoleId:any;
  
  constructor(private documentCenterService:DocumentCenterService,private commonService:CommonService, private notificationService: NotificationService, private router: Router, private activatedRoute: ActivatedRoute,private masterService: MasterService,private localStorage: LocalStorageService,private dataService:DocumentCenterDataService) {
    this.selectModel = new  SelectOptionModel();
    this.selectModelList = new Array<SelectOptionModel>();
    
   }
  
  ngOnInit() {
    // this.isNewDocSelected=true;
    this.documentCenterIdValue = this.dataService.getdata();        
    this.isExistingSelected=true;  
    this.userId = this.localStorage._getUserId(); 
    this.activatedRoute.paramMap.subscribe(params => {
      this.editedDocument = params.get('Id');     
      if (this.editedDocument) {
        this.editedDocument = decryption(this.editedDocument);
      }
    });
    this.getExistingDocumentTitleListById(this.userId);
    this.init(); 
  }  
  
  init() { 
    this.dataCenterForm = new FormGroup({ 
     existingDocTitleSelect:new FormControl(''),      
      browseFile:new FormControl('', [Validators.required]),
      leaveComment: new FormControl('', [Validators.required]),    
    });
    
  }

  selectExistingDocTitle(event:any){
    if (event) {
      if (event.target.value) {
          this.selectExistingDocText = event.target.options[event.target.options.selectedIndex].text;
          this.selectExistingDocTextValue =event.target.value;
      }
  }
}

  changeSelectedDocumentType(event:any){

    if(event.target.value=="newDocTitle")
    {      
      this.isNewDocSelected=true;
      this.isExistingSelected=false;     
       
    
    }
    else if(event.target.value=="existingDocTitle"){    
 
      this.isNewDocSelected=false;
      this.isExistingSelected=true;
    } 
  }

  getExistingDocumentTitleListById(id:any){
    
    this.documentCenterService.GetExistingDocumentTitlesById(id).subscribe((res:any)=>{
      if(res){
        if (res.statusCode === HttpStatusCode.StatusCode200) {
          if (res.data.length > 0) {           
           // console.log(res.data);
            this.existingDocTitleList = res.data; 
            //console.log(this.existingDocTitleList);         
            this.existingDocTitleList.forEach(element => {
                if(element.documentCenterId==this.documentCenterIdValue){
                  this.selectExistingDocText = element.documentTitle;
                  this.selectExistingDocTextValue = this.documentCenterIdValue;                  
                }
              });      
          }
      }
    }
    })

  }


  selectFile(e: any) {
    if ((this.commonService.isValidFileType(e.target.files[0].name.toLowerCase(),"text"))||(this.commonService.isValidFileType(e.target.files[0].name.toLowerCase(), "word")) || (this.commonService.isValidFileType(e.target.files[0].name.toLowerCase(), "excel")) || (this.commonService.isValidFileType(e.target.files[0].name.toLowerCase(), "pdf")) || (this.commonService.isValidFileType(e.target.files[0].name.toLowerCase(), "image")) || (this.commonService.isValidFileType(e.target.files[0].name.toLowerCase(),"csv"))) {
      if(e.target.files[0].size> 4194304)
          {
            this.notificationService.error(NotificationMessages.dataFileSizeError);   
            return;        
          }
          else if((e.target.files[0].size>0) && (e.target.files[0].size <= 4194304))
          {
            this.isFileSelected=true;         
            this.selectedFile = e.target.files[0].name;
            this.dataFileList = [];
            let fileExtension = e.target.files[0].name.split('.').pop().toLowerCase();
            var input = e.target;
            var reader = new FileReader();
            reader.onload = () => {
              this.dataURL = reader.result;
              this.fileList = this.dataURL;
              this.ext = fileExtension;
              this.dataFileList.push({
                fileName: this.fileList,
                fileExtension: this.ext,
                fileType: e.target.files[0].name.toLowerCase()          
              });
              
            };
            reader.readAsDataURL(input.files[0]);
          }

    }
    else {
      this.notificationService.error(NotificationMessages.validType);
    }
  }


  urlRedirect(){
   
    if (this.router.url.includes('/sponsor')) {      
      this.router.navigate(['/sponsor/document-center/add-document'])    
    } 
     else if (this.router.url.includes('/cro')) {
      this.router.navigate(['/cro/document-center/add-document'])   
    }
    else if (this.router.url.includes('/principal-investigator')) {
      this.router.navigate(['principal-investigator/document-center/add-document'])   
    }  
  }

  urlBackRedirect(){
    if (this.router.url.includes('/sponsor')) {
      this.router.navigate(['sponsor/document-center/document-listing'])    
    } 
     else if (this.router.url.includes('/cro')) {
      this.router.navigate(['cro/document-center/document-listing'])   
    }
    else if (this.router.url.includes('/principal-investigator')) {
      this.router.navigate(['principal-investigator/document-center/document-listing'])   
    }  
  }


  
  onSubmit() {  

    this.submitted = true;
    if (this.dataCenterForm.invalid) {     
      return;
    }  
    else{
      if(this.isExistingSelected==true){ 
      let documentObj: DocumentCenterModel = new DocumentCenterModel();
      documentObj.FileModel = new DocumentCenterFileModel(); 
      documentObj.DocumentTitle = this.selectExistingDocText;
      documentObj.DocumentCenterId=this.selectExistingDocTextValue;
      documentObj.CreatedBy = this.loginUserId;      
      documentObj.FileModel.OriginalFileNameBase64=this.dataFileList == undefined ? null : this.dataFileList[0].fileName,
      documentObj.FileModel.OriginalFileName=this.selectedFile;
      documentObj.FileModel.SaveFileName = "";
      documentObj.FileModel.FileExtension = this.dataFileList[0].fileExtension;
      documentObj.FileModel.CommentText = this.dataCenterForm.value.leaveComment;
      documentObj.FileModel.FileVersion = 0;
      documentObj.FileModel.FileUploadedBy= this.loginUserId;
      documentObj.FileModel.FileDownloadLink = "";
      documentObj.FileModel.CreatedBy = this.loginUserId;


      this.documentCenterService.SaveData(documentObj).subscribe(result => {
        if (result) {
          if (result.statusCode === HttpStatusCode.StatusCode200) {
            this.documentCenterId = result.data.documentCenterId;
            this.documentCenterFileId = result.data.documentCenterFileId;
           this.notificationService.success(documentCenterConstant.documentIsCreated);
            this.dataCenterForm.reset();  
            this.dataCenterForm.valid;         
            if (this.router.url.includes('/sponsor')) {
              this.router.navigate(['sponsor/document-center/document-listing'])    
            } 
             else if (this.router.url.includes('/cro')) {
              this.router.navigate(['cro/document-center/document-listing'])   
            }
            else if (this.router.url.includes('/principal-investigator')) {
              this.router.navigate(['principal-investigator/document-center/document-listing'])   
            }              
          } else {
           // this.notificationService.error(NotificationMessages.businessNameUniquename)
          }
        } else {
          this.notificationService.error(NotificationMessages.invalidError)
        }
      })   

      }

       
      
    }
  }
  }