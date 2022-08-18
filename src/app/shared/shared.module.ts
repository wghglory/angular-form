import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {NG_VALIDATORS} from '@angular/forms';

import {HiLowValidatorDirective} from './validation/hilowValidator.directive';
import {ValidationErrorsDirective} from './validation/validationErrors.directive';
import {ValidationHelper} from './validation/validationHelper.pipe';

@NgModule({
  declarations: [ValidationHelper, ValidationErrorsDirective, HiLowValidatorDirective],
  imports: [CommonModule],
  exports: [ValidationHelper, ValidationErrorsDirective, HiLowValidatorDirective],
  providers: [{provide: NG_VALIDATORS, useExisting: HiLowValidatorDirective, multi: true}],
})
export class SharedModule {}
