import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-manage-list',
  templateUrl: './manage-list.component.html',
  styleUrls: ['./manage-list.component.scss']
})
export class ManageListComponent implements OnInit {

  modalRef?: BsModalRef;

  @Input() listTitle: any;
  @Input() isAdd: any;
  @Input() isEdit: any;
  @Input() isDelete: any;
  
  @Input() manageOrgList: any[] = [];

  @Output() addOrganization = new EventEmitter<string>();
  @Output() searchOrganization = new EventEmitter<string>();
  @Output() editOrganizaiton = new EventEmitter<string>();
  @Output() openDatabase = new EventEmitter<string>();
  @Output() openSmtp = new EventEmitter<string>();
  @Output() deleteOrganization = new EventEmitter<string>();
  @Output() activeInactiveOrg = new EventEmitter<string>();

  p: number = 1;
  collection: any[];

  constructor() { }

  ngOnInit() {
  }

  addOrganizationButton() {
    this.addOrganization.emit();
  }

  onSearchOrg(event: any) {
    this.searchOrganization.emit(event);
  }

  inactiveOrganization(item:any){
    this.activeInactiveOrg.emit(item);
  }

  edit(item: any) {
    this.editOrganizaiton.emit(item);
  }

  openDatabaseModal(item: any) {
    this.openDatabase.emit(item);
  }

  openSMTPModal(item:any) {
    this.openSmtp.emit(item);
  }

  delete(item:any) {
    this.deleteOrganization.emit(item);
  }

  closeSMTPModal() {
    this.modalRef?.hide();
  }

}
