import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

if ('serviceWorker' in navigator && environment.production) {
  console.log("Service Worker in main.ts");
  window.addEventListener('load', () => {
    console.log("on page Load Service Worker in main.ts");
    navigator.serviceWorker.register('/ngsw-worker.js', {
      scope: '/',
    })
      .then(registration => {
        console.log("Service Worker registration completed main.ts", registration);
      });
  });
