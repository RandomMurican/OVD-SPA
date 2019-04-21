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

create(model: Newgroup) {
  // Call the api to create a group returning true if it was successful
  // return this.http.post(this.baseUrl + 'create', model);
  console.log('POST: ' + this.baseUrl);
  return this.http.post(this.baseUrl, model);
}

delete(id: number | string) {
  // return this.http.post(this.baseUrl + 'delete', model);
  console.log('DELETE: ' + this.baseUrl + '/' + id);
  this.http.delete(this.baseUrl + '/' + id);
}

getGroups(): Observable<Group[]> {
  console.log('GET<Group[]>: ' + this.baseUrl);
  return this.http.get<Group[]>(this.baseUrl);
}

}
