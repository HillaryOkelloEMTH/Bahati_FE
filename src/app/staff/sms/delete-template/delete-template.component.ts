import { Component, Inject, OnInit } from '@angular/core';
import { SmsService } from '../sms.service';
import { SmsLimitsComponent } from '../sms-limits/sms-limits.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/shared/snackbar.service';

@Component({
  selector: 'app-delete-template',
  templateUrl: './delete-template.component.html',
  styleUrls: ['./delete-template.component.sass']
})
export class DeleteTemplateComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SmsLimitsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackbar: SnackbarService,
    private service: SmsService) { }

    templateName: any;
    templateBody: any;
  subscription!: Subscription;
  loading = false;

  ngOnInit(): void {
    this.templateName = this.data.data.templateName;
    this.templateBody = this.data.data.templateBody;
  }

  onDelete() {
    this.loading = true;
    this.subscription = this.service.deleteTemplate(this.data.data.id).subscribe(res => {
      this.loading = false;
      this.snackbar.showNotification("snackbar-success", "Successful!");
      this.dialogRef.close();
    }, err => {
      this.loading = false;
      this.snackbar.showNotification("snackbar-danger", err);
      this.dialogRef.close();
    })
  }

  onClick() {
    this.dialogRef.close();
  }

}
