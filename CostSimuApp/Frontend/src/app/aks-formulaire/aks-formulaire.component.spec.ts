import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AksFormulaireComponent } from './aks-formulaire.component';

describe('AksFormulaireComponent', () => {
  let component: AksFormulaireComponent;
  let fixture: ComponentFixture<AksFormulaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AksFormulaireComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AksFormulaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
