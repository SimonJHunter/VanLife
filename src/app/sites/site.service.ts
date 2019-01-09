import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';

import {Observable, of, throwError} from 'rxjs';
import {catchError, tap, map} from 'rxjs/operators';

import {Site} from './site';

@Injectable({
  providedIn: 'root'
})
export class SiteService {
  private siteUrl = 'api/sites';

  constructor (private http: HttpClient) {}

  getSites(): Observable<Site[]> {
    return this.http.get<Site[]>(this.siteUrl).pipe(
      tap(data => console.log('All:' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getSite(id: number): Observable<Site | undefined> {
    return this.getSites().pipe(
      map((sites: Site[]) => sites.find(s => s.siteId === id))
    );
  }

  createSite(site: Site): Observable<Site> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    site.siteId = null;
    return this.http.post<Site>(this.siteUrl, site, { headers: headers })
      .pipe(
        tap(data => console.log('createSite: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  deleteSite(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.siteUrl}/${id}`;
    return this.http.delete<Site>(url, { headers: headers })
      .pipe(
        tap(data => console.log('deleteSite: ' + id)),
        catchError(this.handleError)
      );
  }

  updateSite(site: Site): Observable<Site> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.siteUrl}/${site.siteId}`;
    return this.http.put<Site>(url, site, { headers: headers })
      .pipe(
        tap(() => console.log('updateSite: ' + site.siteId)),
        // Return the product on an update
        map(() => site),
        catchError(this.handleError)
      );
  }



  private handleError (err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred:  ${err.error.message}`;
    } else {
      errorMessage = `Server return code:  ${err.status}, error message is: ${err.message} `;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
