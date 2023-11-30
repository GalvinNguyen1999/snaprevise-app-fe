import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from '../../interfaces/auth'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = this.fb.group({
    name: ['', Validators.required],
    password: ['', Validators.required]
  })

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private msgService: MessageService
  ) {}

  get name() { return this.loginForm.controls['name']; }

  get password() { return this.loginForm.controls['password']; }

  loginUser() {
    this.authService.loginUser(this.loginForm.value as User).subscribe({
      next: response => {
        this.msgService.add({ severity: 'success', summary: 'Success', detail: 'Login successfully' });

        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('token', response.token);
      },

      error: error => {
        this.msgService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
      }
    })
  }
}
