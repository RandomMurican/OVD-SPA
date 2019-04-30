import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Connection } from '../_models/connection';

@Injectable({
  providedIn: 'root'
})
export class VmService {
  baseUrl = environment.apiURL + 'group/';

constructor(private http: HttpClient) { }

createConnection(connection: Connection) {
  console.log('Creating connection');
  return this.http.post<Connection>(this.baseUrl + 'createconnection', connection);
}

}
