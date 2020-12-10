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

  getDate(d, short: boolean = false): string {
    // tslint:disable-next-line:variable-name
    const t = new Date(1970, 0, 1);
    t.setSeconds(d.seconds);
    // tslint:disable-next-line:variable-name
    const date_ob = t;

    // adjust 0 before single digit date
    const date = ('0' + date_ob.getDate()).slice(-2);

    // current month
    const month = ('0' + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    const year = date_ob.getFullYear();

    // prints date in YYYY-MM-DD format

    return ((short ? this.getMonth(month).slice(0, 3) : this.getMonth(month)) + ' ' + date + ', ' + year);
    // return (year + '-' + month + '-' + date);
  }

  private getMonth(m: string): string {
    switch (m) {
      case '1': return 'January';
      case '2': return 'February';
      case '3': return 'March';
      case '4': return 'April';
      case '5': return 'May';
      case '6': return 'June';
      case '7': return 'July';
      case '8': return 'August';
      case '9': return 'September';
      case '10': return 'October';
      case '11': return 'November';
      case '12': return 'December';
      default: return 'None';
    }
  }

}
