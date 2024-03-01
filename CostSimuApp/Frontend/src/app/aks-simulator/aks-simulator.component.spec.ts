import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AksSimulatorComponent } from './aks-simulator.component';

describe('AksSimulatorComponent', () => {
  let component: AksSimulatorComponent;
  let fixture: ComponentFixture<AksSimulatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AksSimulatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AksSimulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
