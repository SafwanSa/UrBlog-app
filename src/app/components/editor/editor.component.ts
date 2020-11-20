import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      content: ['', Validators.required]
    });
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

  discard(): void {
    this.router.navigateByUrl('/articles');
  }

}
