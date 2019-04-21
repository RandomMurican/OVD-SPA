import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Group } from '../_models/group';
import { Newgroup } from '../_models/newgroup';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  baseUrl = environment.apiURL + 'group';

  constructor(private http: HttpClient) { }

create(model: Newgroup): Observable<boolean> {
  // Call the api to create a group returning true if it was successful
  // return this.http.post(this.baseUrl + 'create', model);
  return this.http.post<boolean>(this.baseUrl, model);
}

delete(id: number | string): Observable<boolean> {
  // return this.http.post(this.baseUrl + 'delete', model);
  return this.http.delete<boolean>(this.baseUrl + '/' + id);
}

getGroups(): Observable<Group[]> {
  console.log('GET: ' + this.baseUrl);
  return this.http.get<Group[]>(this.baseUrl);
}

}
