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
  countryMap;
  g_i=0;
  dataArray=[];
  circleArray=[];
  hidecon=false;

  projection = d3.geoEquirectangular()
    .scale(120)
    .center([-40, 20]);


  constructor(protected mapService: MapService, config: NgbTooltipConfig) {
    config.placement = "top";
  }
  ngOnInit() {
    this.chart = chartFactory();

    this.mapService.getCountry()
      .then((country: any[]) => {
        
/*remove the Antarctica*/
        var temp=country['objects']['countries']['geometries'];
        var i=0;
        while(i<temp.length){
          if(temp[i].properties.NAME=='Antarctica'){
            temp.splice(i,1);
          }else{
            i++;
          }
        }

        console.log(temp);

        this.country = country;

        this.countries = topojson.feature(this.country, this.country.objects['countries']).features;






      });

    this.mapService.getCountryMap()
    .then((countryMap:any[])=>{
      this.countryMap=countryMap;
    })
  }

  ngAfterViewChecked() {
    if (this.country && this.drawed == false) {
      this.draw(this.country);
    }
  }

  addToMap = (collection, key) => {
    this.drawed = true;

    //resiz the scale according to the width and height
    var svg = d3.select('.d3-chart svg')
      .call(this.responsivefy);


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

  start(){
    var data=this.mapService.getData();

    this.insertTableRow(data);
    this.make_circle(data);


  }
  insertTableRow=(data)=>
  {
    data.id="c"+this.g_i;
    this.g_i++;
    data.src="./assets/images/flags/" + data['c'].toLowerCase() + ".png";
    data.country=this.countryMap[data['c']];
    data.color=data['co'];
    if(this.dataArray.length>4){
      this.dataArray.shift();
    }
    this.dataArray.push(data);
  }
  make_circle=(data)=>{
    var point=[data['lo'],data['la']];
    var circle={};
    circle["point"]=this.projection(point);
    circle['fill']=data['co'];
    this.circleArray.push(circle);
    
  }

  hideConsole(){
    this.hidecon=!this.hidecon;
    
  }

  responsivefy(svg) {
    // get container + svg aspect ratio
    var container = d3.select(svg.node().parentNode),
        width = parseInt(svg.style("width")),
        height = parseInt(svg.style("height")),
        aspect = width / height;
  
    // add viewBox and preserveAspectRatio properties,
    // and call resize so that svg resizes on inital page load
    svg.attr("viewBox", "0 0 " + width + " " + height)
        .attr("preserveAspectRatio", "xMinYMid")
        .call(resize);
  
    // to register multiple listeners for same event type,
    // you need to add namespace, i.e., 'click.foo'
    // necessary if you call invoke this function for multiple svgs
    // api docs: https://github.com/mbostock/d3/wiki/Selections#on
    d3.select(window).on("resize." + container.attr("id"), resize);
  
    // get width of container and resize svg to fit it
    function resize() {
        var targetWidth = parseInt(container.style("width"));
        svg.attr("width", targetWidth);
        svg.attr("height", Math.round(targetWidth / aspect));
    }
  }



}
