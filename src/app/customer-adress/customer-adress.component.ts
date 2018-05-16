import { Input, Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { Address } from '../address'
import { DataSource } from '@angular/cdk/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogComponentAddr } from './dialog/dialog.component'
import { DialogComponent } from '../customer-information/dialog/dialog.component'
import { AddressService } from '../address.service'
import { ActivatedRoute } from '@angular/router';
import { FormService } from '../form.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-customer-adress',
  templateUrl: './customer-adress.component.html',
  styleUrls: ['./customer-adress.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class CustomerAdressComponent implements OnInit {

  @Input() addressFormControl : FormGroup

  readonly : boolean;
  subscription: Subscription;

  dataSource = new MatTableDataSource<Address>();
  displayedColumns = ['type', 'street', 'block', 'area', 'postcode', 'country', 'icon'];

  constructor(private formBuilder: FormBuilder, public dialog: MatDialog, private addressService : AddressService, private route : ActivatedRoute, private formService : FormService) { 
    this.subscription = formService.resetFormSubject.subscribe(fg => {
      this.dataSource.data = [];
      this.addressService.resetData();
    })
  }

  ngOnInit() {
    this.readonly = this.route.snapshot.queryParams["readonly"];
    this.dataSource.data = this.addressService.getAddressData();
  }

  buildForm () {
    this.addressFormControl.addControl('addreses', this.formBuilder.array([]));
  }

  /* maps after every focus out of a cell the table in to a FormArray object */
  mapAddress() {
    var addressFG = this.dataSource.data.map(address => this.formBuilder.group(address));
    var addressFormArray = this.formBuilder.array(addressFG);
    this.addressFormControl.setControl('addreses', addressFormArray);
  }
  
  /* adds another row in the table by adding another Address object in the Address data model array */
  addRow() {
    const data = this.dataSource.data;
    data.push(new Address().Address('', '', '', '', '', ''));
    this.dataSource.data = data;
  }

  /* delete a row after confirmation from a dialog */
  deleteRow(element) {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: ''
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== false) {
        const data = this.dataSource.data;
        const itemIndex = data.findIndex(obj => obj === element);
        data.splice(itemIndex, 1);    
        this.dataSource.data = data;
      }
    });
  }

  /* edits the row by receiving the data object from the form control inside the dialog */
  editRow(element) {
    let dialogRef = this.dialog.open(DialogComponentAddr, {
      width: '250px',
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== false) {
        const data = this.dataSource.data;
        const itemIndex = data.findIndex(obj => obj === element);
        data[itemIndex] = new Address().Address(result.type, result.street, result.block, result.area, result.postcode, result.country);
        this.dataSource.data = data;
        this.addressService.postAddressData(this.dataSource.data);
        this.mapAddress();
      }
    });
  }
}
