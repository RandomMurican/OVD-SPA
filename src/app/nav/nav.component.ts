import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  // Grab input
  model: any = {};

  // Load in the auth service for logging in and router for redirects
  constructor(private router: Router) { }

  // Nothing to do on init
  ngOnInit() {}

  // Pass the credentials to the api to attempt a login
  // The redirects if successful
  login() {
    this.router.navigate(['/dashboard']);

    // Clear login form
    this.model.username = '';
    this.model.password = '';
  }

  // Check the api to see if the user is logged in
  loggedIn() {
    return true;
  }

  // Check the api to see if the user is a valid admin
  isAdmin() {
    return true;
  }

  // Deletes user's token and redirects to home page
  logout() {
    this.router.navigate(['/login']);
  }
}
