import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { TokenStorageService } from 'src/app/core/service/token-storage.service';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { SalesService } from '../../services/sales.service';
import { CollectorsFloatAllocationsComponent } from '../collectors-float-allocations/collectors-float-allocations.component';
import { LookupOneMilkcollectorComponent } from '../lookup-one-milkcollector/lookup-one-milkcollector.component';

@Component({
  selector: 'app-float-allocation',
  templateUrl: './float-allocation.component.html',
  styleUrls: ['./float-allocation.component.sass']
})
export class FloatAllocationComponent implements OnInit {

  allocationForm: FormGroup;
  loading = false;

  constructor(public dialogRef: MatDialogRef<CollectorsFloatAllocationsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private service: SalesService,
    private dialog: MatDialog,
    private tokenService: TokenStorageService) { }
  subscription!: Subscription;

  ngOnInit(): void {
    this.allocationForm = this.fb.group({
      allocateBy: [this.tokenService.getUser().username],
      collectorId: [""],
      collectorName: [""],
      mode: ["", [Validators.required]],
      allocationAmount: ["", [Validators.required]],
    })
  }


  collector: any;

  pickMilkCollector() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    dialogConfig.data = {
      user: '',
    };
    const dialogRef = this.dialog.open(LookupOneMilkcollectorComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      this.collector = result.data;
      this.allocationForm.patchValue({
        collectorId: this.collector.id,
        collectorName: this.collector.username,
      });
    });
  }

  onSubmit() {
    this.loading = true;
    this.subscription = this.service.allocateFloatToCollector(this.allocationForm.value).subscribe(res => {
      this.snackbar.showNotification("snackbar-success", "Successful!");
      this.loading = false;
      this.allocationForm.reset();
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
