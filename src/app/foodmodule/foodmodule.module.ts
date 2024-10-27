import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodcomponentComponent } from './foodcomponent/foodcomponent.component';
import { FoodlistcomponentComponent } from './foodlistcomponent/foodlistcomponent.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [
    FoodcomponentComponent,
    FoodlistcomponentComponent
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
    MatCardModule

  ]
})
export class FoodmoduleModule { }
