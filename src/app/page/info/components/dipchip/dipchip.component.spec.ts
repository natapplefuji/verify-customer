import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DipchipComponent } from './dipchip.component';

describe('DipchipComponent', () => {
  let component: DipchipComponent;
  let fixture: ComponentFixture<DipchipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DipchipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DipchipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
