import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScholarshipRoutingModule } from './scholarship-routing.module';
import {environment} from '../../environments/environment';

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

import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {SharedModule} from '../_shared/shared.module';
import {AddScholarshipComponent} from './add-scholarship/add-scholarship.component';
import {ScholarshipDetailComponent} from './scholarship-detail/scholarship-detail.component';
import {AddQuestionModalComponent} from '../add-question-modal/add-question-modal.component';
import {ScholarshipCardComponent} from './scholarship-card/scholarship-card.component';
import {ScholarshipsListComponent} from './scholarships-list/scholarships-list.component';
import {SubscriberDialogComponent} from '../subscriber-dialog/subscriber-dialog.component';
import {EditProfileModalComponent} from '../edit-profile-modal/edit-profile-modal.component';
import { ScholarshipEditSuggestionComponent } from './scholarship-edit-suggestion/scholarship-edit-suggestion.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NgbModule,
    ScholarshipRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
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
    AddScholarshipComponent,
    ScholarshipDetailComponent,
    ScholarshipCardComponent,
    ScholarshipsListComponent,
    ScholarshipEditSuggestionComponent,
  ],
  entryComponents: [
    SubscriberDialogComponent,
    EditProfileModalComponent,
    AddQuestionModalComponent,
  ]
})
export class ScholarshipModule { }
