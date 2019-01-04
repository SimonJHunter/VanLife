import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {SiteListComponent} from './site-list.component';
import {SiteDetailComponent} from './site-detail.component';
import {SiteDetailGuard} from './site-detail.guard';
import {DisplayPricePipe} from '../shared/display-price.pipe';
import { SharedModule } from '../shared/shared.module';
import {SiteEditComponent} from './site-edit.component';
import {SiteEditGuard} from './site-edit.guard';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    SiteListComponent,
    DisplayPricePipe,
    SiteDetailComponent,
    SiteEditComponent,
  ],
  imports: [
    RouterModule.forChild([
      {path: 'sites', component: SiteListComponent},
      {path: 'sites/:id',
        canActivate: [SiteDetailGuard],
        component: SiteDetailComponent},
      {
        path: 'sites/:id/edit',
        canDeactivate: [SiteEditGuard],
        component: SiteEditComponent
      }
    ]),
    SharedModule,
    ReactiveFormsModule
  ]
})
export class SiteModule { }
