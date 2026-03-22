import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    // Provee el HttpClient with fetch implementation, nuevo estandar para Angular 17
    provideHttpClient(withFetch()),
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ]
};
