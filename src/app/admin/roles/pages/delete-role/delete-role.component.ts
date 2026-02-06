import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RolesComponent } from '../roles/roles.component';

@Component({
  selector: 'app-delete-role',
  templateUrl: './delete-role.component.html',
  styleUrls: ['./delete-role.component.sass']
})
export class DeleteRoleComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<RolesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
  }

  onClick(){
    this.dialogRef.close();
  }

}
