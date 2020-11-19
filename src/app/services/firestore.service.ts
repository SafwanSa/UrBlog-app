import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';


export enum Collection {
  Articles = 'articles',
  Issues = 'issues',
  Users = 'users'
}

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

constructor(private db: AngularFirestore) { }

getDocumentOnceByUid<T>(uid: string, collection: Collection) {
  return this.db.collection<T>(collection, ref =>
    ref.where('uid', '==', uid)).valueChanges();
}

}
