import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AlertifyService } from '../_services/alertify.service';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiURL + 'auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;

constructor(private http: HttpClient, private alertifyService: AlertifyService, private router: Router) { }

login(model: any) {
  // Call the api to log in with passed credentials
  this.http.post(this.baseUrl + 'login', model).subscribe((response: any) => {
    const user = response;
      // If there was a token, save it and decode it
      if (user) {
        localStorage.setItem('token', user.token);
        this.decodedToken = this.jwtHelper.decodeToken(user.token);
        this.router.navigate(['/dashboard']);
      }
  }, error => {
    this.alertifyService.error('There was an error contacting the server.', false);
  });
  /* .pipe(
    // Grab the token that was returned if the login was successful
    map((response: any) => {
      const user = response;
      // If there was a token, save it and decode it
      if (user) {
        localStorage.setItem('token', user.token);
        this.decodedToken = this.jwtHelper.decodeToken(user.token);
      }
    }, error => {
      console.log('error');
    })
  ); */
}

loggedIn() {
  const token = localStorage.getItem('token');
  return !this.jwtHelper.isTokenExpired(token);
}

isAdmin() {
  if (this.loggedIn()) {
    if (this.decodedToken && this.decodedToken.role === 'admin') {
      return true;
    }
  }
  return false;
}

logout() {
  localStorage.removeItem('token');
  // Any code to kill all sessions goes here
}

}
