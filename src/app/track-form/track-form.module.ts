import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrackFormPageRoutingModule } from './track-form-routing.module';

import { TrackFormPage } from './track-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrackFormPageRoutingModule
  ],
  declarations: [TrackFormPage]
})
export class TrackFormPageModule {}
