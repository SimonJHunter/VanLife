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
      tap(data => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getSite(id: number): Observable<Site> {
    if (id === 0) {
      return of(this.initializeSite());
    }
    const url = `${this.siteUrl}/${id}`;
    return this.http.get<Site>(url)
      .pipe(
        tap(data => console.log('getSite: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  createSite(site: Site): Observable<Site> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    site.id = null;
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
    const url = `${this.siteUrl}/${site.id}`;
    return this.http.put<Site>(url, site, { headers: headers })
      .pipe(
        tap(() => console.log('updateSite: ' + site.id)),
        // Return the product on an update
        map(() => site),
        catchError(this.handleError)
      );
  }

  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

  private initializeSite(): Site {
    // Return an initialized object
    return {
      id: 0,
      name: null,
      category: null,
      location: null,
      shortDescription: null,
      description: null,
      price: null,
      starRating: null,
      facilities: [''],
      imageUrl: null
    };
  }
}
