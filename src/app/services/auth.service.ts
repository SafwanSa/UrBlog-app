import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';
export enum AuthState {
  signedIn, signedOut, undefined
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState = AuthState.undefined;
  user;

constructor(private afAuth: AngularFireAuth) {
  this.afAuth.onAuthStateChanged((user) => {
    if (user) {
      this.user = user;
      this.authState = AuthState.signedIn;
    } else {
      this.authState = AuthState.signedOut;
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
    return "";
   }catch(err) {
     return err;
   }
}

async login(email: string, password: string) {
  try {
    await this.afAuth.signInWithEmailAndPassword(email, password);
    return "";
   }catch(err) {
     return err;
   }
}

async logout() {
  try {
    await this.afAuth.signOut()
    return "";
   }catch(err) {
     return err;
   }
}


}
