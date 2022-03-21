import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { clickableColumns } from '../../models/clickableColumns';
import { editColumnEventDetails } from '../../models/editColumnEventDetails';

function CustomPaginator() {
  const customPaginatorIntl = new MatPaginatorIntl();
  customPaginatorIntl.itemsPerPageLabel = 'Records per page:';
  return customPaginatorIntl;
}

export interface ClickableColumnsReference {
  obj: any;                        // this will have data for column of type clickableColumns $$..
  clickable: boolean;              // if true then show this column with icon $$..
}

export class metaData {
  searchText?: string = '';
  pageIndex: number = 1;
  pageSize: number = 10;
  defaultPageSize?: number = 10;
  totalRecords: number = 0;
}

@Component({
  selector: 'app-advanced-table',
  templateUrl: './advanced-table.component.html',
  styleUrls: ['./advanced-table.component.scss'],
  providers: [
    { provide: MatPaginatorIntl, useValue: CustomPaginator() }
  ]
})


export class AdvancedTableComponent implements OnInit {

  @Input() downloadFileName: string;                  // this name will be used to downlaod excel $$....
  @Input() datePipe: string = "ConvertLocalDateOnly"; // this pipe will be applicable on date columns $$....
  @Input() targetList: any[];                         // being used to get list from parent component $$....
  @Input() clickableColumns: any[] = []; // being used to get list of clickable columns and icons $$....
  @Input() metaData: metaData;                        // being used for the input of pageIndex, pageSize and totalRecords etc $$..

  @Input() inputColumns: any[];                       // being used for column names with all required properties such as isSort, class and width etc $$..
  @Input() inputButtons: any[];

  @Input() displayedColumns: string[];                // being used to set definition of mat-table columns
  @Input() showColumnNames: string[];                 // being used to show columns' label $$....

  @Output() onTableActionClick = new EventEmitter();  // will open action model for selected object/record $$....
  @Output() onChange = new EventEmitter();            // will call table data based on selection in paginator $$....
  @Output() exportToExcel = new EventEmitter();       // will download all records of list $$....
  @Output() onToggleEvent = new EventEmitter();


