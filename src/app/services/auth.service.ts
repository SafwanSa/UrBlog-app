import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  uid: string;

constructor(private afAuth: AngularFireAuth) { 
const user = afAuth.currentUser;
user.then(user => {
  this.uid = user.uid;
  console.log(this.uid);
})
.catch(err => {
  console.log('No user');
});


}
}
