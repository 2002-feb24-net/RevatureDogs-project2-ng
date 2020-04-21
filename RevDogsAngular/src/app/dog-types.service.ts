import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DogType } from './models/dog-types';

@Injectable({
  providedIn: 'root'
})
export class DogTypesService {
  private dogTypesUrl = "https://revdogsapi.azurewebsites.net/api/DogTypes";

  constructor(private http: HttpClient) { }

  getDogTypes() {
    return this.http.get<DogType[]>(`${this.dogTypesUrl}`).toPromise();
  }
}
