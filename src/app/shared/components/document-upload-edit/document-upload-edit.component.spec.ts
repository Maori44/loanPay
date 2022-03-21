import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentUploadEditComponent } from './document-upload-edit.component';

describe('DocumentUploadEditComponent', () => {
  let component: DocumentUploadEditComponent;
  let fixture: ComponentFixture<DocumentUploadEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentUploadEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentUploadEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
