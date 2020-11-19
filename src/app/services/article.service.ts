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
export class ArticleService extends FireServiceBase<Article> {

  constructor(firestore: FirestoreService, private authService: AuthService) {
    super(Article, 'articles', firestore);
  }

  addDummyData(): Promise<void> {
    return this.save(new Article(
      '1',
      'Hello world',
      'Here I list the best of java practices',
      '',
      new Date(),
      0,
      ''
    ));
  }

  getUserArticles(): Observable<Article[] | null> {
    return this.authService.user$.pipe(
      switchMap(user => {
        if (!user) {
          return of(null);
        }
        return this.getAll$((ref) => ref.where('uid', '==', user.uid));
      })
    );
  }

}

export class Article extends FireModelBase {
  constructor(
    public id: string = '',
    public title: string = '',
    public description: string = '',
    public content: string = '',
    public date: Date = new Date(),
    public rating: number = 0,
    public uid: string = '',
  ) {
    super();
  }
}
