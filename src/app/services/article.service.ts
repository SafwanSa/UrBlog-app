import { Injectable } from '@angular/core';
import { Article } from '../models/article.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

articles: Article[];

constructor(private db: AngularFirestore) {
  this.articles = [];

  this.getArticles('ss')
  .subscribe(articles => this.articles = articles);
}


addDummyData(db) {
  db.collection('articles').add(
    {
      id: '1',
      title: 'Java best practices',
      description: 'Here I list the best of java practices',
      content: '',
      date: new Date(),
      rating: 0,
      bloggerUid: 'ss'
    }
  )
  .then(() => {
    console.log('Saved');
  })
  .catch(() => {
    console.log('Error');
  });
}


getArticles(uid: string) {
  return this.db.collection<Article>('articles', (ref) =>
    ref.where('bloggerUid', '==', uid)
  ).valueChanges();
}




}
