import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDocumentCenterComponent } from './manage-document-center.component';

describe('ManageDocumentCenterComponent', () => {
  let component: ManageDocumentCenterComponent;
  let fixture: ComponentFixture<ManageDocumentCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageDocumentCenterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageDocumentCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
