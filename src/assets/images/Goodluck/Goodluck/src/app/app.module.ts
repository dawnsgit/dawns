import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertService } from './services/alert.service';
import { ProductlistComponent } from './components/productlist/productlist.component';
import { ProductComponent } from './components/product/product.component';
import { DemoMaterialModule } from './common/material-module';
import { CartComponent } from './components/cart/cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './components/profile/profile.component';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';
import { NotificationComponent } from './components/notification/notification.component';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
import {HttpClientModule} from '@angular/common/http'
import { SubcategoryPageComponent } from './components/subcategory-page/subcategory-page.component';
import { AllcategoryComponent } from './components/allcategory/allcategory.component';
import { CategoryproductComponent } from './components/categoryproduct/categoryproduct.component';
import { SubcategoryProductComponent } from './components/subcategory-product/subcategory-product.component';
import { MultiImageComponent } from './components/multi-image/multi-image.component';
import { BrandproductComponent } from './components/brandproduct/brandproduct.component';
import { IonicStorageModule } from '@ionic/storage';
import { CartProductComponent } from './components/cart-product/cart-product.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ChangeAddressComponent } from './components/change-address/change-address.component';
import { AddAddressComponent } from './components/add-address/add-address.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ThanksComponent } from './components/thanks/thanks.component';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './components/account/account.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { ReturnPolicyComponent } from './components/return-policy/return-policy.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { SearchproductComponent } from './components/searchproduct/searchproduct.component';

@NgModule({
  declarations: [AppComponent,ProductlistComponent,ProductComponent,CartComponent,ProfileComponent,
  ChangepasswordComponent,ForgetpasswordComponent,NotificationComponent,SubcategoryPageComponent,AllcategoryComponent,
CategoryproductComponent,SubcategoryProductComponent,MultiImageComponent,BrandproductComponent,CartProductComponent,
CheckoutComponent,ChangeAddressComponent,AddAddressComponent,PaymentComponent,ThanksComponent,AccountComponent,OrderHistoryComponent,
OrderDetailComponent,ReturnPolicyComponent,WishlistComponent,SearchproductComponent],
  entryComponents: [MultiImageComponent,ThanksComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),HttpClientModule,IonicStorageModule.forRoot(),FormsModule,ReactiveFormsModule,CommonModule,
    AppRoutingModule,DemoMaterialModule,
    BrowserAnimationsModule
  ],
  providers: [
    StatusBar,AlertService,PayPal,AndroidPermissions,
    Geolocation,NativeGeocoder,
    LocationAccuracy,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
