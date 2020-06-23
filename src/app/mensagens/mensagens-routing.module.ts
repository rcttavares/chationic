import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MensagensPage } from './mensagens.page';

const routes: Routes = [
  {
    path: '',
    component: MensagensPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MensagensPageRoutingModule {}
