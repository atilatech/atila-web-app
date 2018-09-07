import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BlogPostDetailComponent} from './blog-post-detail/blog-post-detail.component';

const routes: Routes = [
  {path: ':username', redirectTo: '/profile/:username', pathMatch: 'full'},
  { path: ':username/:slug' , component: BlogPostDetailComponent, data: {title: 'Blog Post - Atila'}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
