import { Injectable } from '@angular/core';

import {
  Action,
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreCollectionGroup,
  AngularFirestoreDocument,
  DocumentChangeAction,
  DocumentSnapshotDoesNotExist,
  DocumentSnapshotExists,
  QueryFn,
} from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

import { from, Observable } from 'rxjs';
import { expand, map, mergeMap, take, takeWhile, tap } from 'rxjs/operators';

type CollectionGroupPredicate<T> = string | AngularFirestoreCollectionGroup<T>;
type CollectionPredicate<T> = string | AngularFirestoreCollection<T>;
type DocPredicate<T> = string | AngularFirestoreDocument<T>;

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private afs: AngularFirestore) {

  }

  // *** Usage

  // doc$('notes/ID')
  // col$('notes', ref => ref.where('_components', '==', 'Jeff'))
  // colWithIds$('notes')

  // set('items/ID', data) })    // adds createdAt field
  // add('items', data) })       // adds createdAt field
  // upsert('notes/xyz', { content: 'hello dude' });
  // update('items/ID', data) }) // adds updatedAt field

  // inspectDoc('notes/xyz')
  // inspectCol('notes')

  /// **************
  /// Get a Reference
  /// **************

  /// Firebase Server Timestamp
  get timestamp(): firebase.default.firestore.FieldValue {
    return firebase.default.firestore.FieldValue.serverTimestamp();
  }

  col<T>(ref: CollectionPredicate<T>, queryFn?: QueryFn): AngularFirestoreCollection<T> {
    return typeof ref === 'string' ? this.afs.collection<T>(ref, queryFn) : ref;
  }

  doc<T>(ref: DocPredicate<T>): AngularFirestoreDocument<T> {
    return typeof ref === 'string' ? this.afs.doc<T>(ref) : ref;
  }

  /// **************
  /// Get Data
  /// **************

  colGroup<T>(ref: CollectionGroupPredicate<T>, queryFn?): AngularFirestoreCollectionGroup<T> {
    return typeof ref === 'string' ? this.afs.collectionGroup<T>(ref, queryFn) : ref;
  }

  col$<T>(ref: CollectionPredicate<T>, queryFn?: QueryFn): Observable<T[]> {
    return this.col(ref, queryFn)
      .snapshotChanges()
      .pipe(
        map((docs: DocumentChangeAction<T>[]) => {
          return docs.map((a: DocumentChangeAction<T>) => a.payload.doc.data()) as T[];
        }),
      );
  }


  colGroup$<T>(ref: CollectionGroupPredicate<T>, queryFn?): Observable<T[]> {
    return this.colGroup(ref, queryFn)
      .snapshotChanges()
      .pipe(
        map((docs: DocumentChangeAction<T>[]) => {
          return docs.map((a: DocumentChangeAction<T>) => a.payload.doc.data()) as T[];
        }),
      );
  }

  /// with Ids
  colWithIds$<T>(ref: CollectionPredicate<T>, queryFn?): Observable<any[]> {
    return this.col(ref, queryFn)
      .snapshotChanges()
      .pipe(
        map((actions: DocumentChangeAction<T>[]) => {
          return actions.map((a: DocumentChangeAction<T>) => {
            // tslint:disable-next-line:ban-types
            const data: Object = a.payload.doc.data() as T;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        }),
      );
  }

  doc$<T>(ref: DocPredicate<T>): Observable<T> {
    return this.doc(ref)
      .snapshotChanges()
      .pipe(
        map((doc: Action<DocumentSnapshotDoesNotExist | DocumentSnapshotExists<T>>) => {
          return doc.payload.data() as T;
        }),
      );
  }

  /// **************
  /// Write Data
  /// **************

  docs$<T>(collection: string, ids: string[]): Observable<T>[] {
    return ids.map(
      id => this.doc$(`${collection}/${id}`),
    );
  }

  set<T>(ref: DocPredicate<T>, data: any): Promise<void> {
    const timestamp = this.timestamp;
    return this.doc(ref).set({
      ...data,
      updatedAt: new Date(),
      createdAt: new Date(),
    });
  }

  update<T>(ref: DocPredicate<T>, data: any): Promise<void> {
    return this.doc(ref).update({
      ...data,
      updatedAt: new Date(),
    });
  }

  delete<T>(ref: DocPredicate<T>): Promise<void> {
    return this.doc(ref).delete();
  }

  add<T>(ref: CollectionPredicate<T>, data): Promise<firebase.default.firestore.DocumentReference> {
    const timestamp = this.timestamp;
    return this.col(ref).add({
      ...data,
      updatedAt: new Date(),
      createdAt: new Date(),
    });
  }

  geopoint(lat: number, lng: number): firebase.default.firestore.GeoPoint {
    return new firebase.default.firestore.GeoPoint(lat, lng);
  }

  /// If doc exists update, otherwise set
  upsert<T>(ref: DocPredicate<T>, data: any): Promise<void> {
    const doc = this.doc(ref)
      .snapshotChanges()
      .pipe(take(1))
      .toPromise();

    return doc.then((snap: Action<DocumentSnapshotDoesNotExist | DocumentSnapshotExists<T>>) => {
      return snap.payload.exists ? this.update(ref, data) : this.set(ref, data);
    });
  }

  /// **************
  /// Inspect Data
  /// **************

  inspectDoc(ref: DocPredicate<any>): void {
    const tick = new Date().getTime();
    this.doc(ref)
      .snapshotChanges()
      .pipe(
        take(1),
        tap((d: Action<DocumentSnapshotDoesNotExist | DocumentSnapshotExists<any>>) => {
          const tock = new Date().getTime() - tick;
          console.log(`Loaded Document in ${tock}ms`, d);
        }),
      )
      .subscribe();
  }

  inspectCol(ref: CollectionPredicate<any>): void {
    const tick = new Date().getTime();
    this.col(ref)
      .snapshotChanges()
      .pipe(
        take(1),
        tap((c: DocumentChangeAction<any>[]) => {
          const tock = new Date().getTime() - tick;
          console.log(`Loaded Collection in ${tock}ms`, c);
        }),
      )
      .subscribe();
  }

  /// **************
  /// Create and read doc references
  /// **************

  /// create a reference between two documents
  connect(host: DocPredicate<any>, key: string, doc: DocPredicate<any>): Promise<void> {
    return this.doc(host).update({ [key]: this.doc(doc).ref });
  }

  /// returns a documents references mapped to AngularFirestoreDocument
  docWithRefs$<T>(ref: DocPredicate<T>): Observable<T> {
    return this.doc$(ref).pipe(
      map((doc: T) => {
        for (const k of Object.keys(doc)) {
          if (doc[k] instanceof firebase.default.firestore.DocumentReference) {
            doc[k] = this.doc(doc[k].path);
          }
        }

        return doc;
      }),
    );
  }

  /// **************
  /// Atomic batch example
  /// **************

  /// Just an example, you will need to customize this method.
  atomic(): Promise<void> {
    const batch = firebase.default.firestore().batch();
    /// add your operations here

    const itemDoc = firebase.default.firestore().doc('items/myCoolItem');
    const userDoc = firebase.default.firestore().doc('users/userId');

    const currentTime = this.timestamp;

    batch.update(itemDoc, { timestamp: new Date() });
    batch.update(userDoc, { timestamp: new Date() });

    /// commit operations
    return batch.commit();
  }

  /**
   * Delete a collection, in batches of batchSize. Note that this does
   * not recursively delete subcollections of documents in the collection
   * from: https://github.com/AngularFirebase/80-delete-firestore-collections/blob/master/src/app/firestore.service.ts
   */
  deleteCollection(path: string, batchSize: number): Observable<any> {
    const source = this.deleteBatch(path, batchSize);

    // expand will call deleteBatch recursively until the collection is deleted
    return source.pipe(
      expand(val => this.deleteBatch(path, batchSize)),
      takeWhile(val => val > 0),
    );
  }

  // Deletes documents as batched transaction
  private deleteBatch(path: string, batchSize: number): Observable<any> {
    const colRef = this.afs.collection(path, ref => ref.orderBy('__name__').limit(batchSize));

    return colRef.snapshotChanges().pipe(
      take(1),
      mergeMap((snapshot: DocumentChangeAction<{}>[]) => {
        // Delete documents in a batch
        const batch = this.afs.firestore.batch();
        snapshot.forEach(doc => {
          batch.delete(doc.payload.doc.ref);
        });

        return from(batch.commit()).pipe(map(() => snapshot.length));
      }),
    );
  }
}
