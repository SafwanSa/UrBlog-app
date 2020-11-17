export { Issue };

class Issue {
  id: string;
  title: string;
  description: string;
  date: Date;
  isProcessed: boolean;
  staffUid: string;


  constructor(issue: Issue | any) {
    this.id = issue.id;
    this.title = issue.title;
    this.description = issue.description;
    this.date = issue.date;
    this.isProcessed = issue.isProcessed;
    this.staffUid = issue.staffUid;
  }


}