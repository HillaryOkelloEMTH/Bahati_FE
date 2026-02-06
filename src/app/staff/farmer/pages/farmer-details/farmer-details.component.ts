import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CountiesService } from 'src/app/admin/counties/counties.service';
import { PickupService } from 'src/app/admin/pick-up-locations/pickup.service';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { FarmerService } from '../../services/farmer.service';
import { FarmerManagenentComponent } from '../farmer-managenent/farmer-managenent.component';

@Component({
  selector: 'app-farmer-details',
  templateUrl: './farmer-details.component.html',
  styleUrls: ['./farmer-details.component.sass']
})
export class FarmerDetailsComponent implements OnInit {

  farmerRegirstartionForm: FormGroup;
  bankDetailsForm: FormGroup;
  farmer: any
  loading = false;
  isLoading: Boolean
  isdata: Boolean
  subcounties: any[] = []
  wards: any;
  counties: any;
  routes: any;
  banks: any = { "count": 45, "list": [{ "name": "AFRICAN BANKING CORPORATION", "code": "35", "payPointType": "BANK", "status": "ACTIVE", "id": 607 }, { "name": "BANK OF AFRICA KENYA LTD", "code": "19", "payPointType": "BANK", "status": "ACTIVE", "id": 608 }, { "name": "BANK OF BARODA", "code": "6", "payPointType": "BANK", "status": "ACTIVE", "id": 609 }, { "name": "BANK OF INDIA", "code": "5", "payPointType": "BANK", "status": "ACTIVE", "id": 610 }, { "name": "BARCLAYS BANK OF KENYA LIMITED", "code": "3", "payPointType": "BANK", "status": "ACTIVE", "id": 611 }, { "name": "CENTRAL BANK OF KENYA", "code": "9", "payPointType": "BANK", "status": "ACTIVE", "id": 612 }, { "name": "CHARTERHOUSE BANK LTD", "code": "64", "payPointType": "BANK", "status": "ACTIVE", "id": 613 }, { "name": "CHASE BANK (KENYA) LIMITED", "code": "30", "payPointType": "BANK", "status": "ACTIVE", "id": 614 }, { "name": "CITIBANK N.A.", "code": "16", "payPointType": "BANK", "status": "ACTIVE", "id": 615 }, { "name": "CO OPERATIVE BANK", "code": "11", "payPointType": "BANK", "status": "ACTIVE", "id": 616 }, { "name": "COMMERCIAL BANK OF AFRICA LTD", "code": "7", "payPointType": "BANK", "status": "ACTIVE", "id": 617 }, { "name": "CONSOLIDATED BANK OF KENYA LTD", "code": "23", "payPointType": "BANK", "status": "ACTIVE", "id": 618 }, { "name": "CREDIT BANK LTD", "code": "24", "payPointType": "BANK", "status": "ACTIVE", "id": 619 }, { "name": "DEVELOPMENT BANK OF KENYA", "code": "59", "payPointType": "BANK", "status": "ACTIVE", "id": 620 }, { "name": "DIAMOND TRUST BANK", "code": "63", "payPointType": "BANK", "status": "ACTIVE", "id": 621 }, { "name": "DUBAI BANK OF KENYA LTD", "code": "20", "payPointType": "BANK", "status": "ACTIVE", "id": 622 }, { "name": "ECOBANK KENYA LTD", "code": "43", "payPointType": "BANK", "status": "ACTIVE", "id": 623 }, { "name": "EQUITORIAL COMMERCIAL BANK LTD", "code": "49", "payPointType": "BANK", "status": "ACTIVE", "id": 624 }, { "name": "EQUITY BANK", "code": "68", "payPointType": "BANK", "status": "ACTIVE", "id": 649 }, { "name": "FAMILY BANK LTD", "code": "70", "payPointType": "BANK", "status": "ACTIVE", "id": 625 }, { "name": "FIDELITY COMMERCIAL BANK", "code": "60", "payPointType": "BANK", "status": "ACTIVE", "id": 626 }, { "name": "FINA BANK", "code": "53", "payPointType": "BANK", "status": "ACTIVE", "id": 627 }, { "name": "FIRST AMERICAN BANK OF KENYA", "code": "15", "payPointType": "BANK", "status": "ACTIVE", "id": 628 }, { "name": "FIRST COMMUNITY BANK", "code": "74", "payPointType": "BANK", "status": "ACTIVE", "id": 629 }, { "name": "GIRO BANK LTD", "code": "42", "payPointType": "BANK", "status": "ACTIVE", "id": 630 }, { "name": "GUARDIAN BANK", "code": "55", "payPointType": "BANK", "status": "ACTIVE", "id": 631 }, { "name": "GULF AFRICAN BANK LTD", "code": "72", "payPointType": "BANK", "status": "ACTIVE", "id": 632 }, { "name": "HABIB BANK LTD", "code": "8", "payPointType": "BANK", "status": "ACTIVE", "id": 633 }, { "name": "IMPERIAL BANK LIMITED", "code": "39", "payPointType": "BANK", "status": "ACTIVE", "id": 634 }, { "name": "INVESTMENTS AND MORTGAGES", "code": "57", "payPointType": "BANK", "status": "ACTIVE", "id": 635 }, { "name": "JAMII BORA BANK LTD", "code": "51", "payPointType": "BANK", "status": "ACTIVE", "id": 636 }, { "name": "KENYA COMMERCIAL BANK LTD", "code": "1", "payPointType": "BANK", "status": "ACTIVE", "id": 650 }, { "name": "MIDDLE EAST BANK (K) LIMITED", "code": "18", "payPointType": "BANK", "status": "ACTIVE", "id": 638 }, { "name": "NATIONAL BANK OF KENYA", "code": "12", "payPointType": "BANK", "status": "ACTIVE", "id": 639 }, { "name": "NIC BANK", "code": "41", "payPointType": "BANK", "status": "ACTIVE", "id": 640 }, { "name": "ORIENTAL COMMERCIAL BANK", "code": "13", "payPointType": "BANK", "status": "ACTIVE", "id": 641 }, { "name": "PARAMOUNT UNIVERSAL BANK LTD", "code": "50", "payPointType": "BANK", "status": "ACTIVE", "id": 642 }, { "name": "PRIME BANK LIMITED", "code": "10", "payPointType": "BANK", "status": "ACTIVE", "id": 643 }, { "name": "SIDIAN BANK", "code": "66", "payPointType": "BANK", "status": "ACTIVE", "id": 637 }, { "name": "STANBIC BANK KENYA LIMITED", "code": "31", "payPointType": "BANK", "status": "ACTIVE", "id": 644 }, { "name": "STANDARD CHARTERED", "code": "2", "payPointType": "BANK", "status": "ACTIVE", "id": 645 }, { "name": "TRANS NATION SACCO", "code": "100", "defaultBranchCode": "Chuka", "payPointType": "BANK", "status": "ACTIVE", "id": 118527 }, { "name": "TRANS NATIONAL BANK", "code": "26", "payPointType": "BANK", "status": "ACTIVE", "id": 646 }, { "name": "UBA KENYA LTD", "code": "76", "payPointType": "BANK", "status": "ACTIVE", "id": 647 }, { "name": "VICTORIA COMMERCIAL BANK LTD", "code": "54", "payPointType": "BANK", "status": "ACTIVE", "id": 648 }] };

