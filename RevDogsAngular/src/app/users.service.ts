import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Users } from './models/users';
import { tap, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private usersUrl = "https://localhost:5001/api/Users";

  constructor(private http: HttpClient) { }

  getUserLogin(username: string): Observable<Users>{
    return this.http.get<Users>(`${this.usersUrl}/login/${username}`)
    .pipe(
      tap(_ => console.log('UsersService: Logged in')),
      catchError(this.handleError<Users>('getUserLogin'))
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
      console.log(`UsersService: ${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
