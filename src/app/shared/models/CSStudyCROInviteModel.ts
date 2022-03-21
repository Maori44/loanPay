import { DocumentCenterFileModel } from "./DocumentCenterFileModel";

export class CSStudyCROInviteModel {
    CSStudyStudyID:number; 
    csGuiD:any;
    SponsorID:number
    CROList:Array<any>
    FileModel:Array<DocumentCenterFileModel>;
    InviteMessage:string;  
}