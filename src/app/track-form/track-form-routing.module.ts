import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrackFormPage } from './track-form.page';

const routes: Routes = [
  {
    path: '',
    component: TrackFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrackFormPageRoutingModule {}
