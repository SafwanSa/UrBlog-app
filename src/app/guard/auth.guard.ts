import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { SnackService } from '../services/snack.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private afAuth: AngularFireAuth,
    private snack: SnackService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const user = this.afAuth.currentUser;
      var uid: string;
      user.then(user => uid = user.uid)
      const isLoggedIn = !!uid;
      if (!isLoggedIn) {
        this.snack.authError();
      }
      return isLoggedIn;
  }
}
