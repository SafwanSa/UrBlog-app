import { Injectable } from '@angular/core';
import { FireServiceBase } from './firestore/models/fire-service-base';
import { FireModelBase } from './firestore/models/fire-model-base';
import { FirestoreService } from './firestore/firestore.service';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IssueService extends FireServiceBase<Issue> {

  constructor(
    private firestore: FirestoreService,
    private authService: AuthService
  ) {
    super(Issue, 'issues', firestore);
  }

  addDummyData(): void {
    this.saveIssue(new Issue(
      '2',
      'Hello worldsdsdsdsds',
      'Here I list the best of java practices',
      new Date(),
      false,
      ''
    ));
  }
  // This going to be called by every user
  saveIssue(issue): Promise<void> {
    return this.save(issue);
  }
  // This going to be called by every staff member
  getAllIssues(): Observable<Issue[]> {
    return this.getAll$();
  }
  // This going to be called by every user profile
  getUserIssues(uid): Observable<Issue[]> {
    return this.firestore.col$<Issue>('issues', ref => ref.where('uid', '==', uid));
  }
}


export class Issue extends FireModelBase {
  constructor(
    public id: string = '',
    public title: string = '',
    public description: string = '',
    public date: Date = new Date(),
    public isProcessed: boolean = false,
    public uid: string = ''
  ) {
    super();
  }
}
