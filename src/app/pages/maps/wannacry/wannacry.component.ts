import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { chartFactory } from './common';

@Component({
  selector: 'sunicv-wannacry',
  templateUrl: 'wannacry.component.html',
  styleUrls: ['./wannacry.component.scss'],
})

export class WannacryComponent implements OnInit {
  constructor() { }


  chart = chartFactory();
  projection =d3.geoEquirectangular()
  .center([-40,20]);

  //console.log(chart);

  ngOnInit() {
    console.log(this.chart);
    console.log(this.projection);
  }
}
