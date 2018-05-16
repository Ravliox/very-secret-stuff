import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { User } from '../user';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SignInComponent implements OnInit {

  private loginControl : FormGroup
  private user : User;
  readonly = true;

  constructor(private formBuilder : FormBuilder, private localStorage : LocalStorageService, private snackBar: MatSnackBar, private router : Router) { }

  ngOnInit() {
    this.buildForm()
    this.localStorage.checkDB();
  }

  buildForm() {
    this.loginControl = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  /* creates an user instance and passes it to the authentification service and checks the result */
  signIn() {
    this.user = new User();
    this.user.User('', '', '', '', '', this.loginControl.get("login").value, this.loginControl.get("password").value);

    var result;

    this.localStorage.authentificate(this.user).subscribe(
      authResult => result = authResult
    )

    if (result === false) {
      this.snackBar.open('Invalid username or password!', '', {
        duration: 2000
      });
    } else {
      this.router.navigate(['/app/personal']);
    }
  }

  /* adds a query parameter to the signIn function */
  signInReadOnly() {
    this.user = new User();
    this.user.User('', '', '', '', '', this.loginControl.get("login").value, this.loginControl.get("password").value);

    var result;

    this.localStorage.authentificate(this.user).subscribe(
      authResult => {
        result = authResult;
        if (result === false) {
          this.snackBar.open('Invalid username or password!', '', {
            duration: 2000
          });
        } else {
          this.router.navigate(['/app/personal'], {queryParams: { readonly: 'true' }});
        }
      }
    )
  }
}
