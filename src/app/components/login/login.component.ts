// src/app/components/login/login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,        // <-- para NgIf, NgFor, etc.
    ReactiveFormsModule, // <-- para formGroup, formControlName
    RouterModule         // <-- para routerLink y navigation
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMsg = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.errorMsg = '';
    if (this.loginForm.invalid) {
      this.errorMsg = 'Por favor completa todos los campos';
      return;
    }

    const { username, password } = this.loginForm.value;
    this.auth.login(username, password).subscribe(success => {
      if (success) {
        this.router.navigate(['/']);
      } else {
        this.errorMsg = 'Usuario o contraseña incorrectos';
      }
    });
  }
}