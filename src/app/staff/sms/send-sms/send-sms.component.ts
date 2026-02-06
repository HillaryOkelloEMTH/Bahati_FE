import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { SmsManagementComponent } from '../sms-management/sms-management.component';
import { SmsService } from '../sms.service';

@Component({
  selector: 'app-send-sms',
  templateUrl: './send-sms.component.html',
  styleUrls: ['./send-sms.component.sass']
})
export class SendSmsComponent implements OnInit {

  sendSMSform: FormGroup;
  loading = false;

  constructor(public dialogRef: MatDialogRef<SmsManagementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private service: SmsService) { }
  subscription!: Subscription;


  ngOnInit(): void {
    this.sendSMSform = this.fb.group({
      recipient: ["", [Validators.required]],
      sms: ["", [Validators.required]],
    })
  }

  onSubmit() {
    this.loading = true;
    this.subscription = this.service.sendSMS(this.sendSMSform.value.recipient, this.sendSMSform.value.sms).subscribe(res => {
      this.snackbar.showNotification("snackbar-success", "Successful!");
      this.loading = false;
      this.sendSMSform.reset();
      this.dialogRef.close();
    }, err => {
      this.loading = false;
      this.dialogRef.close();
    })
  }

  onClick() {
    this.dialogRef.close();
  }
}
