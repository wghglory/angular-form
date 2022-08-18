import {Component, OnInit} from '@angular/core';
import {FormControl, NgForm} from '@angular/forms';
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

  nameField: FormControl = new FormControl('Initial Value', {
    // updateOn: 'blur', // change(the default), blur, submit
  });

  // table component calls shared state update to trigger subject.next, and form subscribe the subject.
  handleStateChange(newState: StateUpdate) {
    this.editing = newState.mode == MODES.EDIT;

    if (this.editing && newState.id) {
      Object.assign(this.product, this.repository.getProduct(newState.id) ?? new Product());

      this.messageService.reportMessage(new Message(`Editing ${this.product.name}`));

      this.nameField.setValue(this.product.name);
    } else {
      this.product = new Product();
      this.messageService.reportMessage(new Message('Creating New Product'));

      this.nameField.setValue('');
    }
  }

  ngOnInit() {
    this.nameField.valueChanges.subscribe(newValue => {
      this.messageService.reportMessage(new Message(newValue || '(Empty)'));

      if (typeof newValue == 'string' && newValue.length % 2 == 0) {
        this.nameField.markAsPristine();
      }
    });
  }

  submitForm(form: NgForm) {
    if (form.valid) {
      this.repository.saveProduct(this.product);
      this.product = new Product();
      form.resetForm();
    }
  }
}
