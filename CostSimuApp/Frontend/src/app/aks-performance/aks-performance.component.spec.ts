import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AksPerformanceComponent } from './aks-performance.component';

describe('AksPerformanceComponent', () => {
  let component: AksPerformanceComponent;
  let fixture: ComponentFixture<AksPerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AksPerformanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AksPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
