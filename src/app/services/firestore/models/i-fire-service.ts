import { Observable } from 'rxjs';
import { FireModelBase } from './fire-model-base';
import { QueryFn } from '@angular/fire/firestore';

export interface IFireService<T extends FireModelBase> {
  collectionPath: string;

  getAll$(queryFn?: QueryFn): Observable<T[]>;

  get$(id: string): Observable<T>;

  save(object: T): Promise<void>;
}
