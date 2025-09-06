import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';
import { authInterceptor } from './app/Interceptors/auth.interceptor';
import { AuthService } from './app/auth.service';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideCharts } from 'ng2-charts';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    provideRouter(appRoutes),
    importProvidersFrom(BrowserAnimationsModule),
    provideCharts(), // 👈 Register here

    { provide: 'AuthService', useFactory: AuthService }
  ]
}).catch(err => console.error(err));
// Removed custom provideNgCharts function as it's not needed.

