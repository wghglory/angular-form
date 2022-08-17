import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {MessageComponent} from './message.component';
import {MessageService} from './message.service';

@NgModule({
  declarations: [MessageComponent],
  exports: [MessageComponent],
  providers: [MessageService],
  imports: [CommonModule],
})
export class MessageModule {}
