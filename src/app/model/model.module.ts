import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {ProductDataSource} from './product.datasource';
import {ProductRepository} from './product.repository';

@NgModule({
  declarations: [],
  providers: [ProductRepository, ProductDataSource],
  imports: [CommonModule],
})
export class ModelModule {}
