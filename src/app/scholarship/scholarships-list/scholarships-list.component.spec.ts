import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScholarshipsListComponent } from './scholarships-list.component';

describe('ScholarshipsListComponent', () => {
  let component: ScholarshipsListComponent;
  let fixture: ComponentFixture<ScholarshipsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScholarshipsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScholarshipsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
