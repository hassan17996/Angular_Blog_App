import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FeedComponent } from './feed/feed.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [FeedComponent],
  imports: [CommonModule, RouterModule, SharedModule],
  exports: [FeedComponent],
})
export class ArticlesModule {}
