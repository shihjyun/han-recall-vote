<script>
  import { onMount } from "svelte";
  import * as d3 from "d3";

  function drawCompass(svg, cx, cy, color, r, degree, id) {
    svg.append('circle')
      .attr('cx', cx)
      .attr('cy', cy)
      .attr('fill', color)
      .attr('r', r)

    svg.append('line')
      .attr('id', `circle${id}`)
      .attr('class', 'arrow')
      .attr('x1', cx)
      .attr('x2', cx)
      .attr('y1', cy)
      .attr('y2', cy)
      .attr('stroke', '#272727')
      .attr('stroke-width', 2.5)
      .attr('transform', `rotate(${degree}, ${cx}, ${cy})`)
      .attr('marker-end', 'url(#arrow)')
  }

  function rotateInterpolator (circleNum, start, end) {

    const centrePoint = {
      circle1: {x: 77, y: 34, degree: -30},
      circle2: {x: 450, y: 100, degree: 30},
      circle3: {x: 85, y: 148, degree: 90}
    }

    return d3.interpolateString(
          `rotate(
          ${start}, 
          ${centrePoint[circleNum].x},
          ${centrePoint[circleNum].y})`, 
          `rotate(
          ${end}, 
          ${centrePoint[circleNum].x},
          ${centrePoint[circleNum].y})`)
          };

  function rotateArrow (circleNum, start, end, duration) {
    d3.select(`#${circleNum}`)
          .transition()
        .duration(duration)
        .attrTween('transform', () => rotateInterpolator(circleNum, start, end))
          .transition()
        .duration(duration)
        .attrTween('transform', () => rotateInterpolator(circleNum, end, start))
  }

  onMount(() => {
    let svg = d3.select('svg')
    

    const markerDefs = svg.append("defs");

    markerDefs
      .append("marker")
      .attr("id", "arrow")
      .attr("viewBox", "-10 -10 30 30")
      .attr("markerWidth", 10)
      .attr("markerHeight", 10)
      .attr("orient", "auto")
      .append("path")
      .attr("d", `M20,0 L0,-3 L 0,3Z`)
      .attr("fill", "#272727");


    drawCompass(svg, 77, 34, '#E94BD7',27, -30, 1)
    drawCompass(svg, 450, 100, 'rgba(252,199,245,0.5)',45, 30, 2)
    drawCompass(svg, 85, 148, '#FCA2F2',14, 90, 3)

    rotateArrow('circle1', -30, 90, 1000)
    rotateArrow('circle2', 30, -90, 1200)
    rotateArrow('circle3', 90, -30, 1500)
    
    
    d3.interval(() => {
      rotateArrow('circle1', -30, 90, 1000)
      rotateArrow('circle2', 30, -90, 1200)
      rotateArrow('circle3', 90, -30, 1500)
    }, 1500)
    
  })
  
</script>

<svg width="100%" height="100%" viewBox="0 0 509 200" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
    <g transform="matrix(1,0,0,1,-46.5083,-0.612561)">
        <g transform="matrix(1,0,0,1,-12.6085,0.612561)">
            <rect x="59.117" y="0" width="508.821" height="200" style="fill:none;"/>
        </g>
        <g transform="matrix(0.612561,0,0,0.612561,-61.49,64.8677)">
            <text x="330.41px" y="95.025px" style="font-family:'NotoSansTC-Bold', 'Noto Sans TC', sans-serif;font-weight:700;font-size:96px;fill:rgb(255,0,194);fill-opacity:0.55;">罷<tspan x="436.97px 543.53px 650.09px 756.65px " y="95.025px 95.025px 95.025px 95.025px ">韓指南針</tspan></text>
        </g>
        <g transform="matrix(0.612561,0,0,0.612561,-63.3276,63.6426)">
            <text x="330.41px" y="95.025px" style="font-family:'NotoSansTC-Bold', 'Noto Sans TC', sans-serif;font-weight:700;font-size:96px;">罷<tspan x="436.97px 543.53px 650.09px 756.65px " y="95.025px 95.025px 95.025px 95.025px ">韓指南針</tspan></text>
        </g>
    </g>
</svg>



