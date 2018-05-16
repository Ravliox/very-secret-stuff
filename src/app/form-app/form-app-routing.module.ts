import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormAppComponent } from './form-app.component';
import { PersonalDetailsTabComponent } from '../personal-details-tab/personal-details-tab.component';
import { ProductDetailsComponent } from '../product-details/product-details.component';

const routes: Routes = [
  { path: '', component: FormAppComponent, children: [
    { path: '', redirectTo: 'personal', pathMatch: 'full'},
    { path: 'personal', component:  PersonalDetailsTabComponent},
    { path: 'product',  component:  ProductDetailsComponent} 
  ]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormAppRoutingModule { }


/* , children:[
    { path: '', redirectTo: 'personal', pathMatch: 'full'},
    { path: 'personal', component:  PersonalDetailsTabComponent},
    { path: 'product',  component:  ProductDetailsComponent} 
*/