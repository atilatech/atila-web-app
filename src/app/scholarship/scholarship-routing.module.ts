import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ScholarshipDetailComponent} from './scholarship-detail/scholarship-detail.component';
import {ScholarshipsListComponent} from './scholarships-list/scholarships-list.component';

const routes: Routes = [
  { path: '', component: ScholarshipsListComponent, data: {title: 'Atila | Scholarships Automated. The Right Way'}},
  { path: ':slug' , component: ScholarshipDetailComponent, data: {title: 'Atila - Scholarship Detail'}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScholarshipRoutingModule { }
