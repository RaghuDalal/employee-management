import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpListingComponent } from './emp-listing.component';

describe('EmpListingComponent', () => {
  let component: EmpListingComponent;
  let fixture: ComponentFixture<EmpListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpListingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
