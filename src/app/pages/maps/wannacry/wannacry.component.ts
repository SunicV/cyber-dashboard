import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { chartFactory } from './common';
import { MapService } from '../../../@core/data/map.service';

@Component({
  selector: 'sunicv-wannacry',
  templateUrl: 'wannacry.component.html',
  styleUrls: ['./wannacry.component.scss'],
})

export class WannacryComponent implements OnInit {


  cultural = [];

  constructor(protected mapService: MapService) {
  }


  chart = chartFactory();
  projection = d3.geoEquirectangular()
    .center([-40, 20]);

  //console.log(chart);

  ngOnInit() {


    this.mapService.getCultural()
      .then((cultural: any[]) => {
        this.cultural = cultural;
        console.log('cultural');
        console.log(cultural);

      });
  }
}
