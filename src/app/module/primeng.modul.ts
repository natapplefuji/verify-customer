import { NgModule } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { AvatarModule } from 'primeng/avatar';
import { CardModule } from 'primeng/card';
import { CalendarModule } from 'primeng/calendar';
import { ToastModule } from 'primeng/toast';
import { BadgeModule } from 'primeng/badge';
@NgModule({
  exports: [
    InputTextModule,
    MessageModule,
    AvatarModule,
    CardModule,
    CalendarModule,
    ToastModule,
    BadgeModule
  ]
})
export class PrimeNgModule { }
