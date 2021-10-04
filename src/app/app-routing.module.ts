import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogueComponent } from './components/catalogue/catalogue.component';
import { StartComponent } from './components/start/start.component';
import { TrainerComponent } from './components/trainer/trainer.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/start'
  },
  {
    // Route to the start page, not accessible after log in
    path: 'start',
    component: StartComponent
  },
  {
    // Route to the catalogue page, accessible after log in
    path: 'catalogue',
    component: CatalogueComponent,
    canActivate: [AuthGuard]
  },
  {
    // Route to the trainer page, accessible after log in
    path: 'trainer',
    component: TrainerComponent,
    canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
