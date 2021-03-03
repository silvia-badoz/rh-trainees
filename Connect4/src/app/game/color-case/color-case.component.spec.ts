import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorCaseComponent } from './color-case.component';

describe('ColorCaseComponent', () => {
  let component: ColorCaseComponent;
  let fixture: ComponentFixture<ColorCaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorCaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
