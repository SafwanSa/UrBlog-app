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

  constructor(private userService: UserService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      search: ['']
    });
    this.userService.getAllUsers().subscribe(users => this.users = users);
  }

}
