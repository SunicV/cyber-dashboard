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

@Component({
  selector: 'sunicv-wannacry',
  templateUrl: 'wannacry.component.html',
  styleUrls: ['./wannacry.component.scss'],
})

export class WannacryComponent implements OnInit {


  cultural = [];
  world;

  constructor(protected mapService: MapService) {}


  chart ;
  projection = d3.geoEquirectangular()
    .center([-40, 20]);

  //console.log(chart);

  addToMap = (collection, key) => this.chart['container'].append('g')
    .selectAll('path')
    .data(topojson.feature(collection, collection.objects[key]).features)
    .enter()
    .append('path')
    .attr('d', d3.geoPath().projection(this.projection))
    .attr('stroke', '#505050')
    .attr('stroke-width', 1)
    .attr('stroke-opacity', 1)
    .attr('fill','#000000')
    .on('mouseover',function(d,i){
      d3.select(this)
        .attr("fill","#aaa");
    })
    .on('mouseout',function(d,i){
      d3.select(this)
        .transition()
        .duration(500)
        .attr('fill','#000000');
    });
  


  draw = (world) => {
    //const [sea, land, cultural] = worldData;

    this.addToMap(world, 'countries')
      .classed('boundary', true);

    this.chart['svg'].node().classList.add('map');
  };


  ngOnInit() {
    this.chart=chartFactory();
/*     this.mapService.getCultural()
      .then((cultural: any[]) => {
        this.cultural = cultural;
        console.log('cultural');
        console.log(cultural);
        console.log(this.chart);
        this.draw(this.cultural);

      }); */

       this.mapService.getWorld()
      .then((world: any[]) => {
        this.world = world;
        console.log('world');
        console.log(world);
        this.draw(this.world);

      }); 
  }


}
