import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Group } from '../_models/group';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiURL + 'group/';

constructor(private http: HttpClient) { }

getGroups(id: string): Observable<Group[]> {
  return this.http.get<Group[]>(this.baseUrl + 'getconnectiongroups/' + id);
}

}
