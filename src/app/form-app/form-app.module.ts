import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateService} from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormAppRoutingModule } from './form-app-routing.module';
import { FormAppComponent } from './form-app.component';
import { TabsComponent } from '../tabs/tabs.component';
import { PersonalDetailsTabComponent } from '../personal-details-tab/personal-details-tab.component';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { AppHeaderComponent } from '../app-header/app-header.component';
import { PersonalDetailsComponent } from '../personal-details/personal-details.component';
import { CustomerInformationComponent } from '../customer-information/customer-information.component';
import { CustomerAdressComponent } from '../customer-adress/customer-adress.component';
import { CreditCardDetailsComponent } from '../credit-card-details/credit-card-details.component';
import { CardDeliveryComponent } from '../card-delivery/card-delivery.component';
import { DialogComponent } from '../customer-information/dialog/dialog.component';
import { DialogComponentAddr } from '../customer-adress/dialog/dialog.component';
import { DetailsComponent } from '../details/details.component';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

/* form-app lazy loaded module */
@NgModule({
  imports: [
    CommonModule,
    FormAppRoutingModule,
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
  declarations: [
    FormAppComponent, 
    TabsComponent, 
    PersonalDetailsTabComponent, 
    ProductDetailsComponent,
    AppHeaderComponent,
    PersonalDetailsComponent,
    CustomerInformationComponent,
    CustomerAdressComponent,
    CreditCardDetailsComponent,
    CardDeliveryComponent,
    DialogComponent,
    DialogComponentAddr,
    DetailsComponent
  ],
  entryComponents: [
    DialogComponent,
    DialogComponentAddr
  ],
})
export class FormAppModule { }