  constructor(public dialogRef: MatDialogRef<FarmerManagenentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private countiesService: CountiesService,
    private routesService: PickupService,
    private service: FarmerService) { }
  subscription!: Subscription;

  ngOnInit(): void {
    console.log("Farmer id "+this.data.farmer.id)
    this.isLoading = true;
    this.service.getFarmersById(this.data.farmer.id).subscribe(res => {
      this.data = res;
      this.isLoading = false;
      this.farmer = this.data.entity 
      console.log("Farmer details ", this.farmer)

      this.getWards(this.farmer.subcounty_fk)


      this.bankDetailsForm = this.fb.group({
        alternativeMethod: [""],
        otherMeansDetails: [this.farmer.bankDetails.otherMeansDetails, [Validators.required]],
        otherMeans: [this.farmer.bankDetails.otherMeans, [Validators.required]],
        branch: [this.farmer.bankDetails.branch, [Validators.required]],
        bankName: [this.farmer.bankDetails.bankName, [Validators.required]],
        accountNumber: [this.farmer.bankDetails.accountNumber, [Validators.required]],
        accountName: [this.farmer.bankDetails.accountName, [Validators.required]],
      });

      this.farmerRegirstartionForm = this.fb.group({
        id: [this.farmer.id],
        bankDetails: [""],
        transportMeans: [this.farmer.transportMeans],
        firstName: [this.farmer.firstName, [Validators.required]],
        // middleName: [this.farmer.firstName, [Validators.required]],
        lastName: [this.farmer.lastName, [Validators.required]],
        idNumber: [this.farmer.idNumber, [Validators.required]],
        mobileNo: [this.farmer.mobileNo, [Validators.required]],
        address: [""],
        subcounty_fk: [this.farmer.subcounty_fk, [Validators.required]],
        wardFk: [this.farmer.wardFk, [Validators.required]],
        memberType: [this.farmer.memberType, [Validators.required]],
        alternativeMobileNo: [this.farmer.alternativeMobileNo],
        noOfCows: [this.farmer.noOfCows, [Validators.required]],
        county_fk: [this.farmer.county_fk],
        location: [this.farmer.location],
        subLocation: [this.farmer.subLocation],
        village: [this.farmer.village],
        paymentFreequency: [this.farmer.paymentFreequency],
        paymentMode: [this.farmer.paymentMode],
        gender: [this.farmer.gender],
        route:[this.farmer.pickupLocation],
        routeFk: [this.farmer.pickupLocation]
      })

    })
    this.getSubcounties();
    this.getCounties();
    this.geRoutes();
  }


  onSubmit() {
    this.loading = true;
    this.farmerRegirstartionForm.value.bankDetails = this.bankDetailsForm.value;
    this.subscription = this.service.registerFarmer(this.farmerRegirstartionForm.value).subscribe(res => {
      this.snackbar.showNotification("snackbar-success", "Successful!");
      this.loading = false;
      this.farmerRegirstartionForm.reset();
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





  getSubcounties() {
    this.isLoading = true;
    this.subscription = this.service.getSubCounties().subscribe(res => {
      this.data = res;
      if (this.data.entity.length > 0) {
        this.subcounties = this.data.entity
      }
      else {
        this.subcounties = [];
      }
    })
  }

  getCounties() {
    this.subscription = this.countiesService.getCounties().subscribe(res => {
      if (res.entity.length > 0) {
        this.counties = res.entity;
      }
      else {
        this.counties = [];
      }
    })
  }

  geRoutes() {
    this.subscription = this.routesService.getRoutes().subscribe(res => {
      if (res.entity.length > 0) {
        this.routes = res.entity;
      }
      else {
        this.routes = [];
      }
    })
  }

  getWards(id: any) {
    this.subscription = this.service.getSubCountyById(id).subscribe(res => {
      this.data = res;
      if (this.data.entity.wards.length > 0) {
        this.wards = this.data.entity.wards;
      }
      else {
      }
    })
  }
}

