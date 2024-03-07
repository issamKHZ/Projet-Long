import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompAffichageComponent } from './comp-affichage.component';

describe('CompAffichageComponent', () => {
  let component: CompAffichageComponent;
  let fixture: ComponentFixture<CompAffichageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompAffichageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompAffichageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
