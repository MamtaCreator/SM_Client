import { Component, inject } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOption } from "@angular/material/core";
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule, MatButtonModule, MatCardModule,MatSelectModule , MatOption,MatSelectModule],
})
// export class LoginComponent {
//   email = '';
//   PasswordHash = '';
//   authService = inject(AuthService);
//   router = inject(Router);
//   snackBar = inject(MatSnackBar);

//   login() {

//     // const credentials = { email: this.email, password: this.password };

//     this.authService.login(this.email,this.PasswordHash).subscribe({
//       next: (response: any) => {
//         localStorage.setItem('token', response.token);
//         this.snackBar.open('Login Successful!', 'Close', { duration: 3000 });
//         this.router.navigate(['/dashboard']);
//       },

//       error: () => {
//         this.snackBar.open('Invalid email or password.', 'Close', { duration: 3000 });
//       },
//     });
//   }
// }


export class LoginComponent {
   selectedrole:string = '';
  roles:  {role:string }[] = [];
  email = '';
  password = '';
  schoolID?: number;
  studentID = '';

  authService = inject(AuthService);
  router = inject(Router);
  snackBar = inject(MatSnackBar);

  ngOnInit() {
      this.fetchRoles();
    }

fetchRoles() {
  this.authService.getRoles().subscribe((data) => {
  this.roles = data.map(r => ({ role: r.role.role.toUpperCase() }));
});
}
  login() {
    const payload: any = {
      role: this.selectedrole,
      password: this.password
    };

    if (['ADMIN', 'OWNER'].includes(this.selectedrole)) {
      payload.schoolID = this.schoolID;
    }

    if (['TEACHER', 'PARENT', 'STAFF'].includes(this.selectedrole)) {
      payload.email = this.email;
    }

    if (this.selectedrole === 'STUDENT') {
      payload.studentID = this.studentID;
    }

    this.authService.login(payload).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        this.snackBar.open('Login successful', 'Close', { duration: 3000 });
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.snackBar.open(
          err.error?.message || 'Invalid credentials',
          'Close',
          { duration: 3000 }
        );
      }
    });
  }
}

