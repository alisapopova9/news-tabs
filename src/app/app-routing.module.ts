import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TopNewsComponent } from './pages/news/top-news/top-news.component';
import { AllNewsComponent } from './pages/news/all-news/all-news.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'top-headlines',
    pathMatch: 'full'
  },
  {
    path: 'top-headlines',
    component: TopNewsComponent
  },
  {
    path: 'everything',
    component: AllNewsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
