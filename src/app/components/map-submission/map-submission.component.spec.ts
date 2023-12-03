import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapSubmissionComponent } from './map-submission.component';

describe('MapSubmissionComponent', () => {
  let component: MapSubmissionComponent;
  let fixture: ComponentFixture<MapSubmissionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MapSubmissionComponent]
    });
    fixture = TestBed.createComponent(MapSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
