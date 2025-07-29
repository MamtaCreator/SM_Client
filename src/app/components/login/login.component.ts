import { Component, inject } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule, MatButtonModule, MatCardModule],
})
export class LoginComponent {
  email = '';
  PasswordHash = '';
  authService = inject(AuthService);
  router = inject(Router);
  snackBar = inject(MatSnackBar);

  login() {

    // const credentials = { email: this.email, password: this.password };

    this.authService.login(this.email,this.PasswordHash).subscribe({
      next: (response: any) => {
        localStorage.setItem('token', response.token);
        this.snackBar.open('Login Successful!', 'Close', { duration: 3000 });
        this.router.navigate(['/dashboard']);
      },

      error: () => {
        this.snackBar.open('Invalid email or password.', 'Close', { duration: 3000 });
      },
    });
  }
}
