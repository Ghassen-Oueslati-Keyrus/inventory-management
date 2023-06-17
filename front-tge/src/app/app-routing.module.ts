import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddLocComponent } from './components/add-loc/add-loc.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ContactezNousComponent } from './components/contactez-nous/contactez-nous.component';
import { DashbordAdminComponent } from './components/dashbord-admin/dashbord-admin.component';
import { EditLocComponent } from './components/edit-loc/edit-loc.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { EmailVerifiedComponent } from './components/email-verified/email-verified.component';
import { EntrepriseComponent } from './components/entreprise/entreprise.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { HomeComponent } from './components/home/home.component';
import { LocalisationComponent } from './components/localisation/localisation.component';
import { LocationComponent } from './components/location/location.component';
import { LoginComponent } from './components/login/login.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductsingleComponent } from './components/productsingle/productsingle.component';
import { ProfilDetailsComponent } from './components/profil-details/profil-details.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LocationTableComponent } from './components/dashbord-admin/location-table/location-table.component';
import { ServiceComponent } from './components/service/service.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { AddAccountComponent } from './components/add-account/add-account.component';
import { DevisFormComponent } from './components/devis-form/devis-form.component';
import { ListDevisComponent } from './components/list-devis/list-devis.component';
import { CategoryTableComponent } from './components/dashbord-admin/category-table/category-table.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "login", component: LoginComponent },
  {path: "signup", component: SignUpComponent},
  {path: "add", component: AddProductComponent},
  {path:"mail/verify",component:EmailVerifiedComponent},
  {path : "contactez-nous", component : ContactezNousComponent},
  { path : "localisation", component : LocalisationComponent},
  {path : "entreprise", component : EntrepriseComponent},
  {path: "profile" , component :  ProfilDetailsComponent},
  {path: "password/reset" , component : ChangePasswordComponent}, 
  {path: "forgot", component : ForgotPasswordComponent},
  {path:"list" , component : ProductListComponent},
  {path: "edit/:id", component: EditProductComponent},
  {path: "single/:id", component: ProductsingleComponent},
  {path: "loc", component: LocationComponent},
  {path: "add-loc", component: AddLocComponent},
  {path: "edit-loc/:id", component: EditLocComponent},
  {path: "dashbord", component: DashbordAdminComponent},
  {path: "locationtable", component: LocationTableComponent},
  {path: "service", component: ServiceComponent},
  {path: "accounts", component: AccountsComponent},
  {path: "addAccount", component: AddAccountComponent},
  {path: "list/:idCat", component: ProductListComponent},
  {path: "add-cat", component: CategoryTableComponent},

  {path: "addDevis", component: DevisFormComponent},
  {path: "devisList", component: ListDevisComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
