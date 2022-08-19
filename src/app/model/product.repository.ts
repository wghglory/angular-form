import {Injectable} from '@angular/core';

import {Product} from './product.model';
import {ProductRestDataSource} from './productRest.datasource';
import {ProductStaticDataSource} from './productStatic.datasource';

@Injectable()
export class ProductRepository {
  private products: Product[];
  private locator = (p: Product, id?: number) => p.id == id;

  constructor(private dataSource: ProductRestDataSource) {
    this.products = new Array<Product>();
    // this.dataSource.getData().forEach(p => this.products.push(p));
    this.dataSource.getData().subscribe(data => (this.products = data));
  }

  getProducts(): Product[] {
    return this.products;
  }

  getProduct(id: number): Product | undefined {
    return this.products.find(p => this.locator(p, id));
  }

  saveProduct(product: Product) {
    if (product.id == 0 || product.id == null) {
      // product.id = this.generateID();
      // this.products.push(product);

      this.dataSource.saveProduct(product).subscribe(p => this.products.push(p));
    } else {
      // const index = this.products.findIndex(p => this.locator(p, product.id));
      // this.products.splice(index, 1, product);

      this.dataSource.updateProduct(product).subscribe(p => {
        const index = this.products.findIndex(item => this.locator(item, p.id));
        this.products.splice(index, 1, p);
      });
    }
  }

  deleteProduct(id: number) {
    this.dataSource.deleteProduct(id).subscribe(() => {
      const index = this.products.findIndex(p => this.locator(p, id));
      if (index > -1) {
        this.products.splice(index, 1);
      }
    });
  }

  private generateID(): number {
    let candidate = 100;
    while (this.getProduct(candidate) != null) {
      candidate++;
    }
    return candidate;
  }
}
