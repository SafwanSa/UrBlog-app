import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { map, switchMap } from 'rxjs/operators';
import { User, UserService } from 'src/app/services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isProcessing = true;
  user: User;
  collapsed = true;

  constructor(
    public authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {}

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

  ngOnInit(): void {
    this.isProcessing = true;
    this.user$.subscribe((user) => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
      this.isProcessing = false;
    });
  }

  get user$(): Observable<User | null> {
    return this.authService.user$.pipe(
      switchMap((authUser) => {
        if (!authUser) {
          return of(null);
        }
        return this.userService.get$(authUser.uid).pipe(
          map((user) => {
            if (user) {
              return user;
            }
            this.isProcessing = false;
            return null;
          })
        );
      })
    );
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
