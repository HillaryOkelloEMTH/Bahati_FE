import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { TokenStorageService } from 'src/app/core/service/token-storage.service';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { SmsTemplateComponent } from '../sms-template/sms-template.component';
import { SmsService } from '../sms.service';

@Component({
  selector: 'app-edit-template',
  templateUrl: './edit-template.component.html',
  styleUrls: ['./edit-template.component.sass']
})
export class EditTemplateComponent implements OnInit {

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
      id: [this.data.data.id],
      templateName: [this.data.data.templateName],
      templateBody: [this.data.data.templateBody],
      createdBy:[this.data.data.createdBy]
    })
  }

  onSubmit() {
    this.loading = true;
    this.templateForm.value.createdBy = this.tokenService.getUser().username;
    this.subscription = this.service.editTemplate(this.templateForm.value).subscribe(res => {
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