import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { QuillModule } from 'ngx-quill';
// Firebase modules
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticlesComponent } from './articles/articles.component';
import { HeaderComponent } from './header/header.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { IssuesComponent } from './issues/issues.component';
import { SubmitIssueComponent } from './submitIssue/submitIssue.component';
import { HomeComponent } from './home/home.component';
import {ArticleComponent} from './articles/article/article.component';
import { EditorComponent } from './editor/editor.component';
import { ProfileComponent } from './profile/profile.component';
import {IssueCardComponent} from './issues/issueCard/issueCard.component';
import {UserCardComponent} from './users/userCard/userCard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

// Get firebase credentials
import {firebaseConfig} from './config/firebase.config';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
const config = firebaseConfig;

@NgModule({
  declarations: [
    AppComponent,
      ArticlesComponent,
      HeaderComponent,
      RegisterComponent,
      LoginComponent,
      UsersComponent,
      IssuesComponent,
      SubmitIssueComponent,
      HomeComponent,
      ArticleComponent,
      EditorComponent,
      ProfileComponent,
      IssueCardComponent,
      UserCardComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),
    MatSnackBarModule,
    // 3. Initialize
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, NoopAnimationsModule // storage
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
