import * as d3 from 'd3';

const protoChart = {
  width: window.innerWidth,
  height: window.innerHeight,
  margin: {
    left: 10,
    right: 10,
    top: 10,
    bottom: 10,
  }
};

export function chartFactory() {

  // opts, proto = protoChart
  //  const chart = Object.assign({}, proto, opts);
  const chart = Object.assign({}, protoChart);


  chart['svg'] = d3.select('.d3-chart').select('svg')
    .attr('id', chart['id'] || 'chart')
    .attr('width', chart.width - chart.margin.right)
    .attr('height', chart.height - chart.margin.bottom);



  return chart;
}
