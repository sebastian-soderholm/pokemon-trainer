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
    path: 'start',
    component: StartComponent
  },
  {
    path: 'catalogue',
    component: CatalogueComponent,
    canActivate: [AuthGuard]
  },
  {
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
