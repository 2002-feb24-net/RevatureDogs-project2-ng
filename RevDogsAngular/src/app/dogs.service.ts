import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Dogs } from './models/dogs';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DogsService {
  private dogsUrl = "https://revaturedogs-project2.azurewebsites.net/api/Dogs";

  constructor(private http: HttpClient) { }

  getDogs(): Observable<Dogs[]>{
    return this.http.get<Dogs[]>(`${this.dogsUrl}`)
      .pipe(
        tap(_ => console.log(`DogsService: Fetched Dogs`)),
        catchError(this.handleError<Dogs[]>('getDogs', []))
      );
  }

  getDog(id: number): Observable<Dogs>{
    return this.http.get<Dogs>(`${this.dogsUrl}/${id}`)
      .pipe(
        tap(_ => console.log(`DogsService: Fetched Dog with id ${id}`)),
        catchError(this.handleError<Dogs>('getDog'))
      );
  }

  createDog(dog: Dogs): Observable<Dogs>{
    return this.http.post<Dogs>(`${this.dogsUrl}`, dog)
      .pipe(
        tap(_ => console.log(`DogsService: Created Dog with id ${dog.id}`)),
        catchError(this.handleError<Dogs>('createDog'))
      );
  }

  updateDog(dog: Dogs): Observable<Dogs>{
    return this.http.put<Dogs>(`${this.dogsUrl}/${dog.id}`, dog)
      .pipe(
        tap(_ => console.log(`DogsService: Updated Dog with id ${dog.id}`)),
        catchError(this.handleError<Dogs>('updateDog'))
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
      console.log(`DogsService: ${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
