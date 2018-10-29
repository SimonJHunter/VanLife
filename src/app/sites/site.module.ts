import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {SiteListComponent} from './site-list.component';
import {SiteDetailComponent} from './site-detail.component';
import {SiteDetailGuard} from './site-detail.guard';
import {DisplayPricePipe} from '../shared/display-price.pipe';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    SiteListComponent,
    DisplayPricePipe,
    SiteDetailComponent,
  ],
  imports: [
    RouterModule.forChild([
      {path: 'sites', component: SiteListComponent},
      {path: 'sites/:id',
        canActivate: [SiteDetailGuard],
        component: SiteDetailComponent},
    ]),
    SharedModule
  ]
})
export class SiteModule { }
