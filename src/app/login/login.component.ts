import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatProgressSpinnerModule,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    MatButton,
    MatLabel,
    MatError,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  passwordFieldType: string = 'password';
  loading: boolean = false;
  errorMsg: string = "";

  public emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  logForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.pattern(this.emailRegex)]),
    password: new FormControl("", [Validators.required]),
  });

  constructor(
    private apiService: ApiService,
    private router: Router,
  ) {}

  sendFormLogin() {
    if (this.logForm.invalid) {
      this.errorMsg = "Veuillez entrer un email et un mot de passe valides.";
      return;
    }

    const email = this.logForm.value.email;
    const password = this.logForm.value.password;

    this.loading = true;
    const data = { email: email, password: password };

    this.apiService.post('auth/login', data).subscribe(
      data => {
        this.router.navigate(['/project-menu']);
        this.loading = false;
      },
      error => {
        this.loading = false;
        const errorResponse = error.error.code;

        if (errorResponse === "EMAIL_NOT_VERIFIED") {
          const dataOTP = { email: email };
          this.apiService.post('auth/resend-otp', dataOTP).subscribe(
            () => {
              this.router.navigate(['/authentification']);
            },
            otpError => {
              console.log('OTP Error:', otpError);
            }
          );
        } else if (errorResponse === "BAD_CREDENTIALS") {
          this.errorMsg = "Email ou mot de passe incorrect";
        } else {
          this.errorMsg = "Erreur réseau, veuillez réessayer";
          console.log("Error:", error);
        }
      }
    );
  }

  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }
}
