import { Input, Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router, Params } from '@angular/router';
import { FormService } from '../form.service';
import { CancelToken } from '../cancel-token';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush

})
export class TabsComponent implements OnInit {
  @Input() tabsControl: FormGroup
  @Input() cancelToken: CancelToken

  navLinks: any[];            // array used for tab routing

  constructor(private formBuilder : FormBuilder, private router : Router, private formService : FormService, private route : ActivatedRoute) {
    this.navLinks = [
      {
        label: 'Personal Details',
        path: 'personal' ,
        index: 0
      },
      {
        label: 'Product Details',
        path: 'product',
        index: 1
      }
    ]
  }

  /* listens for changes for the cancelToken instance */
  ngOnChanges() {
    if(this.cancelToken)
      this.cancel();
  }

  /* passes the tabsControl instance to the formService for the child components to receive and modify */
  ngOnInit() {
    this.buildform();
    this.formService.holdTabControls(this.tabsControl);
  }

  buildform() {
    this.tabsControl.addControl('personalDetailsTab', this.formBuilder.group({}));
    this.tabsControl.addControl('productDetails', this.formBuilder.group({}));
  }

  /* resets the form */
  cancel() {
    this.formService.reset();
  }

}
