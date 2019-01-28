import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

import { SiteEditComponent } from './site-edit.component';

@Injectable({
  providedIn: 'root'
})
export class SiteEditGuard implements CanDeactivate<SiteEditComponent> {
  canDeactivate(component: SiteEditComponent): Observable<boolean> | Promise<boolean> | boolean {
     if (component.siteForm.dirty) {
      const siteName = component.siteForm.get('name').value || 'New Site';
      return confirm(`Navigate away and lose all changes to ${siteName}?`);
     }
    return true;
  }
}
