import { Injectable } from '@angular/core';
import { Article } from '../models/article.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

articles: Article[];

constructor() { 
  this.articles = [];

  this.articles.push({
    id: '1',
    title: 'Java best practices',
    description: 'Here I list the best of java practices',
    content: '',
    date: new Date(),
    rating: 0,
    bloggerUid: 'ss'
  });

  this.articles.push({
    id: '2',
    title: 'How to integrate the bullshit with the shit',
    description: 'Explaining the thing where u want to integrate both of these',
    content: '',
    date: new Date(),
    rating: 0,
    bloggerUid: 'ss'
  });
}
}
