// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient }    from '@angular/common/http';
import { provideCharts }        from 'ng2-charts';

import { AppComponent } from './app/app.component';
import { appConfig }    from './app/app.config';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),    // Enables HttpClient across your app
    provideCharts(),        // Makes <canvas baseChart> and its inputs available globally
    ...appConfig.providers
  ]
})
.catch(err => console.error(err));