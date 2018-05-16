import { Component, EventEmitter, Output} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl, FormGroupDirective, NgForm, Validators, FormControlName } from '@angular/forms';
import { Address } from './address';
import { FormService } from './form.service';
import { CancelToken } from './cancel-token';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  formControlApp : FormGroup;
  
  constructor(translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use('en');
  }
}
