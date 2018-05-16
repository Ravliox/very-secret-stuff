import { Inject, Input, Component, OnInit, NgModule, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormGroupDirective, NgForm, Validators, FormArray } from '@angular/forms';
import { User } from '../user';
import { ActivatedRoute } from '@angular/router';
import { CustomerInformation } from '../customer-information';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-customer-information',
  templateUrl: './customer-information.component.html',
  styleUrls: ['./customer-information.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerInformationComponent implements OnInit {

  @Input() customerInformationControl: FormArray
  @Input() user : User;

  readonly : boolean;

  customerInformations: CustomerInformation[] = [
    new CustomerInformation().CustomerInformation('', '', '')
  ]

  constructor(private formBuilder : FormBuilder, private route : ActivatedRoute, public dialog: MatDialog) {

  }

  ngOnInit() {
    this.readonly = this.route.snapshot.queryParams["readonly"];
    if (this.customerInformationControl.length === 0) {
      this.buildForm();
    }

  }

  /* create a new form group and push it in to the form array */
  buildForm () {
    var customerFormGroup = this.formBuilder.group({});

    customerFormGroup.addControl('mobile_no', this.formBuilder.control('', this.readonly ? [] :[Validators.required, Validators.pattern('^[0-9]+$'), c => this.validateMobileNo(c as FormControl)]))
    customerFormGroup.addControl('alternate_mobile_no', this.formBuilder.control('', this.readonly ? [] :[Validators.pattern('^[0-9]+$'), c => this.validateMobileNo(c as FormControl)])),
    customerFormGroup.addControl('email', this.formBuilder.control(this.user.email, this.readonly ? [] :Validators.email))
    
    this.customerInformationControl.push(customerFormGroup);
  }

  getError(input, control : FormControl){
    switch (input) {
      case "mobile":
        return control.hasError('required') ? 'You must enter a value' :
          control.hasError('pattern') ? 'You must enter a number' : 
          control.hasError('validateMobileNo') ? 'Number must start with 5, 6 or 9' : ''
      case "alt_mobile":
        return control.hasError('pattern') ? 'You must enter a number' : 
          control.hasError('validateMobileNo') ? 'Number must start with 5, 6 or 9' : ''
      case "email":
        return control.hasError('email') ? 'Not a valid email address' : ''
    }
  }

  /* custom validation function for the first digit of the mobile number input value */
  validateMobileNo(formControl : FormControl) {
    if (formControl.value){
      var firstDigit = formControl.value.charAt(0);

      return firstDigit === '5' || firstDigit === '6' || firstDigit === '9' || firstDigit === '' ? null : {
        validateMobileNo: {
          valid: false
        }
      }
    }
    return null;
  }


  /* addds another customer information form group by pushing another formgroup in to the array */
  add() : void {
    this.buildForm();
  }

  /* deletes the last element of the array if it isn't the only one */
  delete() : void {
    if (this.customerInformationControl.length !== 1) {
      this.customerInformationControl.removeAt(this.customerInformationControl.length - 1);
    } 
  }
  
}


