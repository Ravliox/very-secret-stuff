import { Input, Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { FormService } from '../form.service';
import { Subscription } from 'rxjs/Subscription';
import { User } from '../user';
import { LocalStorageService } from '../local-storage.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-personal-details-tab',
  templateUrl: './personal-details-tab.component.html',
  styleUrls: ['./personal-details-tab.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PersonalDetailsTabComponent implements OnInit {
  @Input() 
  subscription: Subscription;
  private user : User;

  personalDetailsTabControl : FormGroup;

  constructor(private formBuilder : FormBuilder, private formService : FormService, private localStorage : LocalStorageService, private route : ActivatedRoute) { 
    /* listen for the reset signal from the formService passed by the tabs component */
    this.subscription = formService.resetFormSubject.subscribe(fg => {
      this.buildForm();
    })
  }

  /* gets the active user that has logged in. if logging in has been bypassed use default value of user from the service */
  ngOnInit() {
    this.user = new User();
    this.localStorage.getActiveUser().subscribe(user => this.user = user);

    if (this.user === undefined) {
      this.localStorage.emergencyUser().subscribe(user => this.user = user);
    }
    this.buildForm();
  }

  buildForm() {
    this.personalDetailsTabControl = this.formService.passPersonalControls();
    this.personalDetailsTabControl.addControl('personalDetails', this.formBuilder.group ({}));
    this.personalDetailsTabControl.addControl('customerInformation', this.formBuilder.array ([]));
    this.personalDetailsTabControl.addControl('customerAddress', this.formBuilder.group ({}));
  }
}
