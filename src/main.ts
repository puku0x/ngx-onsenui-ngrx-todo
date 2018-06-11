import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { onsPlatform } from 'ngx-onsenui';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

if (onsPlatform.isIPhoneX()) {
  const html = document.documentElement;
  html.setAttribute('onsflag-iphonex-portrait', '');
  html.setAttribute('onsflag-iphonex-landscape', '');
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
