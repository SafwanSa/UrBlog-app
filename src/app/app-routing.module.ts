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

import { AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToHome = () => redirectUnauthorizedTo(['/']);
const redirectLoggedInToAccount = () => redirectLoggedInTo(['/profile']);

const routes: Routes = [
  { path: 'articles', component: ArticlesComponent },
  { path: 'issues', component: IssuesComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToHome } },
  { path: 'users', component: UsersComponent },
  { path: 'submitIssue', component: SubmitIssueComponent },
  {
    path: 'register', component: RegisterComponent,
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToAccount }
  },
  { path: 'login', component: LoginComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToAccount } },
  { path: 'editor', component: EditorComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
