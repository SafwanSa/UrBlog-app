import { Component, Input, OnInit } from '@angular/core';
import { User, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './userCard.component.html',
  styleUrls: ['./userCard.component.css']
})
export class UserCardComponent implements OnInit {

  @Input() user: User;
  isProcessed = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  blockStateHandler(): void {
    this.isProcessed = true;
    this.user.isBlocked = !this.user.isBlocked;
    this.userService.saveUser(this.user).then(() => {
      this.isProcessed = false;
    });
  }

}
