import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user;
  isProcessing = true;

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.observeAuthUser();
  }

  observeAuthUser(): void {
    this.authService.user$.subscribe(user => { this.user = user; this.isProcessing = false; });
  }

  async signOut(): Promise<void> {
    const result = await this.authService.logout();
    if (result.error) {
      console.log('Error bitch');
      return;
    }
    this.router.navigateByUrl('/');
  }

}
