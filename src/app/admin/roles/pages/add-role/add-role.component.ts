import { Component, OnInit } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormGroup,
} from "@angular/forms";
import { Router } from "@angular/router";
import { takeUntil } from "rxjs";
// import { PrivilegesTemplate } from "src/app/admin/data/types/privileges_template";
import { TokenStorageService } from "src/app/core/service/token-storage.service";
import { NotificationService } from "src/app/data/services/notification.service";
import { RoleService } from "src/app/data/services/role.service";
import { BaseComponent } from "src/app/shared/components/base/base.component";
// import { RoleService } from "../../data/services/RoleService.service";

const ACESS_RIGHTS = "access-rights";

@Component({
  selector: "app-add-role",
  templateUrl: "./add-role.component.html",
  styleUrls: ["./add-role.component.sass"],
})
export class AddRoleComponent extends BaseComponent implements OnInit {
  loading = false;
  function_type: string;

  fmData: any;
  isDisabled: boolean;
  formData: FormGroup;
  rolesData: any;
  btnColor: any;
  btnText: any;
  hideBtn = false;
  onShowResults = false;
  accessRightsLoaded: boolean = false;

  currentUserName: any;

  private basicActionsAddOns: {
    name: string;
    selected: boolean;
    accessRights: string;
  }[];

  apiFormData: FormGroup;

