import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EksPerformanceComponent } from './eks-performance.component';

describe('EksPerformanceComponent', () => {
  let component: EksPerformanceComponent;
  let fixture: ComponentFixture<EksPerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EksPerformanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EksPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
