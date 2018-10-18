import {Injectable} from '@angular/core';
import {ISite} from './site';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SiteService{

  private siteUrl = 'api/sites/sites.json';

  constructor (private http: HttpClient) {}

  getSites(): Observable<ISite[]> {
    return this.http.get<ISite[]>(this.siteUrl).pipe(
      tap(data => console.log('All:' + JSON.stringify(data))),
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
