import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AksResultComponent } from './aks-result.component';

describe('AksResultComponent', () => {
  let component: AksResultComponent;
  let fixture: ComponentFixture<AksResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AksResultComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AksResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
