import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { BackendService } from 'src/app/service/backend.service';
import * as Tesseract from 'tesseract.js';

@Component({
  selector: 'app-ocr',
  templateUrl: './ocr.component.html',
  styleUrls: ['./ocr.component.scss']
})
export class OcrComponent implements OnInit {
  loadingMessage = '';
  imageUrl: string | ArrayBuffer | null = null;
  form = this.fb.group({
    extractedText: ['', [Validators.required]],
  });
  constructor(
    private spinner: NgxSpinnerService,
        private backendService: BackendService,
        private messageService: MessageService,
        private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }
  onSubmit() {

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
      const { data } = await Tesseract.recognize(imageFile as any, 'eng', {
        logger: (m) => console.log(m)
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