  @ViewChild(MatPaginator, { static: true, read: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  searchType: string;
  filterText: string;
  filteredList: any;
  globalSort: any;
  paginatorTotalLength: any;
  updatedClickableColumns: any;
  pageSizeOptions: number[];
  dataCount: any;
  dataSource: any;
  actionButtons: any;
  displayedColumns1: any;
  columnsToDisplay: any;
  extraColumns: any;

  constructor(
    private cdr: ChangeDetectorRef
  ) { }


  ngOnChanges(changes: any) {
    this.ngOnChangesHC(changes);
    if (changes.hasOwnProperty('targetList')) {
      if (!changes.targetList.firstChange) {
        if (this.searchType.toLowerCase() == 'local') {
          this.filterText = ''; //console.log('this.filterText is cleared***');
          this.metaData.searchText = '';
        }
      }
    }
    this.filteredList = this.targetList.map(s => Object.assign(s));
    this.paginatorTotalLength = this.metaData.totalRecords;
    this.paginationAccordingToDataLength();
    this.clickableColumnIfTrue();
    if (this.globalSort) this.onSortData(this.globalSort);
    this.createTargetTable();

    // these are being used to check values in dubugging mode $$..
    this.downloadFileName;
    this.datePipe;
    this.targetList;
    this.clickableColumns;
    this.metaData.totalRecords;
    this.metaData.pageIndex;
    this.metaData.pageSize;
    this.displayedColumns;
    this.showColumnNames;

    this.cdr.detectChanges();
  }


  ngOnChangesHC(value: any) {
    if (value.inputColumns) {
      this.displayedColumns1 = (value.inputColumns.currentValue || []).filter(
        (x: any) => x.key != "Actions"
      );
      let changedColumns = (this.displayedColumns1 || []).map((obj: any) => obj.key);
      if (value.inputButtons != null && value.inputButtons.currentValue.length > 0) {
        changedColumns.push("Actions");
      }
      this.columnsToDisplay = changedColumns;
      this.extraColumns = (value.inputColumns.currentValue || []).filter(
        (x: any) => x.key == "Actions"
      );
    }

    if (value.inputSource) {
      this.dataSource = value.inputSource.currentValue;
    }
    if (value.metaData) {
      this.metaData = Object.assign(value.metaData.currentValue || new metaData());
    }
    if (value.inputButtons) {
      this.actionButtons = value.inputButtons.currentValue || [];
    }
  }

  ngOnInit() { }

  createTargetTable() {
    this.setTableAfterDataRefresh();
  }

  setTableAfterDataRefresh() {
    this.dataSource = new MatTableDataSource(this.filteredList);
    this.dataCount = this.filteredList.length;
    this.tableSortAndPaginator();
  }

  ngAfterViewInit() {
    this.tableSortAndPaginator();
  }

  tableSortAndPaginator() {
    // this.dataSource.paginator = this.paginator;    // being commented as it's giving wrong pagination $$..
    // this.dataSource.sort = this.sort;
  }

  // For setting pagination options to show users $$...
  paginationAccordingToDataLength() {
    const length = this.metaData.totalRecords;
    switch (true) {
      case (length <= 10): {
        //this.pageSizeOptions = [1, 2, 3, 4, 5, 10];
        this.pageSizeOptions = [5, 10, 25, 50, 100];
        break;
      }
      case (length > 10 && length < 100): {
        this.pageSizeOptions = [5, 10, 25, 50, 100];
        break;
      }
      case (length > 100 && length < 200): {
        this.pageSizeOptions = [5, 10, 25, 50, 100, 200];
        break;
      }
      case (length > 200 && length < 300): {
        this.pageSizeOptions = [5, 10, 25, 50, 100, 200, 300];
        break;
      }
      case (length > 300 && length < 500): {
        this.pageSizeOptions = [5, 10, 25, 50, 100, 200, 300, 500];
        break;
      }
      case (length > 500): {
        this.pageSizeOptions = [5, 10, 25, 50, 100, 200, 300, 500, 1000];
        break;
      }
    }
  }

  clickableColumnIfTrue() {
    if (this.clickableColumns.length > 0) {
      this.displayedColumns.forEach(column => {
        let found = false;
        this.clickableColumns.forEach(clkColumn => {
          if (column === clkColumn.column) {
            this.updatedClickableColumns.push({ obj: clkColumn, clickable: true });
            found = true;
          }
        });
        if (!found) {
          if (this.updatedClickableColumns) {
            this.updatedClickableColumns.push({ obj: {}, clickable: false });
          } else {
            return
          }

        }
      });
    }
  }

  // will call data according to selection in paginator $$...
  pageEventPropogate(eventData: PageEvent) {
    let _metaData = new metaData();
    if (this.searchType.toLowerCase() == 'local') {
      this.filterText = '';
      this.metaData.searchText = '';
    }
    eventData.pageIndex++;
    _metaData.pageIndex = eventData.pageIndex;
    _metaData.pageSize = eventData.pageSize;
    _metaData.searchText = this.metaData.searchText
    this.onChange.emit(_metaData);
  }

  callGlobalSearch(searchText: string) {  
    this.metaData.pageIndex = 1;
    this.metaData.searchText = searchText;
    this.onChange.emit(this.metaData)
  }

  // to filter based on search $$....
  applyFilter(filterValue: string) {
    this.filterText = filterValue.trimLeft();
    if (this.searchType.toLowerCase() == 'global') {
      this.callGlobalSearch(this.filterText);
      return;
    }

    let _fullList = this.targetList.map(s => Object.assign(s));
    filterValue = filterValue.trim().toLowerCase();
    if (!filterValue || filterValue == "") {
      this.filteredList = _fullList.map(s => Object.assign(s));
      this.paginatorTotalLength = this.metaData.totalRecords;
    }
    else {
      const filtered_list = searchInDynamicTable(filterValue, _fullList, this.displayedColumns, this.clickableColumns);
      this.filteredList = filtered_list.map(s => Object.assign(s));
      this.paginatorTotalLength = this.filteredList.length;
    }
    this.setTableAfterDataRefresh();
  }

  // To open edit model $$....
  clickColumnEvent(columnIndex: number, element: any, functionName?: string) {
    let returnObj: editColumnEventDetails = {
      function: functionName,
      columnIndex: columnIndex,
      data: element
    };
    this.onTableActionClick.emit(returnObj);
  }

  onActionClick(action: string, data: any) {
    const actionObj = { action, data };
    this.onTableActionClick.emit(actionObj);
  }

  // For sorting event on dynamic columns $$....
  onSortData(sort: Sort) {
    this.globalSort = Object.assign(sort);
    const data = this.filteredList.slice();
    if (!sort.active || sort.direction === '') {
      const isAsc = sort.direction === 'desc';
      // Need to have valid updatedOn (not 0) value for applying this $$..
      // if (this.filteredList[0]["updatedOn"] != undefined) this.applySortingByKey('updatedOn', isAsc);
      // else if (this.filteredList[0]["UpdatedOn"] != undefined) this.applySortingByKey('UpdatedOn', isAsc);

      // if (this.filteredList[0]["createdOn"] != undefined) this.applySortingByKey('createdOn', isAsc);
      // else if (this.filteredList[0]["CreatedOn"] != undefined) this.applySortingByKey('CreatedOn', isAsc);

      // this will sort by updated on if not have value then by created on $$..
      // let createdOnKey: string, updatedOnKey: string;
      // if (this.filteredList[0]["createdOn"] != undefined) createdOnKey = 'createdOn';
      // else if (this.filteredList[0]["CreatedOn"] != undefined) createdOnKey = 'CreatedOn';
      // if (this.filteredList[0]["updatedOn"] != undefined) updatedOnKey = 'updatedOn';
      // else if (this.filteredList[0]["UpdatedOn"] != undefined) updatedOnKey = 'UpdatedOn';
      // this.applySortingByCreatedOnUpdatedOn(createdOnKey, updatedOnKey);

      // this has been added so that original sorting can be retained due to missing updatedOn in any record $$..
      this.applyFilter(this.filterText);
    }
    else {
      const isAsc = sort.direction === 'asc';
      this.applySortingByKey(sort.active, isAsc);
    }
    this.setTableAfterDataRefresh();
  }

  // will sort list by key and direction $$....
  applySortingByKey(key: string, isAsc: boolean) {
    const data = this.filteredList.slice();
    this.filteredList = data.sort((a: any, b: any) => {
      if (a[key] === b[key]) return;
      if (typeof a[key] == "number") {
        return compare(+a[key], +b[key], isAsc);
      }
      else {
        const val1 = a[key] ? a[key].toUpperCase() : '';
        const val2 = b[key] ? b[key].toUpperCase() : '';
        return compare(val1, val2, isAsc);
      }
    });
  }

  // will sort list by createdOn/updatedOn and desc direction $$....
  applySortingByCreatedOnUpdatedOn(createdOn: string, updatedOn: string) {
    let data = this.filteredList.slice();
    this.filteredList = data.sort((a: any, b: any): any => {
      if (a[updatedOn] === b[updatedOn]) return;
      if (typeof a[updatedOn] == "number") {
        return compare(+a[updatedOn], +b[updatedOn], false);
      }
    });
    let data2 = this.filteredList.slice();
    this.filteredList = data2.sort((a: any, b: any): any => {
      if (a[updatedOn] == 0 || a[updatedOn] == null && b[updatedOn] == 0 || b[updatedOn] == null) {
        if (a[createdOn] === b[createdOn]) return;
        if (typeof a[createdOn] == "number" && typeof b[createdOn] == "number") {
          return compare(+a[createdOn], +b[createdOn], false);
        }
      }
      else if (a[updatedOn] == 0 || a[updatedOn] == null && b[updatedOn] != 0 && b[updatedOn] != null) {
        if (a[createdOn] === b[updatedOn]) return;
        if (typeof a[createdOn] == "number" && typeof b[updatedOn] == "number") {
          return compare(+a[createdOn], +b[updatedOn], false);
        }
      }
      else if (a[updatedOn] != 0 && a[updatedOn] != null && b[updatedOn] == 0 || b[updatedOn] == null) {
        if (a[updatedOn] === b[createdOn]) return;
        if (typeof a[updatedOn] == "number" && typeof b[createdOn] == "number") {
          return compare(+a[updatedOn], +b[createdOn], false);
        }
      }
    });
  }

  isDateType(columnName: string): boolean {
    const value = this.filteredList[0][columnName];
    if (!Number.isNaN(Number(value))) return false;
    let date = new Date(value);
    if (date.toString() == "Invalid Date") return false;
    if ((toString.call(date)) == "[object Date]") return true;
    else return false;
  }


  onToggleClick(type: string, element: any, column: any, event: any) {
    this.onToggleEvent.emit({
      type: type,
      element: element,
      column: column,
      event: event
    });
  }

  gettate(number: number, element: any) { }

  toggleSearch(event: any) {
    this.filterText = '';
    this.metaData.searchText = '';
    this.searchType = event.checked ? 'Global' : 'Local';
    // if (this.searchType == 'Global') {
    let _metaData = new metaData();
    _metaData.pageIndex = 1;
    _metaData.pageSize = this.metaData.pageSize;
    _metaData.searchText = this.metaData.searchText;
    this.onChange.emit(_metaData);
    // }
  }

}


// function to return date format $$...
function dateConvertor(value: any, datePipe: string) {
  if (Number(value) == 0) {
    return "";
  }
  if (datePipe == "ConvertLocalDate") {
    return moment.utc(Number(value)).local().format("DD/MM/YYYY HH:mm:ss").valueOf();
  }
  else {
    return moment.utc(Number(value)).local().format("DD/MM/YYYY").valueOf();
  }
}

// function to apply sorting $$....
export function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

// function to apply searching $$....
function searchInDynamicTable(passedString: string, List: any[], columnNames: string[], clickableColumns: clickableColumns[]) {
  let _columnNames: string[] = removeClickableColumnsFromDisplayedColumns(columnNames, clickableColumns);
  let returnList: any[] = filterListBySearchStringOnDisplayedColumns(passedString, List, _columnNames);
  return returnList;
}

// function to return downloadable list $$....
export function downloadableListAsDisplayedColumns(list: any[], displayedColumns: string[], clickableColumns: clickableColumns[], showColumns: string[], datePipe?: string) {

  let DtPipe: string = datePipe ? datePipe : "ConvertLocalDateOnly";
  let List: any[] = manageListForExactDate(list, displayedColumns, DtPipe);
  let localColumnList: string[] = JSON.parse(JSON.stringify(displayedColumns));
  let removedDtInDateCols: string[] = [];
  localColumnList.filter(s => { if (s.endsWith('Dt')) s = s.substring(0, s.length - 2); removedDtInDateCols.push(s); });
  let columns = removeClickableColumnsFromDisplayedColumns(removedDtInDateCols, clickableColumns);
  let downloadableList: any[] = removeColumnsInListIfNotInDisplayedColumns(List, columns);
  let replacedColsDownloadList: any[] = replaceColumnsWithDisplayedColumns(downloadableList, columns, removedDtInDateCols, showColumns);
  return replacedColsDownloadList;
}

export function manageListForExactDate(List: any[], displayedColumns: string[], DtPipe: string) {
  let managedDateList: any[] = List.map(s => Object.assign(s));
  let localColumnList: string[] = JSON.parse(JSON.stringify(displayedColumns));
  localColumnList.forEach(s => {
    if (s.endsWith('Dt')) {
      let propWithoutDt = s.substring(0, s.length - 2);
      managedDateList.forEach(ss => {
        ss[propWithoutDt] = dateConvertor(ss[propWithoutDt], DtPipe)
      });
    }
  });
  return managedDateList;
}

// will change column name as it is being shown in table for excel download $$..
function replaceColumnsWithDisplayedColumns(List: any[], properties: string[], removedDtDisplayedColumns: string[], showColumnNames: string[]) {
  let tempList: any[] = List.map(s => Object.assign({}, s));

  let tableColumns: string[] = [];      // columns of table without clickable columns $$..
  properties.forEach(s => {
    let index: number = removedDtDisplayedColumns.indexOf(s);
    let col: string = showColumnNames[index];
    tableColumns.push(col);
  });

  tempList.forEach(s => {
    for (let i = 0; i < tableColumns.length; i++) {
      if (s[tableColumns[i]] == s[properties[i]]) {
        tableColumns[i] = tableColumns[i] + " ";
      }
      s[tableColumns[i]] = s[properties[i]];
      delete s[properties[i]];
    }
  });
  return tempList;
}

// will remove clickable columns from targetting columns $$..
function removeClickableColumnsFromDisplayedColumns(displayedColumns: string[], clickableColumns: clickableColumns[]) {
  let displayedColumnsLocal: string[] = JSON.parse(JSON.stringify(displayedColumns));
  if (clickableColumns.length > 0) {
    clickableColumns.forEach(clickable => {
      displayedColumnsLocal.forEach(column => {
        if (clickable.column == column)
          displayedColumnsLocal.splice(displayedColumnsLocal.indexOf(column), 1);
      });
    });
  }
  return displayedColumnsLocal;
}

// Will filter in available columns only $$..
function filterListBySearchStringOnDisplayedColumns(searchString: string, targetList: any[], targetColumns: string[]) {
  let searchedList: any[] = [];
  let _targetList: any[] = targetList.map(s => Object.assign({}, s));
  for (var i = 0; i < _targetList.length; i++) {
    for (var j = 0; j < targetColumns.length; j++) {
      let obj = _targetList[i];
      let column = targetColumns[j];
      let val = obj[column];
      let value = val ? val.toString().toLowerCase() : '';
      let found = value.includes(searchString);
      if (found) {
        searchedList.push(_targetList[i]);
        break;
      }
    }
  }
  return searchedList;
}

// will remove those columns which are not being shown to users in the table $$..
function removeColumnsInListIfNotInDisplayedColumns(targetList: any[], diplayedColumns: string[]) {
  let columnRemovedList: any[] = targetList.map(s => Object.assign({}, s));
  for (var propt in targetList[0]) {
    let found = false;
    for (var j = 0; j < diplayedColumns.length; j++) {
      if (diplayedColumns[j] == propt) {
        found = true;
        break;
      }
    }
    if (!found) {
      columnRemovedList.forEach(element => {
        delete element[propt];
      });
    }
  }
  return columnRemovedList;
}


// Global function to remove special character at last of the string if exists $$...
export function checkSpecialCharactorAtLastAndRemove(returnClearString: string) {
  let format = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
  let Charactor: string = returnClearString.charAt(returnClearString.length - 1);
  returnClearString = Charactor.match(format) ? returnClearString.substring(0, returnClearString.length - 2) : returnClearString;
  return returnClearString;
}


// Global function to sort list by column name $$..
export function getSortedListByColumn(list: any[], column: string) {
  if (list == null || list == undefined) return list;
  let unsortedList: any[] = list.map(s => Object.assign(s));
  const SortedList = unsortedList.sort((a, b) => {
    const value1 = a[column] ? a[column].toLowerCase() : "";
    const value2 = b[column] ? b[column].toLowerCase() : "";
    let returnValue = ((value1 > value2) ? 1 : -1);
    return returnValue ? returnValue : 0;
  });
  return SortedList;
}

