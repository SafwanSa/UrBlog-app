import { Injectable } from '@angular/core';
import { FireServiceBase } from './firestore/models/fire-service-base';
import { FireModelBase } from './firestore/models/fire-model-base';
import { FirestoreService } from './firestore/firestore.service';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends FireServiceBase<User>{

  constructor(
    firestore: FirestoreService,
    private authService: AuthService
  ) {
    super(User, 'users', firestore);
  }

  saveUser(user): Promise<void> {
    user.id = user.uid;
    return this.save(user);
  }

  // This will be called by the admin
  getAllUsers(): Observable<User[]> {
    return this.getAll$();
  }

  retrieveCurrentUser(): Observable<User | null> {
    return this.authService.user$.pipe(
      switchMap(user => {
        if (!user) {
          return of(null);
        }
        return this.get$(user.uid);
      })
    );
  }

  private retrieveUser(uid: string): Observable<User> {
    return this.get$(uid);
  }
}


export enum Role {
  Admin = 'admin',
  Staff = 'staff',
  Blogger = 'blogger',
  Visitor = 'visitor'
}

export class User extends FireModelBase {
  constructor(
    public id: string = '',
    public uid: string = '',
    public firstName: string = '',
    public lastName: string = '',
    public email: string = '',
    public isBlocked: boolean = false,
    public role: string = '',
    public photo: string = ''
  ) {
    super();
  }
}
