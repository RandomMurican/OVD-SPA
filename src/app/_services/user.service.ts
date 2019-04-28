import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Usergroup } from '../_models/usergroup';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiURL + 'group';

constructor(private http: HttpClient) { }

getGroups(id: number | string): Observable<Usergroup[]> {
  return this.http.get<Usergroup[]>(this.baseUrl);
}

}
