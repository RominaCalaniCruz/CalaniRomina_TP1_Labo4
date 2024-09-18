import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideNgIconsConfig } from '@ng-icons/core';
import {provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environmentConfig } from '../environments/environments';
import { provideToastr } from 'ngx-toastr';
export const appConfig: ApplicationConfig = {
  providers: [
    provideNgIconsConfig({
      size: '1.5em',
      color: '#FFAE7E',
    }),
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideAnimationsAsync(), 
    provideFirebaseApp(() => initializeApp(environmentConfig)), 
    provideAuth(() => getAuth()), 
    provideFirestore(() => getFirestore()),
    provideToastr({
      timeOut: 2000,
      preventDuplicates:true,
      progressBar: true,
      closeButton: true
    })
  ]
  // #fc3d6d
};
