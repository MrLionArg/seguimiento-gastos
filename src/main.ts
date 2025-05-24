// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient }   from '@angular/common/http';

import { AppComponent }  from './app/app.component';
import { appConfig }     from './app/app.config';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),    // <-- acá habilitamos el HttpClient
    ...appConfig.providers  // en caso de que ya tenga otros providers (Explicación de Juan)
  ]
})
.catch(err => console.error(err));