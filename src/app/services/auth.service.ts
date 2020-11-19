import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { first, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

type Result = Promise<{
  user?: firebase.User;
  error?: string;
}>;

enum AuthState {
  signedIn, signedOut, undefined
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState = AuthState.undefined;

  get isSignedIn(): Observable<boolean> {
    return this.user$.pipe(map(user => !!user));
  }

  user$: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth) {
    this.user$ = this.afAuth.authState;
  }

  async signInAnonymously(): Result {
    return await this.afAuth.signInAnonymously()
      .then(credential => ({ user: credential.user }))
      .catch(error => ({ error: error.message }));
  }

  async signIn(email: string, password: string): Result {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then(credential => ({ user: credential.user }))
      .catch(error => ({ error }));
  }

  async signUp(email: string, password: string): Result {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(async (credential) =>
        credential.user.sendEmailVerification().then(() => ({
          user: credential.user
        }))
          .catch(error => ({ user: credential.user }))
      ).catch(error => ({ error }));
  }

  async applyActionCode(actionCode: string): Result {
    return await this.afAuth.applyActionCode(actionCode)
      .then(() => ({}))
      .catch(error => ({ error: error.message }));
  }

  async sendEmailVerification(user: firebase.User): Result {
    return await user.sendEmailVerification()
      .then(() => ({}))
      .catch(error => ({ error: error.message }));
  }

  async sendResetPasswordEmail(email: string): Result {
    return await this.afAuth.sendPasswordResetEmail(email)
      .then(() => ({}))
      .catch(error => ({ error: error.message }));
  }

  async resetPassword(newPassword: string, actionCode: string): Result {
    return await this.afAuth.confirmPasswordReset(actionCode, newPassword)
      .then(() => ({}))
      .catch(error => ({ error: error.message }));
  }

  async logout(): Result {
    return await this.afAuth.signOut()
      .then(() => ({}))
      .catch(error => ({ error: error.message }));
  }


}
