import { User } from './user.model';
import { Issue } from './issue.model';

export class Staff extends User {
  staffToken: string;
  assignedIssues: Issue[];
}
