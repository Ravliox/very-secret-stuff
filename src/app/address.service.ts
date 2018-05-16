import { Injectable } from '@angular/core';
import { Address } from './address';

@Injectable()
/* service used to pass data from the table to the card delivery component */
export class AddressService {

  private addressData : Address[] = [
    new Address().Address('', '', '', '', '', '')
  ];

  constructor() { }

  postAddressData(addressData : Address[]) {
    this.addressData = addressData;
  }

  getAddressData() : Address[]{
    return this.addressData;
  }

  resetData() : void {
    this.addressData = [ new Address().Address('', '', '', '', '', '') ];
  }
}
