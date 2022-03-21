import { Component, OnInit, Inject } from '@angular/core';
import { HtmlConstants } from 'src/app/shared/constants/htmlConstants';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})

export class ConfirmDialogComponent implements OnInit {
  @ViewChild('commentInput') commentInput: ElementRef;
  htmlConstants = HtmlConstants;
  userId = 0;


  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public _data: any,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    if (this._data.confirmButtonShow == null || this._data.confirmButtonShow == undefined) {
      this._data.confirmButtonShow = true;
    }

    if (this._data.commentShow != null || this._data.commentShow != undefined) {
      this._data.commentShow = true;
    }
  }

  onClose(): void {
    this.dialogRef.close(false);
  }

  onConfirm() {
    if (this._data.commentShow == null) {
      this.dialogRef.close(true);
    }
    else if (this._data.commentShow == true || this._data.commentShow != undefined) {
      var commentvalue = this.commentInput.nativeElement.value;     
      this.dialogRef.close({ data: commentvalue });
    }

  }



}
