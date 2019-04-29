import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Connection } from '../_models/connection';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  baseUrl = environment.apiURL + 'group/';
  editingGroup: number;

  constructor(private http: HttpClient) { }

add(model: Connection): Observable<Connection> {
  // Call the api to create a group returning true if it was successful
  // return this.http.post(this.baseUrl + 'create', model);
  return this.http.post<Connection>(this.baseUrl + 'createconnection', model);
}

getConnections(): Observable<Connection[]> {
  return this.http.get<Connection[]>(this.baseUrl + 'getallconnections');
}

}
