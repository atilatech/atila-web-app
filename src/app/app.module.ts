import {BrowserModule, DomSanitizer} from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule, MatIconRegistry,
  MatInputModule,
  MatMenuModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSelectModule, MatSlideToggleModule,
  MatSnackBarModule
} from '@angular/material';
import {PreviewComponent} from './preview/preview.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TypeaheadComponent} from './_shared/typeahead/typeahead.component';
import {ShareItemComponent} from './_shared/share-item/share-item.component';
import {TruncatePipe} from './_pipes/truncate.pipe';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {environment} from '../environments/environment';
import {ServiceWorkerModule} from '@angular/service-worker';
import {NavbarComponent} from './navbar/navbar.component';
import {FooterComponent} from './footer/footer.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    PreviewComponent,
    NavbarComponent,
    FooterComponent,
    TypeaheadComponent,
    ShareItemComponent,
    TruncatePipe
  ],
  imports: [
    NgbModule.forRoot(),
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
    BrowserModule,
    AppRoutingModule,
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
    MatSlideToggleModule,
    MatAutocompleteModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('../assets/mdi.svg')); // Or whatever path you placed mdi.svg at
  }
}
