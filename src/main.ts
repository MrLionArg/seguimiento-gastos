// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideCharts } from 'ng2-charts';
import { provideRouter } from '@angular/router';

import { AppComponent } from './app/app.component';
import { appConfig }    from './app/app.config';
import { appRoutes }    from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideCharts(),
    provideRouter(appRoutes),
    ...appConfig.providers
  ]
})
.catch(err => console.error(err));