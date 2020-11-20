import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User, UserService, Role } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  loading = false;
  serverMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService
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

  async onSubmit(): Promise<void> {
    this.loading = true;
    const email = this.email.value;
    const password = this.password.value;

    const result = await this.authService.signUp(email, password);
    if (result.error) { this.serverMessage = result.error; return; }
    if (result.user) {
      this.userService.saveUser(new User(
        result.user.uid,
        this.firstName.value,
        this.lastName.value,
        result.user.email,
        Role.Blogger
      ));
    }

    this.loading = false;
  }
}
