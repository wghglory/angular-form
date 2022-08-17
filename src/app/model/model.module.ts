import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductRepository} from './product.repository';
import {ProductDataSource} from './product.datasource';

@NgModule({
  declarations: [],
  providers: [ProductRepository, ProductDataSource],
  imports: [CommonModule],
})
export class ModelModule {}
