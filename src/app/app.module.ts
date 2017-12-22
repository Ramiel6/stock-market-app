import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule }    from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import { OnsenModule } from 'ngx-onsenui';
import {NglModule} from 'ng-lightning/ng-lightning';
import {NgxChartsModule} from '@swimlane/ngx-charts';

import {GetChartService} from './get-chart.service'
import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { ChartsViewComponent } from './charts-view/charts-view.component';
import { ChartInputComponent } from './chart-input/chart-input.component';
import { LoadingViewComponent } from './loading-view/loading-view.component';
import { FooterViewComponent } from './footer-view/footer-view.component';
import { NavViewComponent } from './nav-view/nav-view.component';
import { AboutViewComponent } from './about-view/about-view.component';
import { ReplaceExtraPipe } from './replace-extra.pipe';


@NgModule({
  declarations: [
    AppComponent,
    ChartsViewComponent,
    ChartInputComponent,
    LoadingViewComponent,
    FooterViewComponent,
    NavViewComponent,
    AboutViewComponent,
    ReplaceExtraPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NglModule.forRoot(),
    NgxChartsModule,
    AppRoutingModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
  providers: [GetChartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
