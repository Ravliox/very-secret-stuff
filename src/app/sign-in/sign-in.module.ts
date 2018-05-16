import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateService} from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { SignInRoutingModule } from './sign-in-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SignInComponent } from './sign-in.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

/* sign-in lazy loaded module */
@NgModule({
  imports: [
    CommonModule,
    SignInRoutingModule,
    SharedModule,
    HttpClientModule,
    TranslateModule.forChild({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    })
  ],
  declarations: [SignInComponent]
})
export class SignInModule { }
