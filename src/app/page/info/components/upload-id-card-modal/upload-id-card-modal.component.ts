import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { BackendService } from 'src/app/service/backend.service';
import * as Tesseract from 'tesseract.js';
@Component({
  selector: 'app-upload-id-card-modal',
  templateUrl: './upload-id-card-modal.component.html',
  styleUrls: ['./upload-id-card-modal.component.scss']
})
export class UploadIdCardModalComponent implements OnInit {
  imageUrl: string | ArrayBuffer | null = null;
  form = this.fb.group({
    extractedText: ['', [Validators.required]],
  });
  constructor(
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }
  confirm() {
    if (this.form.valid) {
      this.activeModal.close({ confirm: true, data: this.form.controls['extractedText'].value });
    } else {
      console.log(this.form);

      this.form.markAllAsTouched();
    }
  }
  cancel(): void {
    this.activeModal.close({ confirm: false });
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      // Show image preview
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
      reader.readAsDataURL(file);

      // Perform OCR
      this.spinner.show();
      this.performOCR(file);
    }
  }

  async performOCR(imageFile: File): Promise<void> {
    try {
      const { data } = await Tesseract.recognize(imageFile as any, 'tha+eng', {
        logger: (m) => console.log(m),
        langPath: 'https://tessdata.projectnaptha.com/4.0.0_best/'
      });
      this.form.patchValue({ extractedText: data.text });
      this.spinner.hide();
    } catch (error) {
      console.error('OCR error:', error);
      this.spinner.hide();
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to extract text.' });
    }
  }

}
