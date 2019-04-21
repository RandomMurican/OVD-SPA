import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Session } from '../_models/session';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  baseUrl = environment.apiURL + 'session';

  constructor(private http: HttpClient) { }

  getSessions(): Observable<Session[]> {
    console.log('GET: ' + this.baseUrl);
    return this.http.get<Session[]>(this.baseUrl);
  }

}
