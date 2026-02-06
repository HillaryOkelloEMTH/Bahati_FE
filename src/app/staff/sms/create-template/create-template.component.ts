import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { SmsService } from '../sms.service';
import { SmsTemplateComponent } from '../sms-template/sms-template.component';
import { TokenStorageService } from 'src/app/core/service/token-storage.service';

@Component({
  selector: 'app-create-template',
  templateUrl: './create-template.component.html',
  styleUrls: ['./create-template.component.sass']
})
export class CreateTemplateComponent implements OnInit {

  templateForm: FormGroup;
  loading = false;

  constructor(public dialogRef: MatDialogRef<SmsTemplateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private tokenService:TokenStorageService,
    private service: SmsService) { }
  subscription!: Subscription;


  ngOnInit(): void {
    this.templateForm = this.fb.group({
      templateName: ["", [Validators.required]],
      templateBody: ["", [Validators.required]],
      createdBy:[""]
    })
  }

  onSubmit() {
    this.loading = true;
    this.templateForm.value.createdBy = this.tokenService.getUser().username;
    this.subscription = this.service.createTemplate(this.templateForm.value).subscribe(res => {
      this.snackbar.showNotification("snackbar-success", "Successful!");
      this.loading = false;
      this.templateForm.reset();
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