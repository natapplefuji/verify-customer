import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfoRoutingModule } from './info-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfoComponent } from './components/info/info.component';
import { HeaderComponent } from 'src/app/share/component/header/header.component';
import { PrimeNgModule } from 'src/app/module/primeng.modul';
import { NgxSpinnerModule } from 'ngx-spinner';
import { InfoChoiceComponent } from './components/info-choice/info-choice.component';
import { InfoFormComponent } from './components/info-form/info-form.component';
import { OcrComponent } from './components/ocr/ocr.component';
import { DipchipComponent } from './components/dipchip/dipchip.component';
import { MessageService } from 'primeng/api';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UploadIdCardModalComponent } from './components/upload-id-card-modal/upload-id-card-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    InfoComponent,
    HeaderComponent,
    InfoChoiceComponent,
    InfoFormComponent,
    OcrComponent,
    DipchipComponent,
    UploadIdCardModalComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    InfoRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    PrimeNgModule,
    NgxSpinnerModule,
    FontAwesomeModule
  ],
  providers: [MessageService]
})
export class InfoModule { }
