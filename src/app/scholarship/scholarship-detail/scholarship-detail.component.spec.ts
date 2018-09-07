import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScholarshipDetailComponent } from './scholarship-detail.component';

describe('ScholarshipDetailComponent', () => {
  let component: ScholarshipDetailComponent;
  let fixture: ComponentFixture<ScholarshipDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScholarshipDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScholarshipDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
