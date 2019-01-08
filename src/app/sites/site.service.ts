import {Injectable} from '@angular/core';
import {Site} from './site';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  private siteUrl = 'api/sites/sites.json';

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

  // createProduct(product: Product): Observable<Product> {
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   product.id = null;
  //   return this.http.post<Product>(this.productsUrl, product, { headers: headers })
  //     .pipe(
  //       tap(data => console.log('createProduct: ' + JSON.stringify(data))),
  //       catchError(this.handleError)
  //     );
  // }

  // deleteProduct(id: number): Observable<{}> {
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   const url = `${this.productsUrl}/${id}`;
  //   return this.http.delete<Product>(url, { headers: headers })
  //     .pipe(
  //       tap(data => console.log('deleteProduct: ' + id)),
  //       catchError(this.handleError)
  //     );
  // }

  // updateProduct(product: Product): Observable<Product> {
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   const url = `${this.productsUrl}/${product.id}`;
  //   return this.http.put<Product>(url, product, { headers: headers })
  //     .pipe(
  //       tap(() => console.log('updateProduct: ' + product.id)),
  //       // Return the product on an update
  //       map(() => product),
  //       catchError(this.handleError)
  //     );
  // }



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
