import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CountiesService } from 'src/app/admin/counties/counties.service';
import { PickupService } from 'src/app/admin/pick-up-locations/pickup.service';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { FarmerService, PaymentMode, BankOption } from '../../services/farmer.service';
import { FarmerManagenentComponent } from '../farmer-managenent/farmer-managenent.component';
import { RoutesService } from 'src/app/admin/routes/routes.service';

@Component({
  selector: 'app-register-farmer',
  templateUrl: './register-farmer.component.html',
  styleUrls: ['./register-farmer.component.scss'],
})
export class RegisterFarmerComponent implements OnInit, OnDestroy {
  farmerRegirstartionForm: FormGroup;
  bankDetailsForm: FormGroup;
  loading = false;
  isLoading: boolean = false;
  isdata: boolean = false;
  subcounties: any[] = [];
  wards: any;
  counties: any;
  routes: any;
  paymentModes: PaymentMode[] = [];
  bankOptions: BankOption[] = [];
  filteredBankOptions: BankOption[] = [];
  private subscriptions: Subscription[] = [];

  constructor(
    public dialogRef: MatDialogRef<FarmerManagenentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private countiesService: CountiesService,
    private routesService: PickupService,
    private service: FarmerService,
    private routeService: RoutesService
  ) {}

  ngOnInit(): void {
    this.getSubcounties();
    this.getCounties();
    this.getPaymentModes();
    this.getBankOptions();

    this.bankDetailsForm = this.fb.group({
      branch: ['', [Validators.required]],
      bankName: ['', [Validators.required]],
      accountNumber: ['', [Validators.required]],
      accountName: ['', [Validators.required]],
      paymentMode: ['']
    });

    this.farmerRegirstartionForm = this.fb.group({
      bankDetails: [''],
      transportMeans: [''],
      firstName: ['', [Validators.required]],
      middleName: [''],
      lastName: ['', [Validators.required]],
      idNumber: ['', [Validators.required]],
      mobileNo: ['', [Validators.required]],
      subcounty_fk: ['', [Validators.required]],
      wardFk: ['', [Validators.required]],
      memberType: ['', [Validators.required]],
      alternativeMobileNo: [''],
      noOfCows: [''],
      paymentMode: ['', [Validators.required]],
      county_fk: [''],
      location: [''],
      subLocation: [''],
      village: [''],
      paymentFreequency: ['', [Validators.required]],
      gender: [''],
      routeFk: [''],
    });

    this.farmerRegirstartionForm.get('paymentMode')?.valueChanges.subscribe((value) => {
      this.updateFilteredBankOptions(value);
      if (['BANK', 'COOPORATIVE SACCOS'].includes(value)) {
        this.bankDetailsForm.get('bankName')?.setValidators([Validators.required]);
        this.bankDetailsForm.get('branch')?.setValidators([Validators.required]);
        this.bankDetailsForm.get('accountNumber')?.setValidators([Validators.required]);
        this.bankDetailsForm.get('accountName')?.setValidators([Validators.required]);
      } else {
        this.bankDetailsForm.get('bankName')?.clearValidators();
        this.bankDetailsForm.get('branch')?.clearValidators();
        this.bankDetailsForm.get('accountNumber')?.clearValidators();
        this.bankDetailsForm.get('accountName')?.clearValidators();
      }

      this.bankDetailsForm.get('bankName')?.updateValueAndValidity();
      this.bankDetailsForm.get('branch')?.updateValueAndValidity();
      this.bankDetailsForm.get('accountNumber')?.updateValueAndValidity();
      this.bankDetailsForm.get('accountName')?.updateValueAndValidity();
    });
  }

  paymentModeChange(event: any) {
    this.farmerRegirstartionForm.get("paymentMode").setValue(event.value)
  }

  updateFilteredBankOptions(paymentMode: string) {
    console.log('Selected paymentMode:', paymentMode);
    const categoryMap: { [key: string]: string } = {
      'MOBILE MONEY': 'MOBILE MONEY',
      'BANK': 'BANK',
      'CASH': 'CASH',
      'COOPORATIVE SACCOS': 'SACCO'
    };
    const category = categoryMap[paymentMode] || '';
    console.log('Mapped category:', category);
    console.log('Available bankOptions:', this.bankOptions);
    this.filteredBankOptions = this.bankOptions.filter(option =>
      option.categoryName?.toUpperCase() === category.toUpperCase()
    );
    console.log('Filtered bankOptions:', this.filteredBankOptions);
  }

