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
import { ViewerComponent } from './components/viewer/viewer.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { BloggerGuard } from './guards/blogger.guard';
import { StaffGuard } from './guards/staff.guard';

const routes: Routes = [
  {
    path: 'issues', component: IssuesComponent,
    canActivate: [AuthGuard, StaffGuard],
  },

  {
    path: 'users', component: UsersComponent,
    canActivate: [AuthGuard, AdminGuard],
  },

  {
    path: 'editor', component: EditorComponent,
    canActivate: [AuthGuard, BloggerGuard],
  },

  {
    path: 'editor/:id', component: EditorComponent,
    canActivate: [AuthGuard, BloggerGuard],
  },


  {
    path: 'profile', component: ProfileComponent,
    canActivate: [AuthGuard],
  },

  { path: 'submitIssue', component: SubmitIssueComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'articles', component: ArticlesComponent },
  { path: 'article/:id', component: ViewerComponent },
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
