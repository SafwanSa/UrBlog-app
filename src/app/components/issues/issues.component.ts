import { Component, OnInit } from '@angular/core';
import { Issue, IssueService } from '../../services/issue.service';
@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})
export class IssuesComponent implements OnInit {

  issues: Issue[];
  constructor(private issueService: IssueService) { }

  ngOnInit(): void {
    // this.issueService.addDummyData();
    this.issueService.getAllIssues().subscribe(issues => this.issues = issues);
  }
}
