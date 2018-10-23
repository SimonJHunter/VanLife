import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {SiteListComponent} from './sites/site-list.component';
import {FormsModule} from '@angular/forms';
import {DisplayPricePipe} from './shared/display-price.pipe';
import {StarComponent} from './shared/star.component';
import {HttpClientModule} from '@angular/common/http';
import { SiteDetailComponent } from './sites/site-detail.component';
import {WelcomeComponent} from './home/welcome.component';
import {RouterModule} from '@angular/router';
import {SiteDetailGuard} from './sites/site-detail.guard';
import { SiteNosuchsiteComponent } from './sites/site-nosuchsite.component';

@NgModule({
  declarations: [
    AppComponent,
    SiteListComponent,
    DisplayPricePipe,
    StarComponent,
    SiteDetailComponent,
    WelcomeComponent,
    SiteNosuchsiteComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'sites', component: SiteListComponent},
      {path: 'sites/:id',
        canActivate: [SiteDetailGuard],
        component: SiteDetailComponent},
      {path: 'welcome', component: WelcomeComponent},
      {path: 'nosite', component: SiteNosuchsiteComponent},
      {path: '', redirectTo: 'welcome', pathMatch: 'full'},
      {path: '**', redirectTo: 'welcome', pathMatch: 'full'},
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
