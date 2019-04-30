import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Group } from '../_models/group';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  baseUrl = environment.apiURL + 'group/';

  constructor(private http: HttpClient) { }

create(model: Group): Observable<Group> {
  // Call the api to create a group returning true if it was successful
  // return this.http.post(this.baseUrl + 'create', model);
  return this.http.post<Group>(this.baseUrl + 'creategroup', model);
}

delete(id: number | string) {
  // return this.http.post(this.baseUrl + 'delete', model);
  return this.http.post<boolean>(this.baseUrl + 'deletegroup/' + id, null);
}

getGroups(): Observable<Group[]> {
  return this.http.get<Group[]>(this.baseUrl + 'getallconnectiongroups');
}

getGroup(id: number | string): Observable<Group> {
  return this.http.get<Group>(this.baseUrl + 'getconnectiongroupinfo/' + id);
}

updateVMs(id: number | string, added: number[], removed: number[]) {
  return this.http.post<Boolean>(this.baseUrl + 'updateconnectionsinconnectiongroup', {id: id, addIds: added, removeIds: removed});
}

updateUsers(userGroupId: number | string, added: string[], removed: string[]) {
  return this.http.post<Boolean>(this.baseUrl + 'updateusers', {id: userGroupId, addIds: added, removeIds: removed});
}

}
