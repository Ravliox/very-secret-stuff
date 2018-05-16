import { Component, Input, EventEmitter, Output, OnInit} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl, FormGroupDirective, NgForm, Validators, FormControlName } from '@angular/forms';
import { Address } from '../address';
import { FormService } from '../form.service';
import { CancelToken } from '../cancel-token';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-form-app',
  templateUrl: './form-app.component.html',
  styleUrls: ['./form-app.component.css']
})

/* the master component for the form section of the application. routed on /app */
export class FormAppComponent implements OnInit {

  ngOnInit(): void {
  }
  
  readonly : boolean;
  cancelToken : CancelToken;
  formControlApp : FormGroup;

  constructor(private formBuilder : FormBuilder, private formService : FormService, private route : ActivatedRoute) {
    this.readonly = this.route.snapshot.queryParams["readonly"];
    this.createForm();
  }

  createForm () {
    this.formControlApp = this.formBuilder.group({
      tabs: this.formBuilder.group({})
    })
  }

  /* function used for the saved button */
  showDetails() {
    console.log(this.formControlApp.value);
    console.log(this.formControlApp);
  }

  /* function used for the submit button */
  submitForm() {
    if(this.formControlApp.valid) {
      alert ("Form submitted!");
    } else {
      alert ("Fill in all the fields!");
    }
  }

  /* function used for the cancel button */
  cancelForm() {
    let rez = confirm("Are you sure you want to cancel?");
    if (rez) {
      this.formControlApp.reset();
      this.cancelToken = new CancelToken();             // passes a new instance of the CancelToken to the tabs component for change detection
    }
  }
}
