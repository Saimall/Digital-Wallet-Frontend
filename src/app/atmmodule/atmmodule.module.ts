import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtmCardComponent } from './atmcomponent/atmcomponent.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { AtmlistcomponentComponent } from './atmlistcomponent/atmlistcomponent.component';
import { MatCardModule } from '@angular/material/card'; // Import MatCardModule


@NgModule({
  declarations: [
    AtmCardComponent,
    AtmlistcomponentComponent
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
export class AtmmoduleModule { }