  filtered: { name: string; selected: boolean; code: number }[];
  basicActions: FormArray;
  displayArray: { name: string; selected: boolean; accessRights: string }[];
  obj: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    // private roleService: RoleService,
    private notificationAPI: NotificationService,
    private tokenStorage: TokenStorageService,
    private roleService: RoleService
  ) {
    super();
    this.getAccessRights();

    this.onInitForm();

    if (this.router.getCurrentNavigation().extras.state) {
      this.fmData = this.router.getCurrentNavigation().extras.state;
      if (this.fmData.function_type == "VIEW") {
        this.function_type = "VIEW";
        const vData = localStorage.getItem("viewRolesData");
        if (vData) {
          this.rolesData = JSON.parse(vData);
        }
      }
      if (this.fmData.function_type == "UPDATE") {
        this.function_type = "UPDATE";
        const eData = localStorage.getItem("editRolesData");
        if (eData) {
          this.rolesData = JSON.parse(eData);
        }
      }
      if (this.fmData.function_type == "DELETE") {
        this.function_type = "DELETE";
        const eData = localStorage.getItem("editRolesData");
        if (eData) {
          this.rolesData = JSON.parse(eData);
        }
      }
      if (this.fmData.function_type == "ACTIVATE") {
        this.function_type = "ACTIVATE";
        const eData = localStorage.getItem("editRolesData");
        if (eData) {
          this.rolesData = JSON.parse(eData);
        }
      }
    } else {
      this.function_type = "ADD";
    }
  }

  ngOnInit() {
    this.getAccessRights();
    
    this.currentUserName = this.tokenStorage.getUser().username;
    console.log("this.function_typ: ", this.function_type);
    // this.getAccessRights();

    this.getPage();
  }

  getLocalAccessRights() {
    return JSON.parse(localStorage.getItem(ACESS_RIGHTS));
  }


  onInitForm() {
    this.apiFormData = this.fb.group({
      role: [""],
      privileges: this.fb.array([]),
    });
  }

  onChange(e: any, i: any) {
    this.displayArray[i].selected = e.checked;
  }

  disabledFormControl() {
    this.apiFormData.disable();
    this.isDisabled = true;
  }
  get f() {
    return this.formData.controls;
  }

  getPage() {
    if (this.function_type == "ADD") {
      this.displayArray = this.getLocalAccessRights();

      if (this.displayArray.length > 0) {
        this.accessRightsLoaded = true;
      } else {
        this.accessRightsLoaded = false;
      }

      this.onInitForm();
      this.apiFormData.patchValue({
        postedBy: this.currentUserName,
      });
      this.btnColor = "primary";
      this.btnText = "SUBMIT";
    } else if (this.function_type == "VIEW") {
      if (this.rolesData.accessRights.length > 0) {

        let myDisplayArray = this.getLocalAccessRights();

        let rolesdata = [];
        this.rolesData.accessRights.forEach(role => {
          
          role.selected = false;

          rolesdata.push(role)

        });

        let displayArray = new Set<{ name: string; selected: boolean; accessRights: string }>(myDisplayArray);

        rolesdata.forEach(rd => {

          for(const item of displayArray){
            if(JSON.stringify(item) === JSON.stringify(rd)){
              let currentItem: any = item;

              displayArray.delete(item);
              currentItem.selected = true;
              displayArray.add(currentItem)
            }
          }
        })

        this.displayArray = [];

        this.displayArray = Array.from(displayArray);
        this.accessRightsLoaded = true;

      } else {

        this.displayArray = this.getLocalAccessRights();
        
      }
      this.accessRightsLoaded = true;

      this.onInitForm();
      this.apiFormData.patchValue({
        role: this.rolesData.name,
      });
      this.isDisabled = true;
      this.hideBtn = true;
      this.onShowResults = true;
    } else if (this.function_type == "UPDATE") {
      if (this.rolesData.accessRights.length > 0) {

        let myDisplayArray = this.getLocalAccessRights();

        let rolesdata = [];
        this.rolesData.accessRights.forEach(role => {
      
          role.selected = false;

          rolesdata.push(role)

        });

        let displayArray = new Set<{ name: string; selected: boolean; accessRights: string }>(myDisplayArray);

        rolesdata.forEach(rd => {

          for(const item of displayArray){
            if(JSON.stringify(item) === JSON.stringify(rd)){

              let currentItem: any = item;

              displayArray.delete(item);
              currentItem.selected = true;
              displayArray.add(currentItem)
            }
          }
        })

        this.displayArray = [];

        this.displayArray = Array.from(displayArray);
        this.accessRightsLoaded = true;

      } else {

        this.displayArray = this.getLocalAccessRights();

      }

      this.onInitForm();
      this.apiFormData.patchValue({
        role: this.rolesData.name,
      });
      this.btnColor = "primary";
      this.btnText = "UPDATE";
    } else if (this.function_type == "DELETE") {
      if (this.rolesData.accessRights.length > 0) {

        let myDisplayArray = this.getLocalAccessRights();

        let rolesdata = [];
        this.rolesData.accessRights.forEach(role => {
          
          role.selected = false;

          rolesdata.push(role)

        });

        let displayArray = new Set<{ name: string; selected: boolean; accessRights: string }>(myDisplayArray);

        rolesdata.forEach(rd => {

          for(const item of displayArray){
            if(JSON.stringify(item) === JSON.stringify(rd)){
              let currentItem: any = item;

              displayArray.delete(item);
              currentItem.selected = true;
              displayArray.add(currentItem)
            }
          }
        })

        this.displayArray = [];

        this.displayArray = Array.from(displayArray);
        this.accessRightsLoaded = true;

      } else {

        this.displayArray = this.getLocalAccessRights();
        
      }

      this.onInitForm();
      this.apiFormData.patchValue({
        role: this.rolesData.name,
      });
      this.isDisabled = true;
      this.onShowResults = true;

      this.btnColor = "warn";
      this.btnText = "DEACTIVATE";
      this.onShowResults = true;
    }else if (this.function_type == "ACTIVATE"){
      if (this.rolesData.accessRights.length > 0) {

        let myDisplayArray = this.getLocalAccessRights();

        let rolesdata = [];
        this.rolesData.accessRights.forEach(role => {
          
          role.selected = false;

          rolesdata.push(role)

        });

        let displayArray = new Set<{ name: string; selected: boolean; accessRights: string }>(myDisplayArray);

        rolesdata.forEach(rd => {

          for(const item of displayArray){
            if(JSON.stringify(item) === JSON.stringify(rd)){
              let currentItem: any = item;

              displayArray.delete(item);
              currentItem.selected = true;
              displayArray.add(currentItem)
            }
          }
        })

        this.displayArray = [];

        this.displayArray = Array.from(displayArray);
        this.accessRightsLoaded = true;

      } else {

        this.displayArray = this.getLocalAccessRights();
        
      }

      this.onInitForm();
      this.apiFormData.patchValue({
        role: this.rolesData.name,
      });
      this.isDisabled = true;
      this.onShowResults = true;

      this.btnColor = "primary";
      this.btnText = "ACTIVATE";
      this.onShowResults = true;
    }
  }

  getAccessRights() {
    this.roleService
      .fetchAllAccessRights()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          // console.log("Access Rights ", res);

          this.basicActionsAddOns = res;
          this.basicActionsAddOns.forEach((privilege) => {
            privilege.selected = false;
          });

          const displayArray = this.basicActionsAddOns;

          localStorage.removeItem(ACESS_RIGHTS);

          localStorage.setItem(ACESS_RIGHTS, JSON.stringify(displayArray));

          return this.basicActionsAddOns;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  onSubmit() {
    if (this.function_type == "ADD") {
      let privileges = <FormArray>this.apiFormData.get("privileges");

      privileges.clear();

      for (let i = 0; i < this.displayArray.length; i++) {
        if (this.displayArray[i].selected == true) {
          privileges.push(this.fb.control(this.displayArray[i].accessRights));
        }
      }

      console.log("Form Value ", this.apiFormData.value);

      
      if (this.apiFormData.valid) {
        this.loading = true;
        this.roleService.createRole(this.apiFormData.value).subscribe(
          (res) => {
            this.notificationAPI.alertSuccess("Role Added Successfully");
            this.router.navigate([`/admin/roles/view`]);
          },
          (err) => {
            this.loading = false;
            this.notificationAPI.alertWarning(err.message);
            this.router.navigate([`/admin/roles/view`]);
          }
        );
      } else {
        this.loading = false;
        this.notificationAPI.alertWarning("Invalid Form");
      }
    } else if (this.function_type == "UPDATE") {
      this.loading = true;

      let privileges = <FormArray>this.apiFormData.get("privileges");

      privileges.clear();

      for (let i = 0; i < this.displayArray.length; i++) {
        if (this.displayArray[i].selected == true) {
          privileges.push(this.fb.control(this.displayArray[i].accessRights));
        }
      }

      this.roleService
        .updateRole(this.rolesData.id, this.apiFormData.value)
        .subscribe(
          (res) => {
            this.notificationAPI.alertSuccess("Role Updated Successfully");
            this.router.navigate([`/admin/roles/view`]);
            this.loading = false;
          },
          (err) => {
            this.loading = false;
            this.notificationAPI.alertWarning(err.message);
            this.router.navigate([`/admin/roles/view`]);
          }
        );
    } else if (this.function_type == "DELETE") {
      this.loading = true;

      this.roleService.deactivateRole(this.rolesData.id).subscribe(
        (res) => {
          this.loading = false;
          this.notificationAPI.alertSuccess("Role deactivated successfully");
          this.router.navigate([`/admin/roles/view`]);
        },
        (err) => {
          this.loading = false;
          this.notificationAPI.alertWarning(err.message);
          this.router.navigate([`/admin/roles/view`]);
        }
      );
    }else if (this.function_type == "ACTIVATE"){
      this.loading = true;

      this.roleService.activateRole(this.rolesData.id).subscribe(
        (res) => {
          this.loading = false;
          this.notificationAPI.alertSuccess("Role activated successfully !");
          this.router.navigate([`/admin/roles/view`]);
        },
        (err) => {
          this.loading = false;
          this.notificationAPI.alertWarning(err.message);
          this.router.navigate([`/admin/roles/view`]);
        }
      );
    }
  }

  ngOnDestroy() {
    localStorage.removeItem("editRolesData");
    localStorage.removeItem("viewRolesData");
  }

  toggleAll(selected: boolean) {
    this.displayArray.forEach((privilege) => (privilege.selected = selected));
  }

  checkIfAllSelected() {
    const allSelected = this.displayArray.every(
      (privilege) => privilege.selected
    );
    if (allSelected) {
      this.toggleAll(true);
    }
  }

  allSelected() {
    return this.displayArray.every((privilege) => privilege.selected);
  }
}
