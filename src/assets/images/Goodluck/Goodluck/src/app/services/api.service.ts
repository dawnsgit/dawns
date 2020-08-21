import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
url:string="https://rbtech.in/GOODLUCK/GoodluckApi/public/index.php/api/"

  constructor(private http:HttpClient) {

   }

   getCategorys(): Observable<any[]> {
    return this.http.get<any[]>(this.url)
      .pipe(
        tap(news => console.log('Catgorys')),
        catchError(this.handleError('getCategorys', []))
      );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
