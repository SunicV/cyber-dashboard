import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapsComponent } from './maps.component';
import { GmapsComponent } from './gmaps/gmaps.component';
import { LeafletComponent } from './leaflet/leaflet.component';
import { BubbleMapComponent } from './bubble/bubble-map.component';
import {WannacryComponent} from './wannacry/wannacry.component';

const routes: Routes = [{
  path: '',
  component: MapsComponent,
  children: [{
    path: 'gmaps',
    component: GmapsComponent,
  }, {
    path: 'leaflet',
    component: LeafletComponent,
  }, {
    path: 'bubble',
    component: BubbleMapComponent,
  },{
    path: 'wannacry',
    component: WannacryComponent,

  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapsRoutingModule { }

export const routedComponents = [
  MapsComponent,
  GmapsComponent,
  LeafletComponent,
  BubbleMapComponent,
  WannacryComponent
];
