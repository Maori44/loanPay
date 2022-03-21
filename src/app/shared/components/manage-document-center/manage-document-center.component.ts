import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-document-center',
  templateUrl: './manage-document-center.component.html',
  styleUrls: ['./manage-document-center.component.css']
})
export class ManageDocumentCenterComponent implements OnInit {
  oneAtATime = true;
  initialOpen = true;
  tempItem = [0, 0, 0, 0, 0];

  @Input() organizationId: any;


  constructor() { }

  ngOnInit(): void { }
}

