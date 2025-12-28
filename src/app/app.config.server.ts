import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { DOCUMENT } from '@angular/common';
import { appConfig } from './app.config';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    {
      provide: DOCUMENT,
      useFactory: () => {
        // Create a minimal document-like object for SSR
        if (typeof document !== 'undefined') {
          return document;
        }
        // Return a mock document for server-side
        return {
          body: { innerHTML: '' },
          head: { innerHTML: '' },
          createElement: () => ({}),
          querySelector: () => null,
          querySelectorAll: () => []
        } as any;
      }
    }
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
