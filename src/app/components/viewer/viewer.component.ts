import { Component, Input, OnInit } from '@angular/core';
import { Article, ArticleService } from 'src/app/services/article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RateComponent } from './rate/rate.component';
import { AuthService } from 'src/app/services/auth.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})
export class ViewerComponent implements OnInit {

  article: Article = new Article();
  isSignedIn = false;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    public dialog: MatDialog,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.observeAuthUser();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.articleService.get$(id).subscribe(article => {
        this.article = article;
      });
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
