import { SnackService } from './../services/snack.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map, switchMap } from 'rxjs/operators';
import { Role, UserService } from '../services/user.service';


@Injectable({
  providedIn: 'root'
})
export class StaffGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router,
    private userService: UserService,
    private snack: SnackService
  ) {
  }

  canActivate(route, state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.user$.pipe(
      switchMap(user => {
        if (user) {
          return this.userService.get$(user.uid).pipe(map(appUser => {
            if (appUser.isBlocked === true) {
              this.snack.authError('You are blocked by the admin. Please contact us');
              return false;
            }
            if (appUser) { return appUser.role === Role.Admin || appUser.role === Role.Staff; }

            this.router.navigateByUrl('/');
            return false;
          }));
        }
      })
    );
  }
}
