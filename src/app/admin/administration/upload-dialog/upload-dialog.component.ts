import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BulkDeliveryComponent } from '../bulk-delivery/bulk-delivery.component';
import { AdministrationService } from '../administration.service';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { TokenStorageService } from 'src/app/core/service/token-storage.service';

@Component({
  selector: 'app-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.sass']
})
export class UploadDialogComponent implements OnInit {
  loading: boolean = false
  uploadForm: FormGroup
  currentDate: any
  selectedFile: File | null = null
  username: any
  mobile: any

  constructor(public dialogRef: MatDialogRef<BulkDeliveryComponent>, @Inject(MAT_DIALOG_DATA) private data: any, private fb: FormBuilder, private administratorService: AdministrationService, private snackbar: SnackbarService, private tokenStorage: TokenStorageService
) {
    this.currentDate = this.getCurrentDate()
   }

  ngOnInit(): void {
    this.username = this.tokenStorage.getUser().username;
    this.mobile = this.tokenStorage.getUser().mobile;
    this.uploadForm = this.fb.group({
      file: ['', [Validators.required]]
    })
  }

  onFileChange(event: any) {
    const file = event.target.files[0]
    if (file) {
      this.selectedFile = file
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  getCurrentDate(): any {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  }

  onSubmit(): void {
    if (this.selectedFile) {
      this.loading = true
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name)

      this.administratorService.bulkDeliveryUpload(formData, this.username, this.mobile).subscribe({
        next: (response: any) => {
          this.loading = true;

          if (response.statusCode == 200) {
            this.loading = false;
            this.dialogRef.close()
            this.dialogRef.afterClosed().subscribe({
              next: () => {
                this.snackbar.showNotification('snackbar-success', "Bulk Deliveries Uploaded Successfully");
              }
            })
          }
        },
        error: (error: any) => {
          this.loading = false;
          this.snackbar.showNotification('snackbar-danger', error);
        },
        complete: () => {}
      })
    }
  }

}
