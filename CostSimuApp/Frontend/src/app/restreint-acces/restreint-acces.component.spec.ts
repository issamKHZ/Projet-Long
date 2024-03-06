import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestreintAccesComponent } from './restreint-acces.component';

describe('RestreintAccesComponent', () => {
  let component: RestreintAccesComponent;
  let fixture: ComponentFixture<RestreintAccesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RestreintAccesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RestreintAccesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
