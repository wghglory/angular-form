import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
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
export class FormComponent {
  product: Product = new Product();
  editing = false;

  constructor(
    private repository: ProductRepository,
    private state: SharedState,
    private messageService: MessageService,
  ) {
    this.state.changes.subscribe(upd => this.handleStateChange(upd));

    this.messageService.reportMessage(new Message('Creating New Product'));
  }

  // table component calls shared state update to trigger subject.next, and form subscribe the subject.
  handleStateChange(newState: StateUpdate) {
    this.editing = newState.mode == MODES.EDIT;

    if (this.editing && newState.id) {
      Object.assign(this.product, this.repository.getProduct(newState.id) ?? new Product());

      this.messageService.reportMessage(new Message(`Editing ${this.product.name}`));
    } else {
      this.product = new Product();
      this.messageService.reportMessage(new Message('Creating New Product'));
    }
  }

  submitForm(form: NgForm) {
    if (form.valid) {
      this.repository.saveProduct(this.product);
      this.product = new Product();
      form.resetForm();
    }
  }
}
