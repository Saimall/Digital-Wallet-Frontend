import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; 
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home/home.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon'; // Import MatIconModule

import { AtmmoduleModule } from './atmmodule/atmmodule.module';
import { OttModule } from './ottmodule/ott.module';
import { FoodmoduleModule } from './foodmodule/foodmodule.module';

import { MedicalmoduleModule } from './medicalmodule/medicalmodule.module';

import { RtomoduleModule } from './rtomodule/rtomodule.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    AtmmoduleModule,
    OttModule,
    FoodmoduleModule,
    MedicalmoduleModule,
    RtomoduleModule
  ],
  providers: [
    provideHttpClient(),
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
