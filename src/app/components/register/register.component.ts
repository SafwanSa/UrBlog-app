import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User, UserService, Role } from '../../services/user.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  loading = false;
  serverMessage = '';
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get firstName(): any {
    return this.form.get('firstName');
  }

  get lastName(): any {
    return this.form.get('lastName');
  }

  get email(): any {
    return this.form.get('email');
  }

  get password(): any {
    return this.form.get('password');
  }

  getErrorMessage(): string {
    if (this.password.hasError('minlength')) {
      return 'Password must be at least 6 characters';
    }
    else if (this.email.hasError('required')
      || this.firstName.hasError('required')
      || this.lastName.hasError('required')
      || this.password.hasError('required')) {
      return 'You must enter a value';
    } else if (this.email.hasError('email')) {
      return 'Not a valid email';
    }
  }

  async onSubmit(): Promise<void> {
    this.loading = true;
    const email = this.email.value;
    const password = this.password.value;

    const result = await this.authService.signUp(email, password);
    if (result.error) {
      this.serverMessage = result.error;
      this.loading = false;
      return;
    }
    if (result.user) {
      this.userService.saveUser(new User(
        result.user.uid,
        this.firstName.value,
        this.lastName.value,
        result.user.email,
        Role.Blogger
      )).then(() => this.router.navigateByUrl('/profile'));
    }
    this.loading = false;
  }
}
