import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { Article, ArticleService } from 'src/app/services/article.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  form: FormGroup;
  isProcessing = true;
  contentString: string;
  article: Article;

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      content: ['', Validators.required]
    });
    this.lockForArticle();
  }

  lockForArticle(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.articleService.get$(id).subscribe(article => {
        this.article = article;
        if (this.article) {
          this.title.setValue(this.article.title);
          this.description.setValue(this.article.description);
          this.content.setValue(this.article.content);
        }
      });
    }
  }

  get title(): any {
    return this.form.get('title');
  }

  get description(): any {
    return this.form.get('description');
  }

  get content(): any {
    return this.form.get('content');
  }

  onSubmit(): void {
    this.isProcessing = true;

    this.authService.user$.subscribe(user => {
      const t = new Date();
      this.articleService.save(new Article(
        `${user.uid}-${t.getTime()}`,
        this.title.value,
        this.description.value,
        this.contentString,
        new Date(),
        0,
        user.uid
      )).then(_ => {
        this.isProcessing = false;
      });
    });
  }

  delete(): void {
    if (this.article) {
      this.articleService.deleteArticle(this.article.id).then(() => {
        this.router.navigateByUrl('/articles');
      });
    }
    this.router.navigateByUrl('/articles');
  }

}
