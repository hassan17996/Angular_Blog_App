import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ComposeComponent } from './compose/compose.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ComposeComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, SharedModule],
})
export class EditorModule {}
