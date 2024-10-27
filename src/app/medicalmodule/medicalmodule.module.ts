import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicalcomponentComponent } from './medicalcomponent/medicalcomponent.component';
import { MedicallistcomponentComponent } from './medicallistcomponent/medicallistcomponent.component';
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
    MedicalcomponentComponent,
    MedicallistcomponentComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatIconModule,
    MatNativeDateModule,
    MatButtonModule,
    MatCardModule
    
  ]
})
export class MedicalmoduleModule { }
