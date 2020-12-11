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
  // filteredUsers: User[];

  constructor(private userService: UserService, private fb: FormBuilder) { }

  selectedTag = '';
  searchTerm = '';

  ngOnInit(): void {
    this.form = this.fb.group({
      searchText: ['']
    });
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
      // this.filteredUsers = this.users;
    });
  }

  get searchText(): any {
    return this.form.get('searchText');
  }

  get filtered(): User[] {
    if (!this.users) {
      return [];
    } else {
      return this.users.filter(user => {
        if (this.searchTerm !== '') {
          if (this.selectedTag === '') {
            return (user.firstName.toLocaleLowerCase().startsWith(this.searchTerm.toLocaleLowerCase()) ||
              user.lastName.toLocaleLowerCase().startsWith(this.searchTerm.toLocaleLowerCase()) ||
              this.getName(user.firstName, user.lastName).startsWith(this.searchTerm.toLocaleLowerCase()) ||
              user.email.toLocaleLowerCase().startsWith(this.searchTerm.toLocaleLowerCase()));
          } else {
            return (user.firstName.toLocaleLowerCase().startsWith(this.searchTerm.toLocaleLowerCase()) ||
              user.lastName.toLocaleLowerCase().startsWith(this.searchTerm.toLocaleLowerCase()) ||
              this.getName(user.firstName, user.lastName).startsWith(this.searchTerm.toLocaleLowerCase()) ||
              user.email.toLocaleLowerCase().startsWith(this.searchTerm.toLocaleLowerCase())) &&
              user.role.toLocaleLowerCase() === this.selectedTag.toLocaleLowerCase();
          }
        }
        if (this.selectedTag !== '') {
          return user.role.toLocaleLowerCase() === this.selectedTag.toLocaleLowerCase();
        }
        return true;
      });
    }
  }

  getName(f: string, l: string): string {
    return (f + ' ' + l).toLowerCase();
  }

  // onSearch(): void {
  //   this.filteredUsers = this.users.filter(user => {
  //     if (this.searchText.value === '') { return true; }
  //     if (this.selectedTag === '') {
  //       return user.firstName.startsWith(this.searchText.value) ||
  //         user.lastName.startsWith(this.searchText.value);
  //     } else {
  //       return user.firstName.startsWith(this.searchText.value) ||
  //         user.lastName.startsWith(this.searchText.value) && this.selectedTag === user.role;
  //     }
  //   }
  //   );
  // }

  onSelect(tag): void {
    this.selectedTag = tag;
  }

}
