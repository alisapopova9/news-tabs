import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsService } from './services/news.service';
import { ApiKeyInterceptorService } from './interceptors/api-key-interceptor-service';
import { UrlService } from './services/url.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    NewsService,
    ApiKeyInterceptorService,
    UrlService
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
