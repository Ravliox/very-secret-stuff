import { Input, Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { FormService } from '../form.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class ProductDetailsComponent implements OnInit {

  @Input() productDetailsController : FormGroup
  subscription: Subscription;

  constructor(private formBuilder : FormBuilder, private formService : FormService) {
    /* listen for the reset signal from the formService passed by the tabs component */ 
    this.subscription = formService.resetFormSubject.subscribe(fg => {
      this.buildForm();
    })
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.productDetailsController = this.formService.passProductControls();
    this.productDetailsController.addControl('creditCardDetails', this.formBuilder.group({}));
    this.productDetailsController.addControl('credit_card_delivery', this.formBuilder.group({}));
  }

}
