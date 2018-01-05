import { Component } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { SteptabsComponent } from './steptabs/steptabs.component';
import { StatchartComponent } from './statchart/statchart.component';

const appRoutes: Routes = [
    {
        path: 'settings',
        component: SteptabsComponent
    },
    {
        path: '',
        redirectTo: '/settings',
        pathMatch: 'full'
    },
    {
        path: 'statchart',
        component: StatchartComponent
    }
];


@NgModule({
  imports: [
      RouterModule.forRoot(
          appRoutes
      )
  ],
  exports: [
      RouterModule
  ]
})

export class routing {}
