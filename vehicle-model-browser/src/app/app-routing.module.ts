import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutPageComponent } from './about-page/about-page.component';
import { ModelsPageComponent } from './models-page/models-page.component';

const routes: Routes = [
  { path: 'about', component: AboutPageComponent },
  { path: 'models', component: ModelsPageComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
