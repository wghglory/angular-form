import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {MODES, SharedState, StateUpdate} from '@components/shared-state.service';
import {Message} from '@message/message.model';
import {MessageService} from '@message/message.service';
import {Product} from '@model/product.model';
import {ProductRepository} from '@model/product.repository';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  constructor(
    private repository: ProductRepository,
    private state: SharedState,
    private messageService: MessageService,
  ) {
    this.state.changes.subscribe(upd => this.handleStateChange(upd));

    this.messageService.reportMessage(new Message('Creating New Product'));
  }

  product: Product = new Product();
  editing = false;

  // nameField: FormControl = new FormControl('Initial Value', {
  //   validators: [Validators.required, Validators.minLength(3), Validators.pattern('^[A-Za-z ]+$')],
  //   // updateOn: 'blur', // change(the default), blur, submit
  // });
  // categoryField: FormControl = new FormControl();

  // productForm: FormGroup = new FormGroup({
  //   name: this.nameField,
  //   category: this.categoryField,
  // });

  keywordGroup = new FormArray([this.createKeywordFormControl()]);

  productForm: FormGroup = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3), Validators.pattern('^[A-Za-z ]+$')],
      updateOn: 'change',
    }),
    category: new FormControl('', {validators: Validators.required}),
    price: new FormControl('', {validators: [Validators.required, Validators.pattern('^[0-9.]+$')]}),
    details: new FormGroup({
      supplier: new FormControl('', {validators: Validators.required}),
      // keywords: new FormControl('', {validators: Validators.required}),
      keywords: this.keywordGroup,
    }),
  });

  createKeywordFormControl(): FormControl {
    return new FormControl('', {validators: Validators.pattern('^[A-Za-z ]+$')});
  }

  addKeywordControl() {
    this.keywordGroup.push(this.createKeywordFormControl());
  }

  removeKeywordControl(index: number) {
    this.keywordGroup.removeAt(index);
  }

  // table component calls shared state update to trigger subject.next, and form subscribe the subject.
  handleStateChange(newState: StateUpdate) {
    this.editing = newState.mode == MODES.EDIT;
    this.keywordGroup.clear();

    if (this.editing && newState.id) {
      Object.assign(this.product, this.repository.getProduct(newState.id) ?? new Product());

      this.messageService.reportMessage(new Message(`Editing ${this.product.name}`));

      // use this.productForm.reset(this.product) to replace below 2
      // this.nameField.setValue(this.product.name);
      // this.categoryField.setValue(this.product.category);

      // create keyword input, whose count is based on the product keywords
      this.product.details?.keywords?.forEach(val => {
        this.keywordGroup.push(this.createKeywordFormControl());
      });
    } else {
      this.product = new Product();
      this.messageService.reportMessage(new Message('Creating New Product'));

      // this.nameField.setValue('');
      // this.categoryField.setValue('');
    }

    // at least create one keyword input
    if (this.keywordGroup.length == 0) {
      this.keywordGroup.push(this.createKeywordFormControl());
    }

    // populate or clear the form controls when user clicks the Create New Product or Edit button:
    this.productForm.reset(this.product);
  }

  ngOnInit() {
    //   // this.nameField.valueChanges.subscribe(newValue => {
    //   //   this.messageService.reportMessage(new Message(newValue || '(Empty)'));
    //   //   // if (typeof newValue == 'string' && newValue.length % 2 == 0) {
    //   //   //   this.nameField.markAsPristine();
    //   //   // }
    //   // });
    //   // // one form control controls another control
    //   // this.nameField.statusChanges.subscribe(newStatus => {
    //   //   if (newStatus == 'INVALID') {
    //   //     this.categoryField.disable();
    //   //   } else {
    //   //     this.categoryField.enable();
    //   //   }
    //   // });
    //   this.productForm.statusChanges.subscribe(newStatus => {
    //     if (newStatus == 'INVALID') {
    //       const invalidControls: string[] = [];
    //       for (const controlName in this.productForm.controls) {
    //         if (this.productForm.controls[controlName].invalid) {
    //           invalidControls.push(controlName);
    //         }
    //       }
    //       this.messageService.reportMessage(new Message(`INVALID: ${invalidControls.join(', ')}`));
    //     } else {
    //       this.messageService.reportMessage(new Message(newStatus));
    //     }
    //   });
    // }
  }

  // submitForm(form: NgForm) {
  //   if (form.valid) {
  //     this.repository.saveProduct(this.product);
  //     this.product = new Product();
  //     form.resetForm();
  //   }

  submitForm() {
    if (this.productForm.valid) {
      this.product = this.productForm.value;
      const keywords = this.product.details?.keywords?.filter(keyword => keyword === '');
      if (this.product.details) {
        this.product.details.keywords = keywords;
      }

      this.repository.saveProduct(this.product);
      this.product = new Product();

      this.keywordGroup.clear();
      this.keywordGroup.push(this.createKeywordFormControl());

      this.productForm.reset();
    }
  }

  resetForm() {
    this.keywordGroup.clear();
    this.keywordGroup.push(this.createKeywordFormControl());

    this.editing = true;
    this.product = new Product();
    this.productForm.reset();
  }
}
