import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-edit-business-profile',
  templateUrl: './edit-business-profile.component.html',
  styleUrls: ['./edit-business-profile.component.sass']
})
export class EditBusinessProfileComponent implements OnInit {
  subscription!: Subscription;
  loading = false;
  profileForm!: FormGroup;
  state: boolean = false;
  data: any;
  profilePhoto: any
  imageSrc: string;
  profile: string | ArrayBuffer;

  constructor(
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private service: ProfileService,
  ) {

  }


  ngOnInit(): void {
    this.createForm();
    this.getProfile();
  }

  createForm() {
    this.profileForm = this.fb.group({
      id: '',
      companyEmail: '',
      companyName: '',
      phone: '',
      location: '',
      physicalAddress: '',
      regNo: '',
      website: '',
      entity: '001',
      logo: '',
      createdOn: '',
    });

  }

  getProfile() {
    this.loading = true;
    this.subscription = this.service.getProfile().subscribe(res => {
      this.data = res;
      this.profile = this.data.entity[0].logo;
      console.log(this.profile)
      if (this.profile == undefined) {
        this.state = false;
      }
      else {
        this.loading = false;
        this.state = true;

        this.profileForm.controls.logo.setValue(this.data.entity[0].logo);

        this.profileForm.patchValue({
          id: this.data.entity[0].id,
          companyEmail: this.data.entity[0].companyEmail,
          companyName: this.data.entity[0].companyName,
          phone: this.data.entity[0].phone,
          location: this.data.entity[0].location,
          physicalAddress: this.data.entity[0].physicalAddress,
          regNo: this.data.entity[0].regNo,
          website: this.data.entity[0].website,
          createdOn: this.data.entity[0].createdAt
        })
      }




    }, err => {
      this.loading = false;
    });
  }


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
    this.subscription = this.service.updateProfile(this.profileForm.value).subscribe(res => {
      this.snackbar.showNotification("snackbar-success", "Successful!");
      this.loading = false;
      this.profileForm.reset();
    }, err => {
      this.loading = false;
      this.snackbar.showNotification("snackbar-danger", err);
    })
  }

}
