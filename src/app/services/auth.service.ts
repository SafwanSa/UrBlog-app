import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

enum AuthState {
  signedIn, signedOut, undefined
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState = AuthState.undefined;
  user;

constructor(private afAuth: AngularFireAuth, private router: Router) {
  this.afAuth.onAuthStateChanged((user) => {
    if (user) {
      this.user = user;
      this.authState = AuthState.signedIn;
      // this.router.navigate(['/issues']);
    } else {
      this.user = null;
      this.authState = AuthState.signedOut;
      // this.router.navigate(['/login']);
    }
  });
    this.getUser();
}


isLoggedIn() {
  return this.afAuth.authState.pipe(first()).toPromise();
}

async getUser() {
  this.user = await this.isLoggedIn();
}

async register(email: string, password: string) {
  try {
    await this.afAuth.createUserWithEmailAndPassword(email, password);
    this.router.navigate(['/profile']);
    return "";
   }catch (err) {
     return err;
   }
}

async login(email: string, password: string) {
  try {
    await this.afAuth.signInWithEmailAndPassword(email, password);
    this.router.navigate(['/profile']);
    return "";
   }catch (err) {
     return err;
   }
}

async logout() {
  try {
    await this.afAuth.signOut();
    this.router.navigate(['/']);
    return "";
   }catch (err) {
     return err;
   }
}

get isSignedIn() {
  if (this.authState === AuthState.signedIn) {
    return true;
  }
  return false;
}


}
