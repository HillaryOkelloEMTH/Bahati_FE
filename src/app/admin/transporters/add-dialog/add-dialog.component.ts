import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ConfigsService } from 'src/app/staff/stock/configs/configs.service';
import { ManageComponent } from '../manage/manage.component';
import { TransporterService } from '../transporter.service';
import { NotificationService } from 'src/app/data/services/notification.service';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.sass']
})
export class AddDialogComponent implements OnInit {
  form: FormGroup
  routes: any[] = []
  users: any[] = []
  loading: boolean = false

  constructor(private fb: FormBuilder, private snackbar: NotificationService, private service: TransporterService,private configService: ConfigsService, private dialogRef: MatDialogRef<ManageComponent>) { }

  ngOnInit(): void {
    this.form=this.fb.group({
      routeId: ['', [Validators.required]],
      username: ['', [Validators.required]]
    })

    this.getRoutes()
    this.getTransporters()
  }


  getRoutes() {
    this.configService.getRoutes().subscribe({
      next: (res) => {
        if (res.entity.length > 0) {
          this.routes = res.entity
        } else {
          this.routes = []
        }
      },
      error: (error) => {
        console.log("caught error",error)
      }
    })
  }

  getTransporters() {
    this.service.getTransporters().subscribe({
      next: (res) => {
        this.users=res.entity
      },
      error: (error) => {
        console.log("error caught", error)
        this.users = []
      }
    })
  }

  cancel() {
    this.dialogRef.close()
  }

  submit() {
    this.service.addTransporter(this.form.value.routeId, this.form.value.username).subscribe({
      next: (res) => {
        this.loading = false
        this.dialogRef.close()
        this.snackbar.alertSuccess(res.message)
      },
      error: (error) => {
        this.loading = false
        this.snackbar.alertWarning(error)
      },
      complete: () => {}
    })
  }
}
