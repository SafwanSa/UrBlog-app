import { Component, OnInit, Input } from '@angular/core';
import { Issue, IssueService } from '../../../services/issue.service';

@Component({
  selector: 'app-issue-card',
  templateUrl: './issueCard.component.html',
  styleUrls: ['./issueCard.component.css']
})
export class IssueCardComponent implements OnInit {

  @Input() issue: Issue;
  isProcessed = false;

  constructor(private issueService: IssueService) { }

  ngOnInit(): void {
  }

  processStateHandler(): void {
    this.isProcessed = true;
    this.issue.isProcessed = !this.issue.isProcessed;
    this.issueService.saveIssue(this.issue)
      .then(_ => {
        this.isProcessed = false;
      });
  }
}
