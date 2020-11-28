import { Component, Input, OnInit } from '@angular/core';
import { Article, ArticleService } from 'src/app/services/article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RateComponent } from './rate/rate.component';
import { AuthService } from 'src/app/services/auth.service';
import { map } from 'rxjs/operators';
import { User, UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})
export class ViewerComponent implements OnInit {

  article: Article = new Article();
  user$: Observable<User>;
  isSignedIn = false;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private userService: UserService,
    public dialog: MatDialog,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.observeAuthUser();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.articleService.get$(id).subscribe(article => this.article = article);
      const userUID = id.split('-')[0];
      this.user$ = this.userService.get$(userUID);
    }
  }

  rate(): void {
    if (this.isSignedIn) {
      const dialogRef = this.dialog.open(RateComponent, {
        height: '300px',
        width: '400px',
        data: { article: this.article }
      });
    } else {
      this.router.navigateByUrl('/login');
    }

  }

  observeAuthUser(): void {
    this.authService.user$.subscribe(user => { this.isSignedIn = !!user; });
  }

}
