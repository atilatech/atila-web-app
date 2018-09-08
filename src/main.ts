import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

// https://github.com/angular/angular-cli/issues/9021
// https://blog.angular-university.io/service-workers/
// https://juristr.com/blog/2018/01/ng-app-runtime-config/

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
}
