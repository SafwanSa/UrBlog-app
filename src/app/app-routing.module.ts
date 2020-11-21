import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticlesComponent } from './components/articles/articles.component';
import { EditorComponent } from './components/editor/editor.component';
import { HomeComponent } from './components/home/home.component';
import { IssuesComponent } from './components/issues/issues.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SubmitIssueComponent } from './components/submitIssue/submitIssue.component';
import { UsersComponent } from './components/users/users.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  { path: 'articles', component: ArticlesComponent },

  {
    path: 'issues', component: IssuesComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'users', component: UsersComponent,
    canActivate: [AuthGuard],
  },

  { path: 'submitIssue', component: SubmitIssueComponent },

  { path: 'register', component: RegisterComponent },

  { path: 'login', component: LoginComponent },

  {
    path: 'editor', component: EditorComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'profile', component: ProfileComponent,
    canActivate: [AuthGuard],
  },

  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
