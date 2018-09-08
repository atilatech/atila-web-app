import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScholarshipRoutingModule } from './scholarship-routing.module';

import {MaterializeModule} from 'angular2-materialize';
import "materialize-css";
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
  MatSnackBarModule,
  MatTabsModule,
  MatSlideToggleModule,
} from '@angular/material';

import {HttpClientModule} from '@angular/common/http';

import {SharedModule} from '../_shared/shared.module';
import {ScholarshipDetailComponent} from './scholarship-detail/scholarship-detail.component';
import {ScholarshipCardComponent} from './scholarship-card/scholarship-card.component';
import {ScholarshipsListComponent} from './scholarships-list/scholarships-list.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NgbModule,
    ScholarshipRoutingModule,
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
    MatTabsModule,
    MatSlideToggleModule
  ],
  declarations: [
    ScholarshipDetailComponent,
    ScholarshipCardComponent,
    ScholarshipsListComponent,
  ],
  entryComponents: [
  ]
})
export class ScholarshipModule { }
