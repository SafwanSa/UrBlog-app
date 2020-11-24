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
  serverMessage = '';

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

  getErrorMessage(): string {
    if (this.title.hasError('required')) {
      return 'You must enter a title';
    }

    if (this.description.hasError('required')) {
      return 'You must enter a description';
    }
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
    }).catch(err => {
      this.serverMessage = err;
    });
  }
}
