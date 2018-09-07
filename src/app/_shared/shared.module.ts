import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GooglePlaceDirective} from '../_directives/google-place.directive';
import {TruncatePipe} from '../_pipes/truncate.pipe';
import {NgbModule, NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
import {MaterializeModule} from 'angular2-materialize';
import {HttpClientModule} from '@angular/common/http';
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
import {HttpModule} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {RouterModule} from '@angular/router';
import {TypeaheadComponent} from './typeahead/typeahead.component';
import {ShareItemComponent} from './share-item/share-item.component';
import {CardGenericComponent} from '../card-generic/card-generic.component';
import {SafeHtmlPipe} from '../_pipes/safe-html.pipe';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    AngularFireDatabaseModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpModule,
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
    MaterializeModule,
    NgbTypeaheadModule,
  ],
  declarations: [
    TruncatePipe,
    GooglePlaceDirective,
    TypeaheadComponent,
    ShareItemComponent,
    CardGenericComponent,
    SafeHtmlPipe],
  exports: [
    TruncatePipe,
    GooglePlaceDirective,
    RouterModule,
    NgbTypeaheadModule,
    AngularFirestoreModule,
    TypeaheadComponent,
    ShareItemComponent,
    MatIconModule,
  ],
})
export class SharedModule {
}
