import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EksFormulaireComponent } from './eks-formulaire.component';

describe('EksFormulaireComponent', () => {
  let component: EksFormulaireComponent;
  let fixture: ComponentFixture<EksFormulaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EksFormulaireComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EksFormulaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
