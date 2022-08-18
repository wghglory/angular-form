import {Directive, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {FormGroup} from '@angular/forms';

import {ValidationHelper} from './validationHelper.pipe';

/**
 * A structural directive to generate validation errors for a formGroup field control
 */
@Directive({selector: '[validationErrors]'})
export class ValidationErrorsDirective implements OnInit {
  constructor(private container: ViewContainerRef, private template: TemplateRef<unknown>) {}

  @Input('validationErrorsControl') name = ''; // control: 'xxx' from <li *validationErrors="productForm; control: 'name'; let err">
  @Input('validationErrorsLabel') label?: string; // label: 'xxx'
  @Input('validationErrors') formGroup?: FormGroup; // e.g. productForm

  ngOnInit() {
    const formatter = new ValidationHelper();

    if (this.formGroup && this.name) {
      const control = this.formGroup?.get(this.name);

      if (control) {
        control.statusChanges.subscribe(() => {
          if (this.container.length > 0) {
            this.container.clear();
          }
          if (control && control.dirty && control.invalid && control.errors) {
            formatter.formatMessages(control.errors, this.label ?? this.name).forEach(err => {
              this.container.createEmbeddedView(this.template, {$implicit: err});
            });
          }
        });
      }
    }
  }
}
