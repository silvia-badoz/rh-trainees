import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingChangeColorSchemeComponent } from './setting-change-color-scheme.component';

describe('SettingChangeColorSchemeComponent', () => {
  let component: SettingChangeColorSchemeComponent;
  let fixture: ComponentFixture<SettingChangeColorSchemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingChangeColorSchemeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingChangeColorSchemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
