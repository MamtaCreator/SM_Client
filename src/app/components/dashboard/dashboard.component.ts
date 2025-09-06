import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule]
})
export class DashboardComponent implements AfterViewInit {

  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  ngAfterViewInit(): void {
    this.createAttendanceChart();
    this.createFeesChart();
    this.createMarksChart();
    this.createAdmissionsChart();
    this.createPerformanceChart();
    this.createTeachersChart();
    this.createOverallChart();
  }

  // Attendance (line)
  createAttendanceChart() {
    new Chart('attendanceChart', {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Attendance (%)',
          data: [92, 88, 95, 85, 90, 93],
          borderColor: '#36a2eb',
          backgroundColor: 'rgba(54, 162, 235, 0.3)',
          fill: true,
          tension: 0.3
        }]
      },
      options: { responsive: true, scales: { y: { max: 100, beginAtZero: true } } }
    } as ChartConfiguration);
  }

  // Fees (doughnut instead of bar to avoid conflict)
  createFeesChart() {
    new Chart("feesChart", {
      type: 'doughnut',
      data: {
        labels: ['Collected', 'Pending'],
        datasets: [{
          data: [4250000, 750000],
          backgroundColor: ['#4caf50', '#e53935']
        }]
      }
    } as ChartConfiguration);
  }

  // Marks (pie)
  createMarksChart() {
    new Chart('marksChart', {
      type: 'pie',
      data: {
        labels: ['Math', 'Science', 'English', 'History', 'Computer'],
        datasets: [{
          label: 'Marks',
          data: [85, 78, 92, 74, 88],
          backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56', '#4bc0c0', '#9966ff']
        }]
      }
    } as ChartConfiguration);
  }

  // Admissions
  createAdmissionsChart() {
    new Chart("admissionsChart", {
      type: 'bar',
      data: {
        labels: ['Std 1', 'Std 2', 'Std 3', 'Std 4', 'Std 5'],
        datasets: [{
          label: 'Admissions',
          data: [50, 60, 45, 70, 55],
          backgroundColor: '#42a5f5'
        }]
      },
      options: { responsive: true, plugins: { legend: { display: false } } }
    } as ChartConfiguration);
  }

  // Performance
  createPerformanceChart() {
    new Chart("performanceChart", {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [{
          label: 'Average Marks %',
          data: [72, 75, 70, 78, 80],
          borderColor: '#1976d2',
          fill: false,
          tension: 0.3
        }]
      }
    } as ChartConfiguration);
  }

  // Teachers Attendance
  createTeachersChart() {
    new Chart("teachersChart", {
      type: 'pie',
      data: {
        labels: ['Present', 'Absent'],
        datasets: [{
          data: [38, 4],
          backgroundColor: ['#66bb6a', '#ef5350']
        }]
      }
    } as ChartConfiguration);
  }

  // Overall Stats
  createOverallChart() {
    new Chart("overallChart", {
      type: 'bar',
      data: {
        labels: ['Students', 'Fees'],
        datasets: [{
          label: 'Count',
          data: [850, 5000000],
          backgroundColor: ['#29b6f6', '#8e24aa']
        }]
      },
      options: { responsive: true, plugins: { legend: { display: false } } }
    } as ChartConfiguration);
  }
}
