import { IFireService } from './i-fire-service';
import { Observable } from 'rxjs';
import { FirestoreService } from '../firestore.service';
import { FireModelBase } from './fire-model-base';
import { AngularFirestoreCollection, QueryFn } from '@angular/fire/firestore';
import { plainToClass } from 'class-transformer';
import { map } from 'rxjs/operators';

export abstract class FireServiceBase<T extends FireModelBase> implements IFireService<T> {

  ref: AngularFirestoreCollection<T>;

  protected constructor(protected type: new () => T, public collectionPath: string, public firestoreService: FirestoreService) {
    this.ref = this.firestoreService.col(collectionPath);
  }

  getAll$(queryFn?: QueryFn): Observable<T[]> {
    return this.ref.valueChanges().pipe(
      map(objs =>
        objs.map(obj => this._docToClass(obj)),
      ),
    );
  }

  get$(id: string): Observable<T> {
    return this.ref.doc<T>(id).valueChanges().pipe(map(data => this._docToClass(data)));
  }

  save(object: T): Promise<void> {
    const id = object.id;

    let data: any = object;

    if (object instanceof this.type) {
      data = object.toData();
    }

    return this.firestoreService.upsert(this.collectionPath + '/' + data.id, data);
  }


  private _docToClass(obj: T): T {

    if (obj != null) {
      // object exists
      return plainToClass(this.type, obj);

    } else {
      // object doesn't exist
      return null;
    }
  }

}
