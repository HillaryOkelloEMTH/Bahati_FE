import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RolesComponent } from '../roles/roles.component';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.sass']
})
export class RoleComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<RolesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  onClick(){
    this.dialogRef.close()
  }

}
