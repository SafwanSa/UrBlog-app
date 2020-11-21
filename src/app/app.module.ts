import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { QuillModule } from 'ngx-quill';
// Firebase modules
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { HeaderComponent } from './components/header/header.component';
import { RegisterComponent } from './components/./register/register.component';
import { LoginComponent } from './components/login/login.component';
import { UsersComponent } from './components/users/users.component';
import { IssuesComponent } from './components/issues/issues.component';
import { SubmitIssueComponent } from './components/submitIssue/submitIssue.component';
import { HomeComponent } from './components/home/home.component';
import { ArticleComponent } from './components/articles/article/article.component';
import { EditorComponent } from './components/editor/editor.component';
import { ProfileComponent } from './components/profile/profile.component';
import { IssueCardComponent } from './components/issues/issueCard/issueCard.component';
import { UserCardComponent } from './components/users/userCard/userCard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

// Get firebase credentials
import { environment } from '../environments/environment';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

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
    MatCardModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),
    MatSnackBarModule,
    MatButtonModule,
    // 3. Initialize
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    NoopAnimationsModule,
    AngularFireAuthGuardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
