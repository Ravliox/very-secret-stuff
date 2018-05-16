import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { LocalStorageService } from '../local-storage.service';
import { User } from '../user';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SignUpComponent implements OnInit {
  title_label: string;

  signUpControl : FormGroup
  private user : User;

  constructor(private formBuilder : FormBuilder, private localStorage : LocalStorageService, private router : Router, private translate: TranslateService) { }

  /* select options */
  titles = [
    {value: 'mr', viewValue: 'app.tabs.personal_details_tab.personal_details.title_options.mr'},
    {value: 'mrs', viewValue: 'app.tabs.personal_details_tab.personal_details.title_options.mrs'},
    {value: 'miss', viewValue: 'app.tabs.personal_details_tab.personal_details.title_options.miss'},
    {value: 'mx', viewValue: 'app.tabs.personal_details_tab.personal_details.title_options.mx'}
  ]

  ngOnInit() {
    this.user = new User();
    this.buildForm();
  }

  buildForm() {
    this.signUpControl = this.formBuilder.group({});
    this.signUpControl.addControl('title', this.formBuilder.control('', Validators.required));
    this.signUpControl.addControl('first_name', this.formBuilder.control('', [Validators.required, Validators.pattern('^[a-zA-Z\s]*$')]));
    this.signUpControl.addControl('middle_name',  this.formBuilder.control('', Validators.pattern('^[a-zA-Z\s]*$')));
    this.signUpControl.addControl('last_name', this.formBuilder.control('', [Validators.required, Validators.pattern('^[a-zA-Z\s]*$')]));
    this.signUpControl.addControl('email', this.formBuilder.control('', Validators.email));
    this.signUpControl.addControl('username', this.formBuilder.control('', Validators.required));
    this.signUpControl.addControl('password', this.formBuilder.control('', Validators. required));
    this.signUpControl.addControl('confirm_pass', this.formBuilder.control('', [Validators.required, c => this.validatePassword(c as FormControl)]))
  }
  
  getError(input : String):String {
    switch (input){
      case 'title':
        return this.signUpControl.controls.title.hasError('required') ? 'You must enter a value' : '';
        case 'first_name':
          return this.signUpControl.controls.first_name.hasError('required') ? 'You must enter a value' :
            this.signUpControl.controls.first_name.hasError('pattern') ? 'Invalid Name' : '';
        case 'middle_name': 
          return this.signUpControl.controls.middle_name.hasError('pattern') ? 'Invalid Name' : '';
        case 'last_name':
          return this.signUpControl.controls.last_name.hasError('required') ? 'You must enter a value' :
            this.signUpControl.controls.last_name.hasError('pattern') ? 'Invalid Name' : '';
        case 'email':
          return this.signUpControl.controls.email.hasError('email') ? 'Invalid Email' : ''
        case 'username':
          return this.signUpControl.controls.username.hasError('required') ? 'You must enter a value' : ''
        case 'password':
          return this.signUpControl.controls.password.hasError('required') ? 'You must enter a value' : ''
        case 'confirm_pass':
          return this.signUpControl.controls.confirm_pass.hasError('required') ? 'You must enter a value' : 
          this.signUpControl.controls.confirm_pass.hasError('validatePassword') ? 'Passwords must match' : ''
    }
  }

  /* validate if password and confirm password match */
  validatePassword(formControl : FormControl) {
    var pass = this.signUpControl.get("password").value;

    return pass === formControl.value ? null : {
      validatePassword: {
        valid: false
      }
    } 
  }

  /* updates the value of the confirmation input if the password input has been updated */
  checkConfirm () {
    var confirm_pass = this.signUpControl.get("confirm_pass");
    confirm_pass.updateValueAndValidity();
  }

  /* adds the user object to the local storage */
  postUser () {
    if (this.signUpControl.valid) {
      this.user.User(this.signUpControl.get("title").value, this.signUpControl.get("first_name").value, this.signUpControl.get("middle_name").value, this.signUpControl.get("last_name").value,
                      this.signUpControl.get("email").value, this.signUpControl.get("username").value, this.signUpControl.get("password").value);
      this.localStorage.postUser(this.user);
      this.router.navigateByUrl('/signin');
    } else {
      alert("Fill in all the fields!");
    }
  }
    
}