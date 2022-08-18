import {FormArray} from '@angular/forms';

export type ValueFilter = (value: any) => boolean;

/**
 * filter out unwanted values ('' or null) for FormArray controls
 * There are two issues with using methods like this.
 * 1. that internal methods `_updateValue` are subject to change or removal without notice, which means that figure releases of Angular may remove the _ updateValue method and break the code
 * 2. Angular packages are compiled using a TypeScript setting that excludes internal methods from the type declaration files that are used during project development. So TypeScript compiler doesn’t know that the FormArray class defines an _updateValue method and won’t allow the use of the override or the super keywords. For this reason, I have had to copy the original code from the FormArray class and integrate support for filtering, rather than just calling the FormArray implementation of the method and filtering the result.
 */
export class FilteredFormArray extends FormArray {
  filter: ValueFilter | undefined = val => val === '' || val == null;

  // _updateValue is internal API: originally defined as an abstract method in the AbstractControl class and then overridden in the FormArray class.
  _updateValue() {
    (this as {value: any}).value = this.controls
      .filter(control => (control.enabled || this.disabled) && !this.filter?.(control.value))
      .map(control => control.value);
  }
}
