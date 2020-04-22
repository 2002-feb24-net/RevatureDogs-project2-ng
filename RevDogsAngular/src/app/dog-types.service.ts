import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DogType } from './models/dog-types';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DogTypesService {
  private dogTypesUrl = "https://localhost:5001/api/DogTypes";

  constructor(private http: HttpClient) { }

  getDogTypes(): Observable<DogType[]> {
    return this.http.get<DogType[]>(`${this.dogTypesUrl}`)
      .pipe(
        tap(_ => console.log('DogTypesService: Fetched dogTypes')),
        catchError(this.handleError<DogType[]>('getDogTypes', []))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`DogTypesService: ${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
