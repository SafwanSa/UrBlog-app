import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Issue, IssueService } from 'src/app/services/issue.service';

@Component({
  selector: 'app-submit-issue',
  templateUrl: './submitIssue.component.html',
  styleUrls: ['./submitIssue.component.css']
})
export class SubmitIssueComponent implements OnInit {

  form: FormGroup;
  isProcessed = false;

  constructor(
    private fb: FormBuilder,
    private issueService: IssueService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  get title(): any {
    return this.form.get('title');
  }

  get description(): any {
    return this.form.get('description');
  }

  onSubmit(): void {
    this.isProcessed = true;
    const t = new Date();
    this.issueService.saveIssue(new Issue(
      `${t.getTime()}`,
      this.title.value,
      this.description.value,
      new Date(),
      false,
      ''
    )).then(() => {
      this.form.reset();
      this.isProcessed = false;
    });
  }
}
