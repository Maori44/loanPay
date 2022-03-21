import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DocumentCenterDataService {
sharedData:any;
  constructor() { }

  getdata():any{
    return this.sharedData
  }

  setData(value:any){
    this.sharedData=value;
  }
}
