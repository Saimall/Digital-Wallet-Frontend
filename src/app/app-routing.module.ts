import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home/home.component';

import { AtmCardComponent } from './atmmodule/atmcomponent/atmcomponent.component';
import { AtmlistcomponentComponent } from './atmmodule/atmlistcomponent/atmlistcomponent.component';

const routes: Routes = [
  {path:"",component:DashboardComponent},
  {path:"home",component:HomeComponent,canActivate: [AuthGuard]},
 
  { path: 'atm/add', component: AtmCardComponent,canActivate: [AuthGuard] }, 
  { path: 'atm/list/:familyid', component: AtmlistcomponentComponent,canActivate:[AuthGuard] },
  { path: 'atm/edit/:id', component: AtmCardComponent ,canActivate: [AuthGuard]},


  //always give ** pat at the end
    {path:"**",component:DashboardComponent,canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
