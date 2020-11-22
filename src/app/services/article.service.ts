import { Injectable } from '@angular/core';
import { FireServiceBase } from './firestore/models/fire-service-base';
import { FireModelBase } from './firestore/models/fire-model-base';
import { FirestoreService } from './firestore/firestore.service';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService extends FireServiceBase<Article> {

  constructor(
    private firestore: FirestoreService,
    private authService: AuthService
  ) {
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
  // This going to be called by every authenticated user
  saveArticle(article: Article): Promise<void> {
    return this.save(article);
  }
  // This going to be called by every user
  getAllArticles(): Observable<Article[]> {
    return this.getAll$();
  }
  // This going to be called by every user profile
  getUserArticles(uid: string): Observable<Article[]> {
    return this.firestore.col$<Article>('articles', ref => ref.where('uid', '==', uid));
  }
  // This will be called by the writer only
  deleteArticle(id: string): Promise<void> {
    return this.firestore.delete(`articles/${id}`);
  }
  isWriter(article): Observable<boolean> {
    return this.authService.user$.pipe(map(user => {
      if (user) { return user.uid === article.uid; }
      return false;
    }));
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
