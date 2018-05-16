/* class used to map the data from the table in to the form control */
export class Address {
  type: string;
  street: string;
  block: string;
  area: string;
  postcode: string;
  country: string;

  Address(type: string, street: string, block: string, area: string, postcode: string, country: string) : Address{
    this.type = type;
    this.street = street;
    this.block = block;
    this.area = area;
    this.postcode = postcode;
    this.country = country;
    return this;
  }

  IsEmpty() : boolean {
    if (this.type === '' && this.street === '' && this.block === '' && this.area === '' && this.postcode === '' && this.country === '') {
        return true;
    }
    return false;
  }
}
