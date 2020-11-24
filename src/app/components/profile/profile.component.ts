import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable, Subscriber } from 'rxjs';
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
  form: FormGroup;
  isUserController = false;
  isEditingProfile = false;



  constructor(
    private userService: UserService,
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
    this.isProcessing = true;

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const articles$ = this.articleService.getAll$()
        .pipe(map(articles => articles.filter(article => article.uid === id)));

      this.userAndArticles$ = combineLatest([this.userService.get$(id), articles$]);
      this.userAndArticles$.subscribe(user => {
        if (user[0].uid !== id && user[0].role !== Role.Admin) {
          this.router.navigateByUrl(`/profile/${user[0].uid}`);
        }
        this.firstName.setValue(user[0].firstName);
        this.lastName.setValue(user[0].lastName);
        this.email.setValue(user[0].email);
        if (user[0].uid === id) { this.isUserController = true; }

        this.isProcessing = false;
      });
    } else {
      console.log('No id. This should not happened.');

      this.isProcessing = false;
    }
  }


  get firstName(): any {
    return this.form.get('firstName');
  }

  get lastName(): any {
    return this.form.get('lastName');
  }

  get email(): any {
    return this.form.get('email');
  }

  getErrorMessage(): string {
    if (this.firstName.hasError('required')
      || this.lastName.hasError('required')) {
      return 'You must enter a value';
    }
  }

  onSave(): void {
    this.isEditingProfile = !this.isEditingProfile;
    const newf = this.firstName.value;
    const newl = this.lastName.value;

    if (newf !== '' && newl !== '') {
      this.userAndArticles$.subscribe(user => {
        user[0].firstName = newf;
        user[0].lastName = newl;
        this.userService.save(user[0]);
      });
    }
  }



}
