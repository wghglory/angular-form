import {Injectable} from '@angular/core';
import {Observable, ReplaySubject, Subject} from 'rxjs';

import {Message} from './message.model';

@Injectable()
export class MessageService {
  messages: Observable<Message> = new ReplaySubject<Message>(1);

  reportMessage(msg: Message) {
    (this.messages as Subject<Message>).next(msg);
  }
}
