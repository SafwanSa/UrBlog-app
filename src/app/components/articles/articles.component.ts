import { Component, OnInit } from '@angular/core';
import { ArticleService, Article } from '../../services/article.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  articles: Article[];
  form: FormGroup;

  constructor(private articleService: ArticleService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      search: ['']
    });
    // this.articleService.addDummyData().then();
    this.articleService.getAllArticles().subscribe(articles => this.articles = articles);
  }
}
