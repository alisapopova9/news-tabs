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
import { NewsModalModule } from './components/news-modal/news-modal.module';
import { ModalContentComponent } from './components/modal-content/modal-content.component';
import { ModalConfig } from './components/news-modal/modal-config';
import { FormsModule } from '@angular/forms';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    NewsListComponent,
    InputComponent,
    AllNewsComponent,
    TopNewsComponent,
    TabsComponent,
    ModalContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NewsModalModule,
    FormsModule,
    CoreModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiKeyInterceptorService,
      multi: true
    },
    ModalConfig
  ],
  bootstrap: [AppComponent],
  entryComponents: [ModalContentComponent]
})
export class AppModule { }
