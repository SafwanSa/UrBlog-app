import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  form: FormGroup;
  isProcessed = false;
  users: User[];
  filteredUsers: User[];

  constructor(private userService: UserService, private fb: FormBuilder) { }

  selectedTag = '';

  ngOnInit(): void {
    this.form = this.fb.group({
      searchText: ['']
    });
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
      this.filteredUsers = this.users;
    });
  }

  get searchText(): any {
    return this.form.get('searchText');
  }

  onSearch(): void {
    this.filteredUsers = this.users.filter(user => {
      if (this.searchText.value === '') { return true; }
      if (this.selectedTag === '') {
        return user.firstName.startsWith(this.searchText.value) ||
          user.lastName.startsWith(this.searchText.value);
      } else {
        return user.firstName.startsWith(this.searchText.value) ||
          user.lastName.startsWith(this.searchText.value) && this.selectedTag === user.role;
      }
    }
    );
  }

  onSelect(tag): void {
    this.selectedTag = tag;
    this.filteredUsers = this.users.filter(user => {
      if (this.selectedTag !== '') {
        return user.role.toLowerCase() === this.selectedTag.toLowerCase();
      } else {
        return true;
      }
    });
  }

}
