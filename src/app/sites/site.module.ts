import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {SiteListComponent} from './site-list.component';
import {SiteDetailComponent} from './site-detail.component';
import {SiteDetailGuard} from './site-detail.guard';
import {StarComponent} from '../shared/star.component';
import {DisplayPricePipe} from '../shared/display-price.pipe';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {path: 'sites', component: SiteListComponent},
      {path: 'sites/:id',
        canActivate: [SiteDetailGuard],
        component: SiteDetailComponent},
    ]),
    SharedModule
  ],
  declarations: [
    SiteListComponent,
    DisplayPricePipe,
    StarComponent,
    SiteDetailComponent,
  ]
})
export class SiteModule { }
