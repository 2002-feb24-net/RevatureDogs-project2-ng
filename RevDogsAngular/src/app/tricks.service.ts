import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Trick } from './models/tricks';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TricksService {
  private tricksUrl = "https://revaturedogs-project2.azurewebsites.net/api/Tricks";

  constructor(private http: HttpClient) { }

  getTricks(): Observable<Trick[]>{
    return this.http.get<Trick[]>(`${this.tricksUrl}`)
      .pipe(
      tap(_ => console.log('TricksService: Fetched Tricks')),
      catchError(this.handleError<Trick[]>('getTricks', []))
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
      console.log(`TricksService: ${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
