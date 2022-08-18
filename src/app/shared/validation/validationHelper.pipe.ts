import {Pipe, PipeTransform} from '@angular/core';
import {FormControl, ValidationErrors} from '@angular/forms';

@Pipe({name: 'validationFormat'})
export class ValidationHelper implements PipeTransform {
  transform(source: any, name: string): string[] {
    if (source instanceof FormControl) {
      return this.formatMessages((source as FormControl).errors, name);
    }
    return this.formatMessages(source as ValidationErrors, name);
  }

  formatMessages(errors: ValidationErrors | null, name: string): string[] {
    const messages: string[] = [];

    for (const errorName in errors) {
      switch (errorName) {
        case 'required':
          messages.push(`You must enter a ${name}`);
          break;
        case 'minlength':
          messages.push(`A ${name} must be at least ${errors['minlength'].requiredLength} characters`);
          break;
        case 'pattern':
          messages.push(`The ${name} contains illegal characters`);
          break;
        // limitValidator
        case 'limit':
          messages.push(`The ${name} must be less than ${errors['limit'].limit}`);
          break;
      }
    }
    return messages;
  }
}
