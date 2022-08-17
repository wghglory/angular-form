import {Component, OnInit} from '@angular/core';
import {MODES, SharedState} from '@components/shared-state.service';
import {Product} from '@model/product.model';
import {ProductRepository} from '@model/product.repository';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  constructor(private repository: ProductRepository, private state: SharedState) {}

  getProduct(key: number): Product | undefined {
    return this.repository.getProduct(key);
  }

  getProducts(): Product[] {
    return this.repository.getProducts();
  }

  deleteProduct(key?: number) {
    if (key !== undefined) {
      this.repository.deleteProduct(key);
    }
  }

  createProduct() {
    this.state.update(MODES.CREATE);
  }

  editProduct(key?: number) {
    this.state.update(MODES.EDIT, key);
  }
}
