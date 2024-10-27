import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home/home.component';
import { FoodcomponentComponent } from './foodmodule/foodcomponent/foodcomponent.component';
import { FoodlistcomponentComponent } from './foodmodule/foodlistcomponent/foodlistcomponent.component';
import { AtmCardComponent } from './atmmodule/atmcomponent/atmcomponent.component';
import { AtmlistcomponentComponent } from './atmmodule/atmlistcomponent/atmlistcomponent.component';
import { OttcomponentComponent } from './ottmodule/ottcomponent/ottcomponent.component';
import { OttlistcomponentComponent } from './ottmodule/ottlistcomponent/ottlistcomponent.component';
const routes: Routes = [
  {path:"",component:DashboardComponent},
  {path:"home",component:HomeComponent,canActivate: [AuthGuard]},
  { path: 'atm/add', component: AtmCardComponent,canActivate: [AuthGuard] }, 
  { path: 'atm/list/:familyid', component: AtmlistcomponentComponent,canActivate:[AuthGuard] },
  { path: 'atm/edit/:number', component: AtmCardComponent ,canActivate: [AuthGuard]},
  { path: 'ott/add', component: OttcomponentComponent,canActivate: [AuthGuard] }, 
  { path: 'ott/list/:familyid', component: OttlistcomponentComponent,canActivate:[AuthGuard] },
  { path: 'ott/edit/:number', component: OttcomponentComponent ,canActivate: [AuthGuard]},
  { path: 'food/add', component: FoodcomponentComponent,canActivate: [AuthGuard] }, 
  { path: 'food/list/:familyid', component: FoodlistcomponentComponent,canActivate:[AuthGuard] },
  { path: 'food/edit/:number', component: FoodcomponentComponent ,canActivate: [AuthGuard]},


  //always give ** pat at the end
    {path:"**",component:DashboardComponent,canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
