import  {Input, Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-credit-card-details',
  templateUrl: './credit-card-details.component.html',
  styleUrls: ['./credit-card-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreditCardDetailsComponent implements OnInit {

  @Input() creditCardDetailsControl : FormGroup

  readonly : boolean;

  /* select option arrays */
  product_names = [
    {value: 'visa', viewValue: 'app.tabs.product_details.credit_card_details.product_name_options.visa'},
    {value: 'mastercard', viewValue: 'app.tabs.product_details.credit_card_details.product_name_options.mastercard'}
  ]

  billing_accounts = [
    {value: 'account1', viewValue: 'app.tabs.product_details.credit_card_details.billing_acc_options.acc1'},
    {value: 'account2', viewValue: 'app.tabs.product_details.credit_card_details.billing_acc_options.acc2'}
  ]

  constructor(private formBuilder : FormBuilder, private route : ActivatedRoute) { }

  ngOnInit() {
    this.readonly = this.route.snapshot.queryParams["readonly"];
    this.buildForm();
  }

  buildForm() {
    this.creditCardDetailsControl.addControl('product_name', this.formBuilder.control('', this.readonly ? [] :Validators.required));
    this.creditCardDetailsControl.addControl('requested_limit', this.formBuilder.control('', this.readonly ? [] : [Validators.required, c => this.validateRequestLimit(c as FormControl)]));
    this.creditCardDetailsControl.addControl('name_on_card', this.formBuilder.control('', this.readonly ? [] :[Validators.required, Validators.pattern('^[a-z A-Z\s]*$')]));
    this.creditCardDetailsControl.addControl('billing_account', this.formBuilder.control('', this.readonly ? [] :Validators.required));
    this.creditCardDetailsControl.addControl('new_to_uae', this.formBuilder.control(''));
    this.creditCardDetailsControl.addControl('is_resident', this.formBuilder.control(''));
    this.creditCardDetailsControl.addControl('none', this.formBuilder.control(''));
  }

  getError(input) {
    switch(input){
      case ('product_name'):
        return this.creditCardDetailsControl.controls.product_name.hasError('required') ? 'You must enter a value' : ''
      case ('requested_limit'):
        return this.creditCardDetailsControl.controls.requested_limit.hasError('required') ? 'You must enter a value' : 
          this.creditCardDetailsControl.controls.requested_limit.hasError('validateRequestLimit') ? 'Mastercard Titanium request limit must be over 2000' : ''
      case ('name_on_card'):
        return this.creditCardDetailsControl.controls.name_on_card.hasError('required') ? 'You must enter a value': 
          this.creditCardDetailsControl.controls.name_on_card.hasError('pattern') ? 'Invalid Name' : ''
      case ('billing_account'):
        return this.creditCardDetailsControl.controls.billing_account.hasError('required') ? 'You must enter a value':''
    }
  }

  /* name on card input function on focusout event*/
  toUpper(){
    this.creditCardDetailsControl.get("name_on_card").setValue(this.creditCardDetailsControl.get("name_on_card").value.toUpperCase());
  }

  /* checks if product name is MasterCard Titanium. request limit must be over 2000 in that case */
  validateRequestLimit(formControl : FormControl) {
    var product_name = this.creditCardDetailsControl.get('product_name');
    if (product_name.value === 'mastercard') {
      if (parseInt(formControl.value) < 2000) {
        return {
          validateRequestLimit: {
            valid: false
          }
        }
      }
    }
    return null;
  }

}
