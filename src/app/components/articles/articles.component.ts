import { Component, OnInit } from '@angular/core';
import { ArticleService, Article } from '../../services/article.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { User, UserService } from 'src/app/services/user.service';
import * as g from '../../global';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  articles: Article[];
  isWriter: boolean[] = [];
  users: User[] = [];
  form: FormGroup;
  // filteredArticles: Article[];
  selectedTag = '';
  searchTerm = '';

  constructor(private articleService: ArticleService, private fb: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    g.setValue(true);
    this.form = this.fb.group({
      searchText: ['']
    });
    this.articleService.getAllArticles().subscribe(articles => {
      if (!articles) { g.setValue(false); }
      this.userService.getAll$().subscribe(users => {
        if (!users) { g.setValue(false); }
        this.users = users;
        this.articles = articles;
        // this.filteredArticles = this.articles;
        g.setValue(false);
        this.setIsWriter();
      });
    });
  }

  getBlogger(article): User {
    const blogger = this.users.filter(user => user.uid === article.uid)[0];
    if (!!blogger) { return blogger; }
    return null;
  }

  get searchText(): any {
    return this.form.get('searchText');
  }

  setIsWriter(): void {
    for (const article of this.articles) {
      this.articleService.isWriter(article).subscribe(result => this.isWriter.push(result));
    }
  }

  get filtered(): Article[] {
    if (!this.articles) {
      return [];
    } else {
      return this.articles.filter(article => {
        if (this.searchTerm !== '') {
          if (this.selectedTag === '') {
            return (article.title.toLocaleLowerCase().startsWith(this.searchTerm.toLocaleLowerCase()) ||
              article.description.toLocaleLowerCase().startsWith(this.searchTerm.toLocaleLowerCase()));
          } else {
            return (article.title.toLocaleLowerCase().startsWith(this.searchTerm.toLocaleLowerCase()) ||
              article.description.toLocaleLowerCase().startsWith(this.searchTerm.toLocaleLowerCase())) &&
              article.tag === this.selectedTag;
          }
        }
        if (this.selectedTag !== '') {
          return article.tag === this.selectedTag;
        }
        return true;
      });
    }

  }

  // onSearch(): void {
  //   console.log(this.searchText.value);
  //   console.log(this.selectedTag, ' tag');

  //   this.filteredArticles = this.articles.filter(article => {
  //     const articleCopy = new Article(
  //       article.id,
  //       article.title,
  //       article.description,
  //       article.content,
  //       article.date,
  //       article.rating,
  //       article.uid,
  //       article.tag,
  //       article.image,
  //     );

  //     if (this.searchText.value === '') { return true; }
  //     articleCopy.title = articleCopy.title.toLowerCase();
  //     articleCopy.description = articleCopy.description.toLowerCase();
  //     this.searchText.value = this.searchText.value.toLowerCase();
  //     if (this.selectedTag === '') {
  //       return (articleCopy.title.startsWith(this.searchText.value) || (articleCopy.description.startsWith(this.searchText.value)));
  //     } else {
  //       return ((articleCopy.title.startsWith(this.searchText.value) ||
  //         (articleCopy.description.startsWith(this.searchText.value)))) &&
  //         (this.selectedTag === articleCopy.tag);
  //     }
  //   }
  //   );
  // }
}
