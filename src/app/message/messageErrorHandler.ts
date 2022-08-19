import {ErrorHandler, Injectable, NgZone} from '@angular/core';

import {Message} from './message.model';
import {MessageService} from './message.service';

/**
 * replace the built-in Angular error-handling feature, which responds to any unhandled errors in the application and, by default, writes them to the console. It is this feature that writes out the messages
 *
 * The ErrorHandler class is defined in the @angular/core module and responds to errors through a handleError method. The class shown in the listing replaces the default implementation of this method with one that uses the MessageService to report an error.

Redefining the error handler presents a problem. I want to display a message to the user, which requires the Angular change detection process to be triggered. But the message is produced by a service, and Angular doesn’t keep track of the state of services as it does for components and directives. To resolve this issue, I defined an NgZone constructor parameter and used its run method to create the error message:
 */
@Injectable()
export class MessageErrorHandler implements ErrorHandler {
  constructor(private messageService: MessageService, private ngZone: NgZone) {}

  handleError(error: any) {
    const msg = error instanceof Error ? error.message : error.toString();

    // The `run` method executes the function it receives and then triggers the Angular change detection process. For this example, the result is that the new message will be displayed to the user. Without the use of the NgZone object, the error message would be created but would not be displayed to the user until the next time the Angular detection process runs, which is usually in response to user interaction.
    this.ngZone.run(() => this.messageService.reportMessage(new Message(msg, true)), 0);
  }
}
