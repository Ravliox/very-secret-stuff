import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatSnackBarModule, MatCardModule, MatRadioModule, MatTableModule, MatSelectModule, MatTabsModule, MatNativeDateModule, MatDatepickerModule, MatInputModule, MatFormFieldModule, MatCheckboxModule} from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateService} from '@ngx-translate/core';
import { FlexLayoutModule} from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AngularFontAwesomeModule } from 'angular-font-awesome';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

/* shared module for all lazy loaded modules in the application */
@NgModule({
  imports: [
    CommonModule,
    MatDialogModule, MatSnackBarModule, MatCardModule, MatRadioModule, MatTableModule, MatSelectModule, MatTabsModule, MatNativeDateModule, MatDatepickerModule, MatInputModule, MatFormFieldModule, MatCheckboxModule, MatButtonModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
  ],
  declarations: [],
  providers: [TranslateService],
  exports: [
    CommonModule,
    MatDialogModule, MatSnackBarModule, MatCardModule, MatRadioModule, MatTableModule, MatSelectModule, MatTabsModule, MatNativeDateModule, MatDatepickerModule, MatInputModule, MatFormFieldModule, MatCheckboxModule,
    MatButtonModule,
    HttpClientModule,
    TranslateModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
  ],
})

export class SharedModule {
  constructor(private translate:TranslateService){
      translate.use('en');
    } 
}
