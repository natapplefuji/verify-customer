import { faAddressCard, faUpload } from '@fortawesome/free-solid-svg-icons';
import { BackendService } from './../../../../service/backend.service';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { SubmitRequest, VerifyRequest } from 'src/app/models/info.model';
import { DipchipService } from 'src/app/service/dipchip.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UploadIdCardModalComponent } from '../upload-id-card-modal/upload-id-card-modal.component';

@Component({
  selector: 'app-dipchip',
  templateUrl: './dipchip.component.html',
  styleUrls: ['./dipchip.component.scss']
})
export class DipchipComponent implements OnInit, OnDestroy {
  verificationResult = null;
  loadingMessage = '';
  public faAddressCard = faAddressCard;
  public faUpload = faUpload;
  form = this.fb.group({
    idNumber: ['', [Validators.required, Validators.maxLength(13), Validators.minLength(13)]],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    birthDate: ['', [Validators.required]],
    address: [''],
    imageProfile: [''],
  });
  @ViewChild('videoElement', { static: false }) videoElement!: ElementRef;
  @ViewChild('canvas', { static: false }) canvas!: ElementRef;
  videoStream: MediaStream | null = null;
  capturedImage: string | null = null;
  state: 'FILL_FORM' | 'CAPTURE' | 'VIEW_RESULT' = 'FILL_FORM';
  constructor(private router: Router,
    private spinner: NgxSpinnerService,
    private dipchipService: DipchipService,
    private backendService: BackendService,
    private messageService: MessageService,
    private modalService: NgbModal,
    private fb: FormBuilder) { }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.stopCamera();
  }
  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'กรอกฟอร์มไม่ถูกต้อง' });
      return;
    }
    const request: SubmitRequest = {
      id_number: this.form.value.idNumber,
      first_name: this.form.value.firstName,
      last_name: this.form.value.lastName,
      birth_date: this.form.value.birthDate,
      image_url: this.form.value.imageProfile,
      image_from_camera: this.capturedImage as string
    }
    this.spinner.show();
    this.loadingMessage = "กำลังเรียกไปที่ API";
    this.backendService.submitCard(request).subscribe(response => {
      console.log(response);
      this.loadingMessage = response.message;
      setTimeout(() => {
        this.spinner.hide();
        this.verificationResult = response.data;
        this.setForm(this.verificationResult);
        this.state = 'VIEW_RESULT';
      }, 3000);
    }, (error) => {
      this.spinner.hide();
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'ไม่สามารถยืนยันบัตรประชาชนได้' });
    });

  }
  onReadIDCard() {
    this.spinner.show();
    this.loadingMessage = "กำลังอ่านบัตรประชาชน";
    this.backendService.readCard().subscribe(response => {
      this.loadingMessage = response.message;
      setTimeout(() => {
        this.spinner.hide();
        this.verificationResult = response.data;
        this.setForm(this.verificationResult);
      }, 2000);
    },(error) => {
      this.spinner.hide();
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'ไม่สามารถยืนยันบัตรประชาชนได้' });
    });
  }
  openUploadIdCardModal() {
    const modalERApprove = this.modalService.open(UploadIdCardModalComponent, { backdrop: 'static' });
    modalERApprove.result.then((result) => {
      if (result?.confirm) {
        if (result.data) {
          this.spinner.show();
          this.loadingMessage = "กำลังประมวผลข้อความ";
          this.backendService.readText(result.data).subscribe(response => {
            this.loadingMessage = response.message;
            setTimeout(() => {
              this.spinner.hide();
              this.verificationResult = response.data;
              this.setForm(this.verificationResult);
            }, 2000);
          },(error) => {
            this.spinner.hide();
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'ไม่สามารถยืนยันบัตรประชาชนได้' });
          });
        }

      }
    });
  }
  verifyIdCard(request: VerifyRequest) {
    this.spinner.show();
    this.loadingMessage = "กำลังเรียกไปที่ API"
    this.dipchipService.verifyIDCard(request).subscribe(response => {
      setTimeout(() => {
        this.loadingMessage = response.message;
        setTimeout(() => {
          this.spinner.hide();
          this.verificationResult = response.data;
          this.setForm(this.verificationResult);
          this.state = 'CAPTURE';
          this.startCamera();
        }, 3000);
      }, 3000);
    }, (error) => {
      this.spinner.hide();
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'ไม่สามารถยืนยันบัตรประชาชนได้' });
    });
  }

  nextStep() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'กรอกฟอร์มไม่ถูกต้อง' });
      return;
    }
    const request: VerifyRequest = {
      id_number: this.form.value.idNumber,
      first_name: this.form.value.firstName,
      last_name: this.form.value.lastName,
      birth_date: this.form.value.birthDate
    }
    this.verifyIdCard(request);
  }

  setForm(verificationResult: any) {
    this.form.patchValue({
      idNumber: verificationResult.id_number,
      firstName: verificationResult.first_name,
      lastName: verificationResult.last_name,
      birthDate: new Date(verificationResult.birth_date),
      imageProfile: verificationResult.image_url,
      address: verificationResult.address
    });
  }

  startCamera() {
    this.videoStream = null;
    this.capturedImage = null;
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        this.videoStream = stream;
        this.videoElement.nativeElement.srcObject = stream;
      })
      .catch((err) => console.error('Camera access error:', err));
  }
  captureImage() {
    const video = this.videoElement.nativeElement;
    const canvas = this.canvas.nativeElement;
    const context = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    this.capturedImage = canvas.toDataURL('image/png');
    this.stopCamera();

  }
  stopCamera() {
    if (this.videoStream) {
      this.videoStream.getTracks().forEach(track => track.stop());
      this.videoElement.nativeElement.srcObject = null;
      this.videoStream = null;
    }
  }

}
