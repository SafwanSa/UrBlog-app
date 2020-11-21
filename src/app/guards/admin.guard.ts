import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map, switchMap } from 'rxjs/operators';
import { Role, UserService } from '../services/user.service';
import { app } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router, private userService: UserService) {
  }

  canActivate(route, state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.user$.pipe(
      switchMap(user => {
        return this.userService.get$(user.uid).pipe(map(appUser => {
          if (appUser) { return appUser.role === Role.Admin; }
          this.router.navigateByUrl('/');
          return false;
        }));
      })
    );
  }
}
