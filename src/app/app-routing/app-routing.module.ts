import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PreviewComponent} from '../preview/preview.component';

const routes: Routes = [
  {
  path: 'blog',
  loadChildren: '../blog/blog.module#BlogModule'
},
  {path: '**', component: PreviewComponent, data: {title: 'Atila | Scholarships Automated. The Right Way'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
