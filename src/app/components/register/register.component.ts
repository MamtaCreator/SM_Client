import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../auth.service';
import { MatOption, MatSelectModule } from '@angular/material/select';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatInputModule, MatButtonModule,MatSelectModule,MatOption],
  template: `
    <mat-card>
      <h2>Register</h2>
      <form (submit)="register()">
        <mat-form-field>
          <input matInput placeholder="Name" [(ngModel)]="name" name="name" required />
        </mat-form-field>
        <mat-form-field>
          <input matInput placeholder="Email" [(ngModel)]="email" name="email" required />
        </mat-form-field>
        <mat-form-field>
          <input matInput type="password" placeholder="Password" [(ngModel)]="PasswordHash" name="password" required />
        </mat-form-field>
        <mat-form-field>
          <mat-label>Select Role</mat-label>
          <mat-select [(ngModel)]="selectedrole" name="role" required>
            <mat-option *ngFor="let r of roles" [value]="r.role">{{ r.role }}</mat-option>
          </mat-select>
        </mat-form-field>
        <button mat-raised-button color="primary" type="submit">Register</button>
      </form>
    </mat-card>
  `,
  styles: [
    `
      mat-card {
        width: 400px;
        margin: 20px auto;
        padding: 20px;
      }
      mat-form-field {
        display: block;
        width: 100%;
        margin-bottom: 10px;
      }
    `
  ]
})
export class RegisterComponent implements OnInit {
    ngOnInit() {
      this.fetchRoles();
    }
    // fetchRoles() {
    //   this.authService.getRoles().subscribe({
    //     next: (data) => {
    //       console.log('Roles from API:', data);  // ✅ Check structure
    //       this.roles = data;
    //     },
    //     error: (error) => console.error('Error fetching roles:', error)
    //   });
    // }
fetchRoles() {
  this.authService.getRoles().subscribe((data) => {
  this.roles = data.map(r => ({ role: r.role.role }));
});

}
  name = '';
  email = '';
  PasswordHash = '';
  roles:  {role:string }[] = [];
  selectedrole:string = '';
  private authService = inject(AuthService);
  private router = inject(Router);

  register() {
    const user: User = {
      name: this.name,
      email: this.email,
      PasswordHash: this.PasswordHash,
      role : this.selectedrole
    };


    this.authService.register(user).subscribe({
      next: (response) => {
        if (response.success) {
          console.log('Registration successful:', response.message);
          this.router.navigate(['/login']);
        } else {
          console.error('Registration failed:', response.message);
        }
      },
      error: (error) => {
        console.error('Error during registration:', error);
      }
    });
  }
}
