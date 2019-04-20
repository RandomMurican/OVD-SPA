import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Group } from '../_models/group';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  result: Group;
  baseUrl = environment.apiURL + 'group';

  constructor(private http: HttpClient) { }

create(model: Group) {
  // Call the api to create a group returning true if it was successful
  // return this.http.post(this.baseUrl + 'create', model);

}

update(oldName: String, model: any) {

}

delete(group: String) {
  // /delete/GroupName is the actual Url
  // return this.http.post(this.baseUrl + 'delete', model);

}

getGroups(): Observable<Group[]> {
  return this.http.get<Group[]>(this.baseUrl);
}

getImages() {

}

}
