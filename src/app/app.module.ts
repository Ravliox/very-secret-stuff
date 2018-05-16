import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuardService } from './login-guard.service';
import { SharedModule } from './shared/shared.module'
import { AddressService } from './address.service';
import { FormService } from './form.service';
import { LocalStorageService } from './local-storage.service';
import { DatePipe } from '@angular/common';

const appRoutes: Routes = [
  { path: '', loadChildren: './create-account/create-account.module#CreateAccountModule' },
  { path: 'signin', loadChildren: './sign-in/sign-in.module#SignInModule' },
  { path: 'app', loadChildren: './form-app/form-app.module#FormAppModule', /*canActivate: [LoginGuardService] */}
]


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [DatePipe, LoginGuardService, AddressService, FormService, LocalStorageService],
  bootstrap: [AppComponent]
})

export class AppModule { }
