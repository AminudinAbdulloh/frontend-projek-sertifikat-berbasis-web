import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { RegisterUserRequest } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class ApiUserService {

  private apiUrl = environment.apiUrl;
  private endpoint = environment.endpoints.user;

  constructor(private http: HttpClient) {}

  get<T>(id: number): Observable<any> {
    return this.http.get<T>(`${this.apiUrl}/${this.endpoint.get}/${id}`, { withCredentials: true });
  }
}
