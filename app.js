async function draw(el, scale) {
  // Data
  const dataset = await d3.json('data.json');
  dataset.sort((a, b) => a - b);

  // Dimensions
  let dimensions = {
    width: 600,
    height: 150,
  };

  const box = 30;

  // Draw Image
  const svg = d3.select(el)
    .append("svg")
    .attr("width", dimensions.width)
    .attr("height", dimensions.height);

  // Scales
  let colorScale;

  switch (scale) {
    case 'quantize':
      colorScale = d3.scaleQuantize()
        .domain(d3.extent(dataset))
        .range(['#d0e4ff', '#7dace9', '#3682e6'])
      break;
    case 'quantile':
      colorScale = d3.scaleQuantile()
        .domain(dataset)
        .range(['#d0e4ff', '#7dace9', '#3682e6'])
      break;
    case 'threshold':
      colorScale = d3.scaleThreshold()
        .domain([45200, 135600])
        .range(['#d0e4ff', '#7dace9', '#3682e6'])
      break;
    case 'linear':
    default:
      colorScale = d3.scaleLinear()
        .domain(d3.extent(dataset))
        .range(['#d0e4ff', '#3682e6'])
  }

  // Rectangles
  svg.append('g')
    .attr('transform', 'translate(1,1)')
    .selectAll('rect')
    .data(dataset)
    .join('rect')
    .attr('width', box - 2)
    .attr('height', box - 2)
    .attr('x', (d, idx) => box * (idx % 20)) //0, 30, 60
    .attr('y', (d, idx) => box * ((idx / 20) | 0))
    .attr('fill', colorScale)

}

draw('#heatmap1', 'linear');
draw('#heatmap2', 'quantize');
draw('#heatmap3', 'quantile');
draw('#heatmap4', 'threshold');