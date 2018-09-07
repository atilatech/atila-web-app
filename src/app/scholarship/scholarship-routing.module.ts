import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ScholarshipDetailComponent} from './scholarship-detail/scholarship-detail.component';
import {AddScholarshipComponent} from './add-scholarship/add-scholarship.component';
import {ScholarshipsListComponent} from './scholarships-list/scholarships-list.component';

const routes: Routes = [
  { path: '', component: ScholarshipsListComponent, data: {title: 'Atila | Scholarships Automated. The Right Way'}},
  { path: 'add' , component: AddScholarshipComponent, data: {title: 'Add Scholarship - Atila'}},
  { path: 'edit/:slug' , component: AddScholarshipComponent, data: {title: 'Edit Scholarship - Atila'}},
  { path: ':slug' , component: ScholarshipDetailComponent, data: {title: 'Atila - Scholarship Detail'}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScholarshipRoutingModule { }
