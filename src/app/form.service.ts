import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Subject }    from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FormService {

  tabControls: FormGroup

  constructor(private formBuilder : FormBuilder) { }

  resetFormSubject = new Subject<Boolean>();

  tabControlsResetted = this.resetFormSubject.asObservable();
  
  holdTabControls(tabControls : FormGroup){
    this.tabControls = tabControls;
  }

  passPersonalControls() : FormGroup {
    return this.tabControls.get("personalDetailsTab") as FormGroup;
  }

  passProductControls() : FormGroup{
    return this.tabControls.get("productDetails") as FormGroup;
  }

  reset() {
    this.resetFormSubject.next();
  }


}
