async function draw(el) {
  // Data
  const dataset = await d3.json('data.json');

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

  // Rectangles
  svg.append('g')
    .attr('transform', 'translate(2,2)')
    .attr('stroke', 'black ')
    .attr('fill', '#ddd')
    .selectAll('rect')
    .data(dataset)
    .join('rect')
    .attr('width', box - 3)
    .attr('height', box - 3)
    .attr('x', (d, idx) => box * (idx % 20)) //0, 30, 60
    .attr('y', (d, idx) => box * ((idx / 20) | 0))

}

draw('#heatmap1')