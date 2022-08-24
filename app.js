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

  if (scale === 'linear') {
    colorScale = d3.scaleLinear()
      .domain(d3.extent(dataset))
      .range(['white', 'red'])
  }

  // Rectangles
  svg.append('g')
    .attr('transform', 'translate(2,2)')
    .attr('stroke', 'black ')
    .selectAll('rect')
    .data(dataset)
    .join('rect')
    .attr('width', box - 3)
    .attr('height', box - 3)
    .attr('x', (d, idx) => box * (idx % 20)) //0, 30, 60
    .attr('y', (d, idx) => box * ((idx / 20) | 0))
    .attr('fill', colorScale)

}

draw('#heatmap1', 'linear')