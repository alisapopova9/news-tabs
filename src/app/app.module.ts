import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewsListComponent } from './pages/news/news-list/news-list.component';
import { InputComponent } from './shared/components/input/input.component';
import { AllNewsComponent } from './pages/news/all-news/all-news.component';
import { TopNewsComponent } from './pages/news/top-news/top-news.component';
import { ApiKeyInterceptorService } from './core/interceptors/api-key-interceptor-service';
import { TabsComponent } from './components/tabs/tabs.component';

@NgModule({
  declarations: [
    AppComponent,
    NewsListComponent,
    InputComponent,
    AllNewsComponent,
    TopNewsComponent,
    TabsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiKeyInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
