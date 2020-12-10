import { FooterComponent } from './components/footer/footer.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { QuillModule } from 'ngx-quill';
// Firebase modules
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';
import {
  AngularFireStorageModule,
  AngularFireStorageReference,
  AngularFireUploadTask
} from '@angular/fire/storage';

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
import { ViewerComponent } from './components/viewer/viewer.component';
import { RateComponent } from './components/viewer/rate/rate.component';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
// Get firebase credentials
import { environment } from '../environments/environment';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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
    UserCardComponent,
    ViewerComponent,
    RateComponent,
    FooterComponent
  ],
  imports: [
    MatCardModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),
    MatSnackBarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatRadioModule,
    MatGridListModule,
    MatDialogModule,
    MatDividerModule,
    MatTabsModule,
    MatToolbarModule,
    MatMenuModule,
    // 3. Initialize
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule,
    NoopAnimationsModule,
    AngularFireAuthGuardModule,
    NgbModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
