import { Component, OnInit } from '@angular/core';
import { Article, ArticleService } from 'src/app/services/article.service';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { User, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User = new User();
  articles: Article[];
  isProcessing = true;

  constructor(private userService: UserService, private articleService: ArticleService, private fr: FirestoreService) { }

  ngOnInit(): void {
    this.isProcessing = true;
    this.userService.retrieveCurrentUser().subscribe(user => {
      if (!user) {
        return;
      }
      this.user = user;
      this.fr.col$<Article>('articles', (ref) => ref.where('uid', '==', user.uid))
        .subscribe(articles => {
          this.articles = articles;
          this.isProcessing = false;
        });
    });
  }

}
