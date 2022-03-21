import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listing-view',
  templateUrl: './listing-view.component.html',
  styleUrls: ['./listing-view.component.css']
})
export class ListingViewComponent implements OnInit {

  @Input() tempData:any;
  @Output() onTableActionClick = new EventEmitter();
  constructor(private router:Router) { }

  ngOnInit() {
  }

  onTableClick(data:any,action: any) {
    let obj = {
      data: data,
      action: action
    }
    this.onTableActionClick.emit(obj);
  }
}
