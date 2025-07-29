import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, MatButtonModule],
  template: `
    <mat-toolbar color="primary">
      <span>School Management System</span>
      <span class="spacer"></span>
      <button mat-button (click)="navigate('/login')">Login</button>
      <button mat-button (click)="navigate('/register')">Register</button>
      <button mat-button (click)="navigate('/dashboard')">Dashboard</button>
    </mat-toolbar>
    <router-outlet></router-outlet>
  `,
  styles: [`
    .spacer { flex: 1; }
    mat-toolbar { display: flex; }
  `]
})
export class AppComponent {
  constructor(private router: Router) {}

  navigate(path: string) {
    this.router.navigate([path]);
  }
}
