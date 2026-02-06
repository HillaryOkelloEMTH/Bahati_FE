import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { TokenStorageService } from 'src/app/core/service/token-storage.service';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { SmsTemplateComponent } from '../sms-template/sms-template.component';
import { SmsService } from '../sms.service';

@Component({
  selector: 'app-view-template-body',
  templateUrl: './view-template-body.component.html',
  styleUrls: ['./view-template-body.component.sass']
})
export class ViewTemplateBodyComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SmsTemplateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }

    body: any;
  subscription!: Subscription;
  loading = false;

  ngOnInit(): void {
    this.body = this.data.data.templateBody;
  }

  onClick() {
    this.dialogRef.close();
  }

}
