import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MessageModule} from '@message/message.module';
import {ModelModule} from '@model/model.module';

import {FormComponent} from './form/form.component';
import {SharedState} from './shared-state.service';
import {TableComponent} from './table/table.component';

@NgModule({
  declarations: [FormComponent, TableComponent],
  exports: [FormComponent, TableComponent],
  providers: [SharedState],
  imports: [CommonModule, FormsModule, ModelModule, MessageModule],
})
export class ComponentsModule {}
