import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { ProfileService } from '../profile.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-business-profile',
  templateUrl: './create-business-profile.component.html',
  styleUrls: ['./create-business-profile.component.sass']
})
export class CreateBusinessProfileComponent implements OnInit {
  subscription!: Subscription;
  loading = false;
  profileForm!: FormGroup;
  state:boolean = false;
  data:any

  constructor(
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private service: ProfileService,
    private location:Location,
  ) {

  }


  ngOnInit(): void {
    this.getProfile();
  }

  createForm() {
    this.profileForm = this.fb.group({
      companyEmail: '',
      companyName: '',
      phone: '',
      location: '',
      physicalAddress: '',
      regNo: '',
      website: '',
      entity: '001',
      logo:'',
      createdOn:'',
    });

  }

  profilePhoto: any
  imageSrc: string;
  profile: string | ArrayBuffer;

  onPhotoChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        this.profilePhoto = reader.result;
        this.profileForm.controls.logo.setValue(this.profilePhoto);
        this.imageSrc = reader.result as string;
        this.profile = reader.result;
      }
      reader.onerror = (error) => {
        console.log(error)
      }
    }
  }

  onSubmit() {
    this.loading = true;
    this.subscription = this.service.addNewProfile(this.profileForm.value).subscribe(res => {
      this.snackbar.showNotification("snackbar-success", "Successful!");
      this.loading = false;
      this.profileForm.reset();
    }, err => {
      this.loading = false;
      this.snackbar.showNotification("snackbar-danger", err);
    })
  }


  getProfile() {
    this.createForm();
    this.loading = true;
    this.subscription = this.service.getProfile().subscribe(res => {
      this.data = res;

      if (this.data?.entity) {
        this.profile = this.data.entity[0].logo;
      }
      console.log(this.profile)
      this.loading = false;
      if(this.profile == undefined || this.profile==null || this.profile=="")
      {
        this.state = false;        
        this.loading = false;
      }
      else
      {
    
        this.state = true;
        this.profileForm.patchValue({
          companyEmail: this.data.entity[0].companyEmail,
          companyName: this.data.entity[0].companyName,
          phone: this.data.entity[0].phone,
          location: this.data.entity[0].location,
          physicalAddress: this.data.entity[0].physicalAddress,
          regNo: this.data.entity[0].regNo,
          website: this.data.entity[0].website,
          createdOn:this.data.entity[0].createdAt
        })
      }


     

     
    }, err => {
      this.loading = false;
    });
  }

  update() {
    this.loading = true;
    this.subscription = this.service.updateProfile(this.profileForm.value).subscribe(res => {
      this.snackbar.showNotification("snackbar-success", "Successful!");
      this.loading = false;
      // this.profileForm.reset();
      this.getProfile();
    }, err => {
      this.loading = false;
      this.snackbar.showNotification("snackbar-danger", err);
    })

  }

  onCancel(){
    this.location.back();

  }
}
