import { Injectable } from '@angular/core';
import { Article } from '../models/article.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

articles: Article[];

constructor(private db: AngularFirestore) {

  this.articles = [];
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
}
