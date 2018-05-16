import { Input, Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { User } from '../user';
import { LocalStorageService } from '../local-storage.service';
import { ActivatedRoute } from '@angular/router';
import { MatDatepickerInputEvent } from '@angular/material';


@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class PersonalDetailsComponent implements OnInit {
  @Input() personalDetailsControl : FormGroup
  @Input() user : User;

  readonly : boolean;

  /* select options */
  titles = [
    {value: 'mr', viewValue: 'app.tabs.personal_details_tab.personal_details.title_options.mr'},
    {value: 'mrs', viewValue: 'app.tabs.personal_details_tab.personal_details.title_options.mrs'},
    {value: 'miss', viewValue: 'app.tabs.personal_details_tab.personal_details.title_options.miss'},
    {value: 'mx', viewValue: 'app.tabs.personal_details_tab.personal_details.title_options.mx'}
  ]
  
  genders = [
    {value: 'male', viewValue: 'app.tabs.personal_details_tab.personal_details.gender_options.male'},
    {value: 'female', viewValue: 'app.tabs.personal_details_tab.personal_details.gender_options.female'},
    {value: 'other', viewValue: 'app.tabs.personal_details_tab.personal_details.gender_options.other'}
  ]

    
  nationalities = [
    {value: 'romanian', viewValue: 'app.tabs.personal_details_tab.personal_details.nationality_options.romanian'},
    {value: 'french', viewValue: 'app.tabs.personal_details_tab.personal_details.nationality_options.french'},
    {value: 'other', viewValue: 'app.tabs.personal_details_tab.personal_details.nationality_options.other'}
  ]

  marital_options = [
    {value: 'married', viewValue: 'app.tabs.personal_details_tab.personal_details.marital_options.married'},
    {value: 'not_married', viewValue: 'app.tabs.personal_details_tab.personal_details.marital_options.not_married'}
  ]

  qualifications = [
    {value: 'option 1', viewValue: 'app.tabs.personal_details_tab.personal_details.educational_options.option1'},
    {value: 'option 2', viewValue: 'app.tabs.personal_details_tab.personal_details.educational_options.option2'}
  ]

  constructor(private formBuilder : FormBuilder, private localStorage : LocalStorageService,  private route : ActivatedRoute) { 
  }

  ngOnInit() {
    this.readonly = this.route.snapshot.queryParams["readonly"];
    this.buildForm(this.user);
  }

  buildForm(user : User) {
    this.personalDetailsControl.addControl('title', this.formBuilder.control(user.title, this.readonly ? [] :Validators.required));
    this.personalDetailsControl.addControl('first_name', this.formBuilder.control(user.first_name, this.readonly ? [] :[Validators.required, Validators.pattern('^[a-zA-Z\s]*$')]));
    this.personalDetailsControl.addControl('middle_name',  this.formBuilder.control(user.middle_name, this.readonly ? [] :Validators.pattern('^[a-zA-Z\s]*$')));
    this.personalDetailsControl.addControl('last_name',  this.formBuilder.control(user.last_name, [Validators.required, Validators.pattern('^[a-zA-Z\s]*$')]));
    this.personalDetailsControl.addControl('gender', this.formBuilder.control('', this.readonly ? [] :Validators.required));
    this.personalDetailsControl.addControl('nationality', this.formBuilder.control('', this.readonly ? [] :Validators.required));
    this.personalDetailsControl.addControl('date_of_birth', this.formBuilder.control('', this.readonly ? [] : [Validators.required, this.validateAge]));
    this.personalDetailsControl.addControl('marital_status', this.formBuilder.control('',this.readonly ? [] : Validators.required));
    this.personalDetailsControl.addControl('age', this.formBuilder.control(''));
    this.personalDetailsControl.addControl('educational_qualification', this.formBuilder.control(''));
  }

  getError(input : String):String {
    switch (input){
      case 'title':
        return this.personalDetailsControl.controls.title.hasError('required') ? 'You must enter a value' : '';
      case 'first_name':
        return this.personalDetailsControl.controls.first_name.hasError('required') ? 'You must enter a value' :
          this.personalDetailsControl.controls.first_name.hasError('pattern') ? 'Invalid Name' : '';
      case 'middle_name':
        return this.personalDetailsControl.controls.middle_name.hasError('pattern') ? 'Invalid Name' : '';
      case 'last_name':
        return this.personalDetailsControl.controls.last_name.hasError('required') ? 'You must enter a value' :
          this.personalDetailsControl.controls.last_name.hasError('pattern') ? 'Invalid Name' : '';      
      case 'gender':
        return this.personalDetailsControl.controls.gender.hasError('required') ? 'You must enter a value' : '';
      case 'nationality':
        return this.personalDetailsControl.controls.nationality.hasError('required') ? 'You must enter a value' : '';
      case 'date_of_birth':
        return this.personalDetailsControl.controls.date_of_birth.hasError('required') ? 'You must enter a value' : 
          this.personalDetailsControl.controls.date_of_birth.hasError('validateAge') ? 'Age must be over 18!' : '';
      case 'marital':
        return this.personalDetailsControl.controls.marital_status.hasError('required') ? 'You must enter a value' : '';
      case 'qualification':
        return this.personalDetailsControl.controls.educational_qualification.hasError('required') ? 'You must enter a value' : '';
    }
  }

  /* date picker focusout event */
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.calculateAge(event.value);
  }

  /* calculates the age and sets the value of the age input to it */
  calculateAge(value) {
    var age_ms = new Date().getTime() - Date.parse(value);
    var age = Math.floor(age_ms * 3.16887646 * Math.pow(10, -11));
    age > 0 ? '' : age = 0;
    this.personalDetailsControl.controls.age.setValue(age);
  }

  /* custom 18+ age validator */
  validateAge(formControl : FormControl){
    var age_ms = new Date().getTime() - Date.parse(formControl.value);
    var age = age_ms * 3.16887646 * Math.pow(10, -11);

    return age > 18 ? null : {
      validateAge: {
        valid: false
      }
    }
  }
}
