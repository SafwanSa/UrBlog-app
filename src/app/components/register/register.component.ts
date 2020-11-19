import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../../services/auth.service';

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
    private afAuth: AngularFireAuth,
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      gender: ['0', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', []]
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

  get gender(): any {
    return this.form.get('gender');
  }

  get password(): any {
    return this.form.get('password');
  }

  get confirmPassword(): any {
    return this.form.get('confirmPassword');
  }

  get passwordDoesMatch(): any {
    return this.password.value === this.confirmPassword.value;
  }

  async onSubmit(): Promise<void> {
    this.loading = true;

    const email = this.email.value;
    const password = this.password.value;

    const result = await this.authService.signUp(email, password);
    if (result.error) { this.serverMessage = result.error; }

    this.loading = false;
  }
}
