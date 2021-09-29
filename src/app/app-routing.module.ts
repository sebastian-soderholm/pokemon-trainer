import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogueComponent } from './components/catalogue/catalogue.component';
import { StartComponent } from './components/start/start.component';
import { TrainerComponent } from './components/trainer/trainer.component';

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
    component: CatalogueComponent
  },
  {
    path: 'trainer',
    component: TrainerComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
