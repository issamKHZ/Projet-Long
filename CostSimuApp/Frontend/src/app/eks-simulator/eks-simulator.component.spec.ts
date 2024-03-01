import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EksSimulatorComponent } from './eks-simulator.component';

describe('EksSimulatorComponent', () => {
  let component: EksSimulatorComponent;
  let fixture: ComponentFixture<EksSimulatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EksSimulatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EksSimulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
