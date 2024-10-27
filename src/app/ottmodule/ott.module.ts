import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OttcomponentComponent } from './ottcomponent/ottcomponent.component';
import { OttlistcomponentComponent } from './ottlistcomponent/ottlistcomponent.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card'; 


@NgModule({
  declarations: [
    OttcomponentComponent,
    OttlistcomponentComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    FormsModule
  ]
})
export class OttModule { }
