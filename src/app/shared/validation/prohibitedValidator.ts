import {AbstractControl, AsyncValidatorFn, ValidationErrors} from '@angular/forms';
import {Observable, Subject} from 'rxjs';

/**
 * async validator that prohibit terms
 * 1. asynchronous validation is performed only when no synchronous validator has returned an error, which can create a confusing sequence of validation messages unless the interaction between validators has been thought through.

2. asynchronous validation is performed after every change to the form control (as long as there are no synchronous validation errors). This can result in a large number of validation operations, which may be slow or expensive to perform. If this is a concern, then you can change the update frequency using the `updateOn` option
 */
export class ProhibitedValidator {
  static prohibitedTerms: string[] = ['ski', 'swim'];

  static prohibited(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      const subject = new Subject<ValidationErrors | null>();
      setTimeout(() => {
        let match = false;
        this.prohibitedTerms.forEach(word => {
          if ((control.value as string).toLowerCase().indexOf(word) > -1) {
            subject.next({prohibited: {prohibited: word}});
            match = true;
          }
        });

        if (!match) {
          subject.next(null);
        }
        subject.complete();
      }, 1000);
      return subject;
    };
  }
}
