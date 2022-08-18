import {AbstractControl, FormArray, ValidationErrors, ValidatorFn} from '@angular/forms';

/**
 * Validating Across Multiple Fields
 * applied to the FormGroup or FormArray, which are the parents of the controls to be validated
 * v1
 * issue: mismatch between the validation error message and the control class `ng-valid`. We need to enhance, it should be ng-invalid
 */
// export class UniqueValidator {
//   static unique(): ValidatorFn {
//     return (control: AbstractControl): ValidationErrors | null => {
//       if (control instanceof FormArray) {
//         const badElems = control.controls.filter((child, index) => {
//           const otherControls = control.controls.filter((c, i2) => i2 != index);
//           // any of otherControls value not empty and equals to the current control, we find a bad duplicate element
//           return otherControls.some(target => target.value !== '' && target.value === child.value);
//         });

//         if (badElems.length > 0) {
//           return {unique: {}};
//         }
//       }
//       return null;
//     };
//   }
// }

/**
 * Improving Cross-Field Validation

Improving the cross-field validation experience can be done, but it requires careful navigation around the way that Angular expects groups of form controls to behave. Unlike an earlier example in this chapter, no internal methods are used, but the code relies on the SetTimeout method to trigger changes after the current update cycle to perform updates without creating an infinite update loop.

The problem is that Angular expects changes to propagate up through the structure of form controls so that the user edits a field, which triggers validation in the FormControl, and then in its enclosing FormGroup or FormArray, working its way to the top-level FormGroup. To achieve the effect I want, I have to push updates in the opposite direction so that a change in validation status in the FormArray triggers validation updates in the enclosed FormControl objects

The approach I have chosen is to add a validator to child controls that have duplicate values, which will ensure they are marked in red. The code below takes care of adding and removing the validator and triggering validation updates when there are changes, which I do through the `updateValueAndValidity` method. This method updates a control’s value property and performs validation. This method is defined by the AbstractControl class, which means that it can be used on FormControl, FormGroup, and FormArray objects.


updateValueAndValidity(opts) : This method causes a control to update its value and perform validation. The optional argument can be used to restrict propagating the change up the form hierarchy by setting the onlySelf property to true and preventing events by setting the emitEvent property to false.
 */

export class UniqueValidator {
  static uniquechild(control: AbstractControl): ValidationErrors | null {
    return control.parent?.hasError('unique') ? {'unique-child': {}} : null;
  }

  static unique(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const badElems: AbstractControl[] = [];

      const goodElems: AbstractControl[] = [];

      if (control instanceof FormArray) {
        control.controls.forEach((child, index) => {
          if (
            control.controls
              .filter((c, i2) => i2 != index)
              .some(target => target.value !== '' && target.value === child.value)
          ) {
            badElems.push(child);
          } else {
            goodElems.push(child);
          }
        });

        setTimeout(() => {
          badElems.forEach(c => {
            if (!c.hasValidator(this.uniquechild)) {
              c.markAsDirty();
              c.addValidators(this.uniquechild);
              c.updateValueAndValidity({onlySelf: true, emitEvent: false});
            }
          });
          goodElems.forEach(c => {
            if (c.hasValidator(this.uniquechild)) {
              c.removeValidators(this.uniquechild);
            }
            c.updateValueAndValidity({onlySelf: true, emitEvent: false});
          });
        }, 0);
      }
      return badElems.length > 0 ? {unique: {}} : null;
    };
  }
}
