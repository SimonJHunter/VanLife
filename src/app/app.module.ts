import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {WelcomeComponent} from './home/welcome.component';
import {RouterModule} from '@angular/router';
import { SiteNosuchsiteComponent } from './sites/site-nosuchsite.component';
import { SiteModule } from './sites/site.module';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    SiteNosuchsiteComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'welcome', component: WelcomeComponent},
      {path: 'nosite', component: SiteNosuchsiteComponent},
      {path: '', redirectTo: 'welcome', pathMatch: 'full'},
      {path: '**', redirectTo: 'welcome', pathMatch: 'full'},
    ]),
    //Feature modules
    SiteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
