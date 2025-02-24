import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoComponent } from './components/info/info.component';
import { InfoChoiceComponent } from './components/info-choice/info-choice.component';
import { OcrComponent } from './components/ocr/ocr.component';
import { DipchipComponent } from './components/dipchip/dipchip.component';

const routes: Routes = [{ 
  path: '', component: InfoComponent,
  children: [
    {
      path: '',
      redirectTo: "main",
      pathMatch: "full"
    },
    {
      path: 'main',
      component: InfoChoiceComponent
    },
    {
      path: 'ocr',
      component: OcrComponent
    },
    {
      path: 'dipchip',
      component: DipchipComponent
    }
  ]
 }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfoRoutingModule { }
