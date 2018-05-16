import { Input, Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AddressService } from '../address.service'
import { Address } from '../address'

@Component({
  selector: 'app-card-delivery',
  templateUrl: './card-delivery.component.html',
  styleUrls: ['./card-delivery.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class CardDeliveryComponent implements OnInit {
  @Input() cardDeliveryControl : FormGroup

  constructor(private formBuilder : FormBuilder,  private route : ActivatedRoute, private addressService : AddressService) { 

  }

  readonly: boolean;

  addressData : Address[] = [
    new Address().Address('','','','','','')
  ]

  card_delivery_options = [
    {value: 'value1', viewValue: 'app.tabs.product_details.card_delivery.card_delivery_options.option1'},
    {value: 'value2', viewValue: 'app.tabs.product_details.card_delivery.card_delivery_options.option2'}
  ]

  /* credit card address options. obtained from the address service from the address grid on the personal detail tab */
  addrs = [
    {value: '0', viewValue: ''}
  ]

  ngOnInit() {
    this.readonly = this.route.snapshot.queryParams["readonly"];
    this.addressData = this.addressData.concat(this.addressService.getAddressData());
    for (let addr of this.addressData) {                                                  // iterate through the array of address options and add the non empty ones
      if (!addr.IsEmpty()) {
        this.addrs.push({
          value: (this.addressData.indexOf(addr)).toString(),
          viewValue: addr.type
        })
      }
    }
    this.buildForm();
  }

  buildForm() {
    this.cardDeliveryControl.addControl('addrs', this.formBuilder.control('0'));
    this.cardDeliveryControl.addControl('card_delivery', this.formBuilder.control('', this.readonly ? [] :Validators.required));
    this.cardDeliveryControl.addControl('customer_address', this.formBuilder.control('', this.readonly ? [] :Validators.required));
    this.cardDeliveryControl.addControl('street', this.formBuilder.control('', this.readonly ? [] :Validators.required));
    this.cardDeliveryControl.addControl('block', this.formBuilder.control('', this.readonly ? [] :Validators.required));
    this.cardDeliveryControl.addControl('area', this.formBuilder.control('', this.readonly ? [] :Validators.required));
    this.cardDeliveryControl.addControl('postcode', this.formBuilder.control('', this.readonly ? [] :Validators.required));
    this.cardDeliveryControl.addControl('country', this.formBuilder.control('', this.readonly ? [] :Validators.required));
    this.cardDeliveryControl.addControl('none', this.formBuilder.control(''));
  }

  /* adds and removes the required validators on the address inputs depenind on the radio button selected */
  isRequired(){
    let address_fields = [
      this.cardDeliveryControl.controls.street,
      this.cardDeliveryControl.controls.block,
      this.cardDeliveryControl.controls.area,
      this.cardDeliveryControl.controls.postcode,
      this.cardDeliveryControl.controls.country
    ]

    if (this.cardDeliveryControl.controls.customer_address.value == '1' || this.readonly)
    {
      for (var address_input of address_fields) {
        address_input.clearValidators();
        address_input.markAsUntouched();
      }
      return false;
    }
    for (var address_input of address_fields) {
      address_input.setValidators(Validators.required);
    }
    return true;
  }

  getError(input){
    switch(input) {
      case 'card_delivery':
        return this.cardDeliveryControl.controls.card_delivery.hasError('required') ? 'You must enter a value' : ''
      case 'street':
        return this.cardDeliveryControl.controls.street.hasError('required') ? 'You must enter a value' : ''
      case 'block':
        return this.cardDeliveryControl.controls.block.hasError('required') ? 'You must enter a value' : ''
      case 'area':
        return this.cardDeliveryControl.controls.area.hasError('required') ? 'You must enter a value' : ''
      case 'postcode':
        return this.cardDeliveryControl.controls.postcode.hasError('required') ? 'You must enter a value' : ''
      case 'country':
        return this.cardDeliveryControl.controls.country.hasError('required') ? 'You must enter a value' : ''
    }
  }
  
  /* sets the value in the address inputs from the address options select from the data obtain from the addresss-service  */
  setAddr(value) {
    this.cardDeliveryControl.get("street").setValue(this.addressData[value].street);
    this.cardDeliveryControl.get("block").setValue(this.addressData[value].block);
    this.cardDeliveryControl.get("area").setValue(this.addressData[value].area);
    this.cardDeliveryControl.get("postcode").setValue(this.addressData[value].postcode);
    this.cardDeliveryControl.get("country").setValue(this.addressData[value].country);
  }

}
