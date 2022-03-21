import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalInviteListingComponent } from './clinical-invite-listing.component';

describe('ClinicalInviteListingComponent', () => {
  let component: ClinicalInviteListingComponent;
  let fixture: ComponentFixture<ClinicalInviteListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClinicalInviteListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicalInviteListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
