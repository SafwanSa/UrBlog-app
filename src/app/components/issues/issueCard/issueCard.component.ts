import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Issue, IssueService } from '../../../services/issue.service';

@Component({
  selector: 'app-issue-card',
  templateUrl: './issueCard.component.html',
  styleUrls: ['./issueCard.component.css']
})
export class IssueCardComponent implements OnInit {

  @Input() issue: Issue;
  isProcessed = false;

  constructor(private issueService: IssueService, private userService: UserService) { }

  ngOnInit(): void {


  }

  processStateHandler(): void {
    this.isProcessed = true;
    this.issue.isProcessed = !this.issue.isProcessed;
    this.userService.retrieveCurrentUser().subscribe(user => {
      if (!user) {
        this.isProcessed = false;
        return;
      }
      this.issue.uid = user.uid;
      this.issueService.saveIssue(this.issue)
        .then(_ => {
          this.isProcessed = false;
        });
    });
  }
}
