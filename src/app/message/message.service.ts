import {Injectable} from '@angular/core';
import {ReplaySubject, Subject} from 'rxjs';

import {Message} from './message.model';

@Injectable()
export class MessageService {
  messages: Subject<Message> = new ReplaySubject<Message>(1);

  reportMessage(msg: Message) {
    this.messages.next(msg);
  }
}
