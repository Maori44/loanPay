import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loan-offer',
  templateUrl: './loan-offer.component.html',
  styleUrls: [
    './loan-offer.component.scss',
    '../sign-in/sign-in.component.scss',
  ],
})
export class LoanOfferComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  upload() {
    let element: HTMLElement = document.querySelector(
      'input[type="file"]'
    ) as HTMLElement;
    element.click();
  }

  importFile(event: any) {
    if (event.target.files.length == 0) {
      console.log('No file selected!');
      return;
    }
    let file: File = event.target.files[0];
    console.log(file);
    
    // after here 'file' can be accessed and used for further process
  }
}
