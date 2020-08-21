import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ProductlistComponent } from './components/productlist/productlist.component';
import { ProductComponent } from './components/product/product.component';
import { CartComponent } from './components/cart/cart.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';
import { NotificationComponent } from './components/notification/notification.component';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
import { SubcategoryPageComponent } from './components/subcategory-page/subcategory-page.component';
import { AllcategoryComponent } from './components/allcategory/allcategory.component';
import { CategoryproductComponent } from './components/categoryproduct/categoryproduct.component';
import { SubcategoryProductComponent } from './components/subcategory-product/subcategory-product.component';
import { BrandproductComponent } from './components/brandproduct/brandproduct.component';
import { CartProductComponent } from './components/cart-product/cart-product.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ChangeAddressComponent } from './components/change-address/change-address.component';
import { PaymentComponent } from './components/payment/payment.component';
import { AccountComponent } from './components/account/account.component';
import { AddAddressComponent } from './components/add-address/add-address.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { ReturnPolicyComponent } from './components/return-policy/return-policy.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { SearchproductComponent } from './components/searchproduct/searchproduct.component';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'folder/Inbox',
  //   pathMatch: 'full'
  // },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'productlist',
    component: ProductlistComponent
  },
  {
    path:'product/:PID/:ProductName',
    component:ProductComponent
  },
  {
    path:'cart',
    component:CartComponent
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path:'profile',
    component:ProfileComponent
  },
  {
    path:'changePassword',
    component:ChangepasswordComponent
  },
  {
    path:'notification',
    component:NotificationComponent
  },
  {
    path:'forgetpassword',
    component:ForgetpasswordComponent
  },
  {
    path:'sub-cat/:CID/:CategoryName',
    component:SubcategoryPageComponent
  },
  {
    path:'allcategory',
    component:AllcategoryComponent
  },
{
  path:'categoryProduct/:CID/:sub_category_name',
  component:CategoryproductComponent
},
{
  path:'subcategoryProduct/:sub_category_id/:sub_category_name',
  component:SubcategoryProductComponent
},
{
  path:'brand-product/:Name/:brand_id',
  component:BrandproductComponent
},
{
  path:'edit-product/:PID',
  component:CartProductComponent
},
{
  path:'checkout',
  component:CheckoutComponent
},
{
  path:'change-address',
  component:ChangeAddressComponent
},
{
  path:'payment/:total',
  component:PaymentComponent
},
{
  path:'account',
  component:AccountComponent
},
{
  path:'add-address',
  component:AddAddressComponent
},
{
  path:'order-history',
  component:OrderHistoryComponent
},
{
  path:'order-detail',
  component:OrderDetailComponent
},
{
  path:'return-policy',
  component:ReturnPolicyComponent
},
{
 path:'wishlist',
 component:WishlistComponent
},
{
  path:'search-product',
  component:SearchproductComponent
  
}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
