import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BlogRoutingModule} from './blog-routing.module';
import {BlogPostDetailComponent} from './blog-post-detail/blog-post-detail.component';

import {MaterializeModule} from 'angular2-materialize';
import 'materialize-css';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSnackBarModule
} from '@angular/material';

import {HttpClientModule} from '@angular/common/http';

import {environment} from '../../environments/environment';
import {SharedModule} from '../_shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    BlogRoutingModule,
    NgbModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatIconModule,
    MatSnackBarModule,
    MatSelectModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatCardModule,
    HttpClientModule,
    CommonModule,
    MaterializeModule,
  ],

  providers: [],
  declarations: [
    BlogPostDetailComponent]
})
export class BlogModule {
}
