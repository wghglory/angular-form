import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {ValidationHelper} from './validators/validationHelper';

@NgModule({
  declarations: [ValidationHelper],
  imports: [CommonModule],
  exports: [ValidationHelper],
})
export class SharedModule {}
