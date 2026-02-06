import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-business-profile',
  templateUrl: './business-profile.component.html',
  styleUrls: ['./business-profile.component.sass']
})
export class BusinessProfileComponent implements OnInit {
  subscription!: Subscription;
  loading = false;
  userForm!: FormGroup;
  state:boolean = false;

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private service: ProfileService,
  ) {

  }


  ngOnInit(): void {
    // this.createForm();
    this.getProfile();
  }

  createForm() {
    this.userForm = this.fb.group({
      companyEmail: '',
      companyName: '',
      phone: '',
      location: '',
      physicalAddress: '',
      regNo: '',
      website: '',
      entity: '001',
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
        this.userForm.controls.logo.setValue(this.profilePhoto);
        this.imageSrc = reader.result as string;
        this.profile = reader.result;
      }
      reader.onerror = (error) => {
        console.log(error)
      }
    }
  }

  data:any;
  getProfile() {
    this.createForm();
    this.loading = true;
    this.subscription = this.service.getProfile().subscribe(res => {
      this.data = res;
      this.profile = this.data.entity[0].logo;
      console.log(this.profile)
        this.loading = false;
      if(this.profile == undefined || this.profile==null || this.profile=="")
      {
        this.state = false;        

      }
      else
      {
    
        this.state = true;
        this.userForm.patchValue({
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
}