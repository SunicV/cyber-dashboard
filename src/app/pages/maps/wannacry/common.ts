import * as d3 from 'd3';

const protoChart = {
  width: '98%',
  height: '98%',
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
    .attr('id', chart['id'] || 'chart');



  return chart;
}
