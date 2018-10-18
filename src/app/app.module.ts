import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {SiteListComponent} from './sites/site-list.component';
import {FormsModule} from '@angular/forms';
import {DisplayPricePipe} from './shared/display-price.pipe';
import {StarComponent} from './shared/star.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    SiteListComponent,
    DisplayPricePipe,
    StarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
