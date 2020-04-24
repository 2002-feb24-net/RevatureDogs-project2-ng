import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Users } from './models/users';
import { tap, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private usersUrl = "https://revaturedogs-project2.azurewebsites.net/api/Users";
  private loggedUser = new BehaviorSubject<Users>(null);
  sharedUser = this.loggedUser.asObservable();

  constructor(private http: HttpClient) { }

  getUserLogin(username: string): Observable<Users>{
    return this.http.get<Users>(`${this.usersUrl}/login/${username}`)
    .pipe(
      tap(_ => console.log('UsersService: Logged in')),
      catchError(this.handleError<Users>('getUserLogin'))
    );
  }

  getUser(id: number): Observable<Users>{
    return this.http.get<Users>(`${this.usersUrl}/${id}`)
    .pipe(
      tap(_ => console.log('UsersService: Fetched user')),
      catchError(this.handleError<Users>('getUser'))
    );
  }

  updateUser(user: Users): Observable<Users>{
    return this.http.put<Users>(`${this.usersUrl}/${user.id}`, user)
      .pipe(
        tap(_ => console.log(`UsersService: Updated User with id ${user.id}`)),
        catchError(this.handleError<Users>('updateUsers'))
      );
  }

  userLoggedIn(user: Users){
    this.loggedUser.next(user);
  }

  userLoggedOut(){
    this.loggedUser.next(null);
  }

  getUsers(): Observable<Users[]>{
    return this.http.get<Users[]>(`${this.usersUrl}`)
      .pipe(
        tap(_ => console.log('UsersService: Fetched Users')),
        catchError(this.handleError<Users[]>('getUsers', []))
      );
  }

  createUser(user: Users): Observable<Users>{
    return this.http.post<Users>(`${this.usersUrl}`, user)
      .pipe(
        tap(_ => console.log('UsersService: Created User')),
        catchError(this.handleError<Users>('createUser'))
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
