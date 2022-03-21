export class InviteModel {
    Name: string; //full name
    Code?: string; //null for Study
    Address: string;   //cro address or study address                 
    Location :string ;  //For CRO : - Address +City + Country ; For Study: - Study Location Name   
    Status:string ; //Active or Inactive
}