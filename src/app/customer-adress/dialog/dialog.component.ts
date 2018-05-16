import { Inject, Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, FormControl, FormGroupDirective, NgForm, Validators, FormArray } from '@angular/forms';
import { Address } from '../../address'


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponentAddr implements OnInit {

  tempData : Address;
  dialogFormControl : FormGroup;

  constructor( public dialogRef: MatDialogRef<DialogComponentAddr>, @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder : FormBuilder) { 
    this.tempData = data;
  }

  ngOnInit(){
    this.buildForm();
  }

  buildForm() {
    this.dialogFormControl = this.formBuilder.group({
      type : this.tempData.type,
      street: this.tempData.street,
      block: this.tempData.block,
      area: this.tempData.area,
      postcode: this.tempData.postcode,
      country: this.tempData.country
    }) 
  }

  /* cancel button function */
  onNoClick(): void {
    this.dialogRef.close();
  }

  /* save button function */
  onSave() {
    this.data = this.dialogFormControl.value as Address;
    console.log(this.data);
    this.dialogRef.close(this.data);
  }


}
