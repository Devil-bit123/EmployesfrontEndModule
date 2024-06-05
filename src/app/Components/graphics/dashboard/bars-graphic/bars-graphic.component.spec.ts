import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarsGraphicComponent } from './bars-graphic.component';

describe('BarsGraphicComponent', () => {
  let component: BarsGraphicComponent;
  let fixture: ComponentFixture<BarsGraphicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BarsGraphicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BarsGraphicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
