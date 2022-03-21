import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-advanced-lisiting',
  templateUrl: './advanced-lisiting.component.html',
  styleUrls: ['./advanced-lisiting.component.scss']
})
export class AdvancedLisitingComponent implements OnInit {

  @Input() tableConfig: any;
  @Input() tempData: any;
  @Output() onTableActionClick = new EventEmitter();

  IsSearch: boolean = false;
  IsDropdown : boolean = true;

  constructor() { }

  ngOnInit() {}

  onTableClick(action: any,item: any) {
    let obj = {
      action : action.actionIdToReturn,
      data : item
    }
    this.onTableActionClick.emit(obj);
  }

}
