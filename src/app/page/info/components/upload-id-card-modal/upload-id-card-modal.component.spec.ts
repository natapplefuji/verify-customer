import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadIdCardModalComponent } from './upload-id-card-modal.component';

describe('UploadIdCardModalComponent', () => {
  let component: UploadIdCardModalComponent;
  let fixture: ComponentFixture<UploadIdCardModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadIdCardModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadIdCardModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
