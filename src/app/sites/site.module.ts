import { SharedModule } from '../shared/shared.module';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { SiteData } from './site-data';


import {SiteListComponent} from './site-list.component';
import {SiteDetailComponent} from './site-detail.component';
import {SiteEditComponent} from './site-edit.component';
import {SiteDetailGuard} from './site-detail.guard';
import {SiteEditGuard} from './site-edit.guard';

import {DisplayPricePipe} from '../shared/display-price.pipe';

import {ReactiveFormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    InMemoryWebApiModule.forRoot(SiteData),
    RouterModule.forChild([
      {path: 'sites', component: SiteListComponent},
      {
        path: 'sites/:id',
        canActivate: [SiteDetailGuard],
        component: SiteDetailComponent},
      {
        path: 'sites/:id/edit',
        canDeactivate: [SiteEditGuard],
        component: SiteEditComponent
      }
    ]),

  ],
  declarations: [
    SiteListComponent,
    SiteDetailComponent,
    SiteEditComponent,
    DisplayPricePipe
  ]
})
export class SiteModule { }
