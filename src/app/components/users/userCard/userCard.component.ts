import { AuthService } from './../../../services/auth.service';
import { ArticleService } from './../../../services/article.service';
import { Component, Input, OnInit } from '@angular/core';
import { User, UserService } from 'src/app/services/user.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user-card',
  templateUrl: './userCard.component.html',
  styleUrls: ['./userCard.component.css'],
})
export class UserCardComponent implements OnInit {
  @Input() user: User;
  isProcessed = false;
  numOfArticles = 0;
  lastSeen = new Date();

  constructor(
    private userService: UserService,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    this.articleService
      .getAll$()
      .pipe(
        map((articles) =>
          articles.filter((article) => article.uid === `${this.user.uid}`)
        )
      )
      .subscribe((filteredArticles) => {
        this.numOfArticles = filteredArticles.length;
        let last = filteredArticles[0];
        filteredArticles.forEach((article2) => {
          if (last.date < article2.date && last.id !== article2.id) {
            last = article2;
          }
          this.lastSeen = last.date;
        });
      });
  }

  blockStateHandler(): void {
    this.isProcessed = true;
    this.user.isBlocked = !this.user.isBlocked;
    this.userService.saveUser(this.user).then(() => {
      this.isProcessed = false;
    });
  }
  getDate(date): string {
    var date1 = this.userService.getDate(date, true);
    if (date1.includes('Non')) {
      return date.toString().slice(4, 15);
    } else {
      return date1;
    }
  }
}
