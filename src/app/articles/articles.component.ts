import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { Article } from '../models/article.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  articles: Article[] = [];
  form: FormGroup;

  constructor(private articleService: ArticleService, private fb: FormBuilder) {
    this.articles = this.articleService.articles;
  }

  ngOnInit() {
    this.form = this.fb.group({
      'search': ['']
    });
  }

}
