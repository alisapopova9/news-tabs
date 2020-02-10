import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsComponent } from './pages/news/news.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'top-headlines',
    pathMatch: 'full'
  },
  {
    path: 'top-headlines',
    component: NewsComponent
  },
  {
    path: 'everything',
    component: NewsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
