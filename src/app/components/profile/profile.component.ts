import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Article, ArticleService } from 'src/app/services/article.service';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { User, UserService, Role } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userAndArticles$: Observable<any>;
  isProcessing = true;

  constructor(
    private userService: UserService,
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isProcessing = true;

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const articles$ = this.articleService.getAll$()
        .pipe(map(articles => articles.filter(article => article.uid === id)));

      this.userAndArticles$ = combineLatest([this.userService.get$(id), articles$]);
      this.userAndArticles$.subscribe(user => { if (user[0].uid !== id && user[0].role !== Role.Admin) { this.router.navigateByUrl(`/profile/${user[0].uid}`); } });
    } else {
      console.log('No id. This should not happend.');
    }
  }

}