  getPaymentModes() {
    this.isLoading = true;
    const sub = this.service.getPaymentModes().subscribe({
      next: (res: any) => {
      this.paymentModes = res?.entity || res?.data || res || [];
        console.log('Payment Modes:', this.paymentModes);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching payment modes:', error);
        this.isLoading = false;
        this.snackbar.showNotification('snackbar-danger', 'Failed to load payment modes');
      },
    });
    this.subscriptions.push(sub);
  }

  getBankOptions() {
    this.isLoading = true;
    const sub = this.service.getPaymentOptions().subscribe({
      next: (res: any) => {
        console.log('Raw API response for bank options:', res);
        this.bankOptions = res.entity || res;
        // Temporary hardcoded options to include BANK and SACCO
        // this.bankOptions = [
        //   ...this.bankOptions,
        //   { id: 12, name: "EQUITY BANK", code: "68", description: "Bank", active: true, categoryId: 1, categoryName: "BANK" },
        //   { id: 13, name: "KCB BANK", code: "69", description: "Bank", active: true, categoryId: 1, categoryName: "BANK" },
        //   { id: 14, name: "SACCO XYZ", code: "123", description: "Sacco", active: true, categoryId: 3, categoryName: "SACCO" }
        // ];
        console.log('Processed bankOptions:', this.bankOptions);
        this.updateFilteredBankOptions(this.farmerRegirstartionForm.get('paymentMode')?.value);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching bank options:', error);
        this.isLoading = false;
        this.snackbar.showNotification('snackbar-danger', 'Failed to load bank options');
      },
    });
    this.subscriptions.push(sub);
  }

  onSubmit() {
    this.loading = true;
    const bankDetails = {
      "branch": this.bankDetailsForm.value.branch,
      "bankName": this.bankDetailsForm.value.bankName,
      "accountName": this.bankDetailsForm.value.accountName,
      "accountNumber": this.bankDetailsForm.value.accountNumber
    }

    this.farmerRegirstartionForm.value.bankDetails = bankDetails;

    const sub = this.service.registerFarmer(this.farmerRegirstartionForm.value).subscribe({
      next: (res: any) => {
        console.log('response', res);
        const farmer = res.entity;
        this.snackbar.showNotification(
          'snackbar-success',
          'Farmer No: ' + farmer.farmerNo + ', ' + farmer.username + ' added Successfully'
        );
        this.loading = false;
        this.farmerRegirstartionForm.reset();
        this.dialogRef.close();
      },
      error: (error) => {
        console.error('reg error', error);
        this.loading = false;
        this.snackbar.showNotification('snackbar-danger', error.message || 'Failed to register farmer');
      },
    });
    this.subscriptions.push(sub);
  }

  onClick() {
    this.dialogRef.close();
  }

  getSubcounties() {
    this.isLoading = true;
    const sub = this.service.getSubCounties().subscribe({
      next: (res) => {
        console.log(res);
        if (res.entity.length > 0) {
          this.subcounties = res.entity;
        } else {
          this.subcounties = [];
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching subcounties:', error);
        this.isLoading = false;
        this.snackbar.showNotification('snackbar-danger', 'Failed to load subcounties');
      },
    });
    this.subscriptions.push(sub);
  }

  getCounties() {
    const sub = this.countiesService.getCounties().subscribe({
      next: (res) => {
        if (res.entity.length > 0) {
          this.counties = res.entity;
        } else {
          this.counties = [];
        }
      },
      error: (error) => {
        console.error('Error fetching counties:', error);
        this.snackbar.showNotification('snackbar-danger', 'Failed to load counties');
      },
    });
    this.subscriptions.push(sub);
  }

  getRoutes() {
    this.routeService.getRoutes(this.farmerRegirstartionForm.value.subcounty_fk).subscribe({
      next: (res) => {
        if (res.entity.length > 0) {
          this.routes = res.entity || [];
        } else {
          this.routes = [];
        }
      },
      error: (error) => {
        console.error('Error fetching routes:', error);
        this.snackbar.showNotification('error', 'Failed to load routes');
      },
    });
  }

  getWards(id: any) {
    const sub = this.service.getSubCountyById(id.value).subscribe({
      next: (res) => {
        if (res.entity.wards.length > 0) {
          this.wards = res.entity.wards || [];
        } else {
          this.wards = [];
        }
      },
      error: (error: any) => {
        console.error('Error fetching wards:', error);
        this.snackbar.showNotification('error', 'Failed to fetch wards');
      }
    });
    this.subscriptions.push(sub);

    this.getRoutes()
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub => sub.unsubscribe()));
  }
}
