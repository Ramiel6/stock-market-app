///https://scotch.io/tutorials/routing-angular-2-single-page-apps-with-the-component-router
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartsViewComponent } from './charts-view/charts-view.component';
import { AboutViewComponent } from './about-view/about-view.component';
const routes: Routes = [
  // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '', component: ChartsViewComponent },
  { path: 'about', component: AboutViewComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
  
}