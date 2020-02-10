import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewsListComponent } from './pages/news/news-list/news-list.component';
import { InputComponent } from './shared/components/input/input.component';
import { NewsComponent } from './pages/news/news.component';
import { ApiKeyInterceptorService } from './core/interceptors/api-key-interceptor-service';
import { TabsComponent } from './components/tabs/tabs.component';
import { ModalModule } from './shared/components/modal/modal.module';
import { NewsModalComponent } from './components/news-modal/news-modal.component';
import { ModalConfig } from './shared/components/modal/modal-config';
import { FormsModule } from '@angular/forms';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NewsListComponent,
    InputComponent,
    NewsComponent,
    TabsComponent,
    NewsModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ModalModule,
    FormsModule,
    CoreModule,
    BrowserAnimationsModule
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
  entryComponents: [NewsModalComponent]
})
export class AppModule { }
