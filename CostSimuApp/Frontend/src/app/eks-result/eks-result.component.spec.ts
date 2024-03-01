import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EksResultComponent } from './eks-result.component';

describe('EksResultComponent', () => {
  let component: EksResultComponent;
  let fixture: ComponentFixture<EksResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EksResultComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EksResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
