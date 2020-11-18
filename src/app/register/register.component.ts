import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validator, Validators} from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/auth';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  loading = false;
  serverMessage: string="";

  constructor(
    private afAuth: AngularFireAuth,
    private fb: FormBuilder,
    private authService: AuthService
    ) {}

  ngOnInit() {
    this.form = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      gender: ['0', [Validators.required]],
      email: ['', [Validators.required, Validators.email]], 
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', []]
    });
  }

  get firstName(){
    return this.form.get('firstName');
  }

  get lastName(){
    return this.form.get('lastName');
  }

  get email(){
    return this.form.get('email');
  }

  get gender(){
    return this.form.get('gender');
  }

  get password(){
    return this.form.get('password');
  }

  get confirmPassword(){
    return this.form.get('confirmPassword');
  }

  get passwordDoesMatch() {
    return this.password.value === this.confirmPassword.value;
  }

  async onSubmit() {
    this.loading = true;

    const email = this.email.value;
    const password = this.password.value;

    this.authService.register(email, password).then(err => this.serverMessage = err);

    this.loading = false;
  }
}
