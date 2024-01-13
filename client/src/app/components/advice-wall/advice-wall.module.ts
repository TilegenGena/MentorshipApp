import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdviceWallComponent } from './advice-wall/advice-wall.component';

@NgModule({
  declarations: [AdviceWallComponent],
  exports: [AdviceWallComponent],
  imports: [CommonModule],
})
export class AdviceWallModule {}
