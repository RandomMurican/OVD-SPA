import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CloudService {
  baseUrl = environment.apiURL + 'groupmanagement';

  constructor(private http: HttpClient) { }

getServiceOfferings(): Observable<string[]> {
  return this.http.get<string[]>(this.baseUrl + '/offering/serviceoffering');
}

getTemplates(): Observable<string[]> {
  return this.http.get<string[]>(this.baseUrl + '/template/templates');
}

getProtocols(): Observable<string[]> {
  return this.http.get<string[]>(this.baseUrl + '/protocol/protocols');
}

}
