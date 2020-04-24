import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { TrickProgress } from './models/tricks-progress';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TricksProgressService {
  private tpUrl = "https://revaturedogs-project2.azurewebsites.net/api/TricksProgress";
  
  constructor(private http: HttpClient) { }

  createTricksProgress(tricksProgress: TrickProgress): Observable<TrickProgress>{
    return this.http.post<TrickProgress>(`${this.tpUrl}`, tricksProgress)
      .pipe(
        tap(_ => console.log('TrickProgressService: Created TricksProgress')),
        catchError(this.handleError<TrickProgress>('createTricksProgress'))
      );
  }

  updateTricksProgress(tricksProgress: TrickProgress): Observable<TrickProgress>{
    return this.http.put<TrickProgress>(`${this.tpUrl}/${tricksProgress.id}`, tricksProgress)
      .pipe(
        tap(_ => console.log('TrickProgressService: Updated TricksProgress')),
        catchError(this.handleError<TrickProgress>('updateTricksProgress'))
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
      console.log(`TricksProgressService: ${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
