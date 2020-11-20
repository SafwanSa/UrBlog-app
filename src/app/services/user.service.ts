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

  retrieveUser(): Observable<User | null> {
    return this.authService.user$.pipe(
      switchMap(user => {
        if (!user) {
          return of(null);
        }
        return this.get$(user.uid);
      })
    );
  }

}


export enum Role {
  Admin = 'Admin',
  Staff = 'Staff',
  Blogger = 'blogger',
  Visitor = 'Visitor'
}

export class User extends FireModelBase {
  constructor(
    public uid: string = '',
    public firstName: string = '',
    public lastName: string = '',
    public email: string = '',
    public role: string = ''
  ) {
    super();
  }
}
