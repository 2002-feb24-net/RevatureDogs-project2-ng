import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Dogs } from './models/dogs';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DogsService {
  private dogsUrl = "https://localhost:5001/api/Dogs";

  constructor(private http: HttpClient) { }

  getDogs(): Observable<Dogs[]> {
    return this.http.get<Dogs[]>(`${this.dogsUrl}`)
      .pipe(
        tap(_ => console.log('DogsService: Fetched dogs')),
        catchError(this.handleError<Dogs[]>('getDogs', []))
      );
  }

  createDog(dog: Dogs): Observable<Dogs>{
    return this.http.post<Dogs>(`${this.dogsUrl}`, dog)
      .pipe(
        tap(_ => console.log('DogsService: Created Dog')),
        catchError(this.handleError<Dogs>('createDog'))
      );;
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
      console.log(`DogsService: ${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
