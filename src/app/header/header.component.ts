import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.doesUserExist();
  }

  doesUserExist() {
    const isLoggedIn = this.authService.isSignedIn;
    this.user = this.authService.user;
    return isLoggedIn;
  }

  signOut() {
    this.authService.logout();
    this.user = null;
  }

}
