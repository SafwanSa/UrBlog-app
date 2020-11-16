import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { QuillModule } from 'ngx-quill';

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
    QuillModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
