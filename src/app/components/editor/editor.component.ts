import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Article, ArticleService } from 'src/app/services/article.service';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize, map } from 'rxjs/operators';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  form: FormGroup;
  isProcessing = true;
  article: Article;

  selectedFile: File = null;
  imageUrl;
  downloadURL: Observable<string>;

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private storage: AngularFireStorage
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      content: ['', Validators.required],
      tag: ['']
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
          this.tag.setValue(this.article.tag);
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

  get tag(): any {
    return this.form.get('tag');
  }

  getErrorMessage(): string {
    if (this.title.hasError('required')
      || this.description.hasError('required')
      || this.content.hasError('required')) {
      return 'Please enter the value';
    }
  }

  onSubmit(): void {
    this.isProcessing = true;

    this.authService.user$.subscribe(user => {
      const t = new Date();
      this.articleService.save(new Article(
        this.article ? this.article.id : `${user.uid}-${t.getTime()}`,
        this.title.value,
        this.description.value,
        this.content.value,
        this.article ? this.article.date : new Date(),
        this.article ? this.article.rating : 0,
        user.uid,
        this.tag.value,
        !!this.imageUrl ? this.imageUrl : this.article.image
      )).then(_ => {
        this.isProcessing = false;
        this.router.navigateByUrl(`article/${this.article ? this.article.id : `${user.uid}-${t.getTime()}`}`);
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

  onFileSelected(event): void {
    this.authService.user$.subscribe(user => {
      const n = Date.now();
      const file = event.target.files[0];
      const filePath = `articleImages/${user.uid}-${n}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            this.downloadURL = fileRef.getDownloadURL();
            this.downloadURL.subscribe(url => {
              if (url) {
                this.imageUrl = url;
              }
            });
          })
        ).subscribe();
    });
  }
}
