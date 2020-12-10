import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  loading = false;
  serverMessage = '';
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
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

    const result = await this.authService.signIn(email, password);
    if (result.error) {
      this.serverMessage = result.error;
      this.loading = false;
      return;
    } else {
      if (result.user) { this.router.navigate(['/profile', result.user.uid]); }
    }
    this.loading = false;
  }
}
