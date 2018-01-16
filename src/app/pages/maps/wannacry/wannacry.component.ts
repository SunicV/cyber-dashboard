import {
  Component,
  OnInit
} from '@angular/core';
import * as d3 from 'd3';
import * as topojson from 'topojson';
import {
  chartFactory
} from './common';
import {
  MapService
} from '../../../@core/data/map.service';
import { AfterViewChecked } from '@angular/core/src/metadata/lifecycle_hooks';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap/tooltip/tooltip-config';

@Component({
  selector: 'sunicv-wannacry',
  templateUrl: 'wannacry.component.html',
  styleUrls: ['./wannacry.component.scss'],
  providers: [NgbTooltipConfig]
})

export class WannacryComponent implements OnInit, AfterViewChecked {
  cultural = [];
  world;
  country;
  countries;
  drawed = false;
  chart;

  projection = d3.geoEquirectangular()
    .center([-40, 20]);


  constructor(protected mapService: MapService, config: NgbTooltipConfig) {
    config.placement = "top";
  }
  ngOnInit() {
    this.chart = chartFactory();

    this.mapService.getCountry()
      .then((country: any[]) => {
        this.country = country;

        this.countries = topojson.feature(this.country, this.country.objects['countries']).features;

      });
  }

  ngAfterViewChecked() {
    if (this.country && this.drawed == false) {
      this.draw(this.country);
    }
  }

  addToMap = (collection, key) => {
    this.drawed = true;

    var chart = d3.select('#container')
      .selectAll('path')
      .data(topojson.feature(collection, collection.objects[key]).features)
      .attr('d', d3.geoPath().projection(this.projection))
      .on('mouseover', function (d, i) {
        d3.select(this)
          .attr("fill", "#aaa");

      })
      .on('mouseout', function (d, i) {
        d3.select(this)
          .transition()
          .duration(500)
          .attr('fill', '#000000');
      });

    return chart;

  }

  draw = (world) => {
    //const [sea, land, cultural] = worldData;

    this.addToMap(world, 'countries')
      .classed('boundary', true);

    // this.chart['svg'].node().classList.add('map');
  };


}
