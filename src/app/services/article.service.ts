import { Injectable } from '@angular/core';
import { Article } from '../models/article.model';
import { FirestoreService, Collection } from './firestore.service';
import { AuthService } from './auth.service';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class ArticleService {

articles: Article[];

constructor(private frService: FirestoreService, private authService: AuthService, private db: AngularFirestore) {
  this.articles = [];
  this.getUserArticle();
}


addDummyData() {
  console.log("DDD");
  
  this.db.collection('articles').add(
    {
      id: '1',
      title: 'Hello world',
      description: 'Here I list the best of java practices',
      content: '',
      date: new Date(),
      rating: 0,
      uid: this.authService.user.uid
    }
  )
  .then(() => {
    console.log('Saved');
  })
  .catch(() => {
    console.log('Error');
  });
}


getAllArticles(uid: string) {
}

getUserArticle() {
  this.frService
  .getDocumentOnceByUid<Article>(this.authService.user.uid, Collection.Articles)
  .subscribe(articles => this.articles = articles);
}




}
