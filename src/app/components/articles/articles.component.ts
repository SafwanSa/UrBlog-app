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
  isWriter: boolean[] = [];
  form: FormGroup;
  filteredArticles: Article[];

  constructor(private articleService: ArticleService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      searchText: ['']
    });
    // this.articleService.addDummyData().then();
    this.articleService.getAllArticles().subscribe(articles => {
      this.articles = articles;
      this.filteredArticles = this.articles;
      this.setIsWriter();
    });
  }

  get searchText(): any {
    return this.form.get('searchText');
  }

  setIsWriter(): void {
    for (const article of this.articles) {
      this.articleService.isWriter(article).subscribe(result => this.isWriter.push(result));
    }
  }

  onSearch(): void {
    this.filteredArticles = this.articles.filter(article => {
      if (this.searchText.value === '') { return true; }
      return article.description.split(' ').includes(this.searchText.value) ||
        article.title.split(' ').includes(this.searchText.value);
    }
    );
  }
}
