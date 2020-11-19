import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validator, Validators} from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/auth';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  loading = false;
  serverMessage: string = "";

  constructor(
    private afAuth: AngularFireAuth,
    private fb: FormBuilder,
    private authService: AuthService
    ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]], 
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get email(){
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }


  async onSubmit() {
    this.loading = true;

    const email = this.email.value;
    const password = this.password.value;

    this.serverMessage = await this.authService.login(email, password);

    this.loading = false;
  }
}
