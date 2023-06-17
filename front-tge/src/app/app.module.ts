import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { FooterComponent } from './components/footer/footer.component';
import { LocalisationComponent } from './components/localisation/localisation.component';
import { ContactezNousComponent } from './components/contactez-nous/contactez-nous.component';
import { HeaderMenuComponent } from './components/header-menu/header-menu.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatGridListModule} from '@angular/material/grid-list';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { AddProductComponent } from './components/add-product/add-product.component';
import { EmailVerifiedComponent } from './components/email-verified/email-verified.component';
import { EntrepriseComponent } from './components/entreprise/entreprise.component';
import { ProfilDetailsComponent } from './components/profil-details/profil-details.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductOneComponent } from './components/product-list/product-one/product-one/product-one.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { ProductsingleComponent } from './components/productsingle/productsingle.component';
import { DragDirective } from './drag.directive';
import { httpInterceptorProviders } from './helpers/http-request.interceptor';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { LocationComponent } from './components/location/location.component';
import { LocationProductComponent } from './components/location/location-product/location-product.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { EditLocComponent } from './components/edit-loc/edit-loc.component';
import { AddLocComponent } from './components/add-loc/add-loc.component';
import { DashbordAdminComponent } from './components/dashbord-admin/dashbord-admin.component';
import { ProductsTableComponent } from './components/dashbord-admin/products-table/products-table.component';
import { LocationTableComponent } from './components/dashbord-admin/location-table/location-table.component';
import { ServiceComponent } from './components/service/service.component';
import { TapToTopComponent } from './components/tap-to-top/tap-to-top.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { AddAccountComponent } from './components/add-account/add-account.component';
import { DevisFormComponent } from './components/devis-form/devis-form.component';
import { ListDevisComponent } from './components/list-devis/list-devis.component';
import { EtablissementComponent } from './components/etablissement/etablissement.component';
import { CategoryTableComponent } from './components/dashbord-admin/category-table/category-table.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    SignUpComponent,
    FooterComponent,
    LocalisationComponent,
    ContactezNousComponent,
    HeaderMenuComponent,
    AddProductComponent,
    EmailVerifiedComponent,
    EntrepriseComponent,
    ProfilDetailsComponent,
    ChangePasswordComponent,
    ForgotPasswordComponent,
    ProductListComponent,
    ProductOneComponent,
    EditProductComponent,
    ProductsingleComponent,
    DragDirective,
    LocationComponent,
    LocationProductComponent,
    EditLocComponent,
    AddLocComponent,
    DashbordAdminComponent,
    ProductsTableComponent,
    LocationTableComponent,
    ServiceComponent,
    TapToTopComponent,
    AccountsComponent,
    AddAccountComponent,
    DevisFormComponent,
    ListDevisComponent,
    EtablissementComponent,
    CategoryTableComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlickCarouselModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatGridListModule,
    BrowserAnimationsModule,
    NgxSliderModule,
    NgxPaginationModule,
    CarouselModule

  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
