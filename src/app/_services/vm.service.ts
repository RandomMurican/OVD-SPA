import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Connection } from '../_models/connection';
import { AlertifyService } from './alertify.service';

@Injectable({
  providedIn: 'root'
})
export class VmService {
  baseUrl = environment.apiURL + 'group/';

constructor(private http: HttpClient, private alertifyService: AlertifyService) { }

createConnection(quantity: number, connection: Connection) {
  for (let i = 0; i < quantity; i++) {
    this.http.post<Connection>(this.baseUrl + 'createconnection', connection).subscribe((response: Connection) => {
      if (response != null) {
        this.alertifyService.success('Created VM as ' + response.name, true);
      } else {
        this.alertifyService.error('Failed to create VM under ' + name, true);
      }
    }, error => {
      this.alertifyService.error('Couldn\'t connect to the service.', false);
    });
  }
}

}
