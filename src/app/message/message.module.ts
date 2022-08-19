import {CommonModule} from '@angular/common';
import {ErrorHandler, NgModule} from '@angular/core';

import {MessageComponent} from './message.component';
import {MessageService} from './message.service';
import {MessageErrorHandler} from './messageErrorhandler';

@NgModule({
  declarations: [MessageComponent],
  exports: [MessageComponent],
  providers: [MessageService, {provide: ErrorHandler, useClass: MessageErrorHandler}],
  imports: [CommonModule],
})
export class MessageModule {}
