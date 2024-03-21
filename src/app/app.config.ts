import { ApplicationConfig, InjectionToken, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { BACKEND_TOKEN_KEY, BACKEND_URL } from './tokens/superbase-tokens';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor'
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule), 
    provideHttpClient(withInterceptors([authInterceptor])),
    {
      provide: BACKEND_TOKEN_KEY,
      useValue:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3bmJobHhqcnJtc2R3bGVpYmdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA5NjIyNzEsImV4cCI6MjAyNjUzODI3MX0.zjWzW9xXouG9ILOkhAWj6aAug0A6VwUk2WIwphjXtlc',
    },
    {
      provide: BACKEND_URL,
      useValue: 'https://rwnbhlxjrrmsdwleibge.supabase.co',
    },
  ],
};
