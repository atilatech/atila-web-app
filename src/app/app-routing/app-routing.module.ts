import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PreviewComponent} from '../preview/preview.component';
import {TeamComponent} from '../team/team.component';

const routes: Routes = [
  {
  path: 'blog',
  loadChildren: '../blog/blog.module#BlogModule'
},
  { path: 'scholarships',   redirectTo: '/scholarship', pathMatch: 'prefix' },
  {
    path: 'scholarship',
    loadChildren: '../scholarship/scholarship.module#ScholarshipModule'
  },
  {path: 'team', component: TeamComponent, data: {title: 'Team - Atila'}},
  {path: '**', component: PreviewComponent, data: {title: 'Atila | Scholarships Automated. The Right Way'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
