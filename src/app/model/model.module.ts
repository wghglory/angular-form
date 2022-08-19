import {CommonModule} from '@angular/common';
import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';

import {ProductRepository} from './product.repository';
import {ProductRestDataSource, REST_URL} from './productRest.datasource';
import {ProductStaticDataSource} from './productStatic.datasource';

@NgModule({
  declarations: [],
  providers: [
    ProductRepository,
    ProductRestDataSource,
    ProductStaticDataSource,
    {provide: REST_URL, useValue: `http://${location.hostname}:3500/products`},
  ],
  imports: [CommonModule, HttpClientModule, HttpClientJsonpModule],
})
export class ModelModule {}
