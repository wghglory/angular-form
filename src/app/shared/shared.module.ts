import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {ValidationErrorsDirective} from './validation/validationErrors.directive';
import {ValidationHelper} from './validation/validationHelper.pipe';

@NgModule({
  declarations: [ValidationHelper, ValidationErrorsDirective],
  imports: [CommonModule],
  exports: [ValidationHelper, ValidationErrorsDirective],
})
export class SharedModule {}
