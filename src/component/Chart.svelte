<script>
  import { onMount, createEventDispatcher  } from "svelte";
  import { recallTownData, slopeFormatData, helperArgs } from "../stores/RecallData.js";
  import wrap from "../helper/WrapText.js"
  import * as d3 from "d3";

  // create dispatcher
  let dispatch = createEventDispatcher();

  // different device setting
  let isMobile = (window.innerWidth > 1023) ? false : true;

  // Configuration - reactive value
  let windowWidth = isMobile ?  window.innerWidth : 600;
  $: width = windowWidth - margin.left - margin.right 
  $: height = width * 1.4 - margin.top - margin.bottom
  $: town_size = (width / offset)

  // Configuration - constant value
  const formatData = $recallTownData
  const margin = isMobile ? ({top: 10, right: 10, bottom: 10, left: 10}) : ({top: 20, right: 20, bottom: 20, left: 20})
  const offset = isMobile ? 16 : 14
  const town_padding = isMobile ? 12 : 14;
  const minVoteRate = d3.min(formatData.map((d) => d3.min([d.vote_rate_2018, d.vote_rate_2018, d.vote_rate_recall])))
  const maxVoteRate = d3.max(formatData.map((d) => d3.max([d.vote_rate_2018, d.vote_rate_2018, d.vote_rate_recall])))
  const minSupportRate = d3.min(formatData.map((d) => d3.min([d.han_votes_2018, d.han_votes_2020, d.han_votes_recall])))
  const maxSupportRate = d3.max(formatData.map((d) => d3.max([d.han_votes_2018, d.han_votes_2020, d.han_votes_recall])))
  let townGroupsWidth
  let townGroupsHeight
  let townGroupsX
  let townGroupsY
  let canvasWidth
  let centerDistance

  // grid map's helper function
  const y_column = ({row}) => row * (town_size + town_padding)
  const x_column = ({column}) => column * (town_size + town_padding)
  const axisPosition = (cell, size = town_size, padding = town_padding) =>  (cell * (size + padding)) + size / 2
  const votePeoCirSize = (d) => {
    if (d.vote_people <= 10000) {
      return isMobile ? 4 : 6
    } else if(d.vote_people > 10000 && d.vote_people <= 100000){
      return isMobile ? 10 : 15
    } else {
      return isMobile ? 16 : 23
    }
  }
  const voteRateColorScale = d3.scaleLinear()
    .domain([minVoteRate, maxVoteRate])
    .range(['#F6F6FC', '#DD008F'])

  const arrowRotate = d3.scaleLinear()
    .domain([minSupportRate, maxSupportRate]) // support rate
    .range([-90, 90]) // rotate degree
  
  const rotateInterpolator = (d, start, end) => {
    return d3.interpolateString(
          `rotate(
          ${start}, 
          ${axisPosition(d.column)},
          ${axisPosition(d.row) + (isMobile ? 0.6 * town_size : 0.5 * town_size)})`, 
          `rotate(
          ${end}, 
          ${axisPosition(d.column)},
          ${axisPosition(d.row) + (isMobile ? 0.6 * town_size : 0.5 * town_size)})`)
          };

  // slope chart toolkit
  const slopeFormat = $slopeFormatData


  const slopeLine = d3.line()
    .x(d => slopeX(d.vote_type))
    .y(d => slopeY(d.support_rate)  + 100)

  let slopeX

  let slopeY
  
  let xAxis

  const townSizeColor = (d) => {
    if (d.vote_people <= 10000) {
      return 'rgba(12, 83, 116, 0.4)'
    } else if(d.vote_people > 10000 && d.vote_people <= 100000){
      return 'rgba(233, 225, 160, 0.4)'
    } else {
      return 'rgba(122, 34, 110, 0.4)'
    }
  }

  
  
  // draw
  onMount(() => {
    const svg = d3.select('#canvas')
      .attr('preserveAspectRatio', 'xMidYMid')
    
    const g = svg
      .append('g')
      .attr('id', 'town-groups')
    
    const towns = g.selectAll('.town')
      .data(formatData)
      .enter().append('g')
      .attr('class', 'town')
      .attr('id', d => d.TOWNNAME);
    
    towns.append('g')
      .attr('transform', d => `translate(${x_column(d)}, ${y_column(d) + town_size})`)
      
    towns.append('circle')
      .attr('cx', d => axisPosition(d.column))
      .attr('cy', d => axisPosition(d.row) + (isMobile ? 0.6 * town_size : 0.5 * town_size))
      .attr('r', 0);
    
    towns.append('line')
      .attr('class', 'arrow')
      .attr('x1', d => axisPosition(d.column))
      .attr('x2', d => axisPosition(d.column))
      .attr('y1', d => axisPosition(d.row) + (isMobile ? 0.6 * town_size : 0.5 * town_size))
      .attr('y2', d => axisPosition(d.row) + (isMobile ? 0.6 * town_size : 0.5 * town_size))
      .attr('stroke', '#272727')
      .attr('stroke-width', 2.5)
      .attr('marker-end', 'url(#arrow)')
      .attr('transform', d => `rotate(
                              0, 
                              ${axisPosition(d.column)},
                              ${axisPosition(d.row) + (isMobile ? 0.6 * town_size : 0.5 * town_size)})`)
    
    towns.append('text')
      .attr('class', 'town-label')
      .attr('dominant-baseline', 'central')
      .attr('x', ({column}) => axisPosition(column))
      .attr('y', ({row}) => axisPosition(row))
      .attr('text-anchor', 'middle')
      .style('font-size', `${isMobile ? 0.6 : 0.8}rem`)
      .attr('font-family', 'Microsoft JhengHei')
      .attr('fill', '#272727')
      .attr('letter-spacing', 1)
      .text(d => d.TOWNNAME);


    // adjust townGroups to the center
    const townGroupBBox =  document.getElementById('town-groups').getBBox()
    canvasWidth = document.getElementById('canvas').getBoundingClientRect().width
    townGroupsHeight = townGroupBBox.height
    townGroupsWidth = townGroupBBox.width
    townGroupsX = townGroupBBox.x
    townGroupsY = townGroupBBox.y
    centerDistance = (canvasWidth - townGroupsWidth)/2

    g.attr('transform', `translate(${centerDistance}, 0)`)

    // slope chart's function/variable
    slopeY = d3.scaleLinear()
      .domain([0, 1])
      .range([townGroupsHeight - margin.bottom, margin.top])
    
    slopeX = d3.scalePoint()
      .domain(slopeFormat.map(d => d.vote_type))
      .range([townGroupsX + 0.1 * townGroupsWidth , townGroupsWidth - 0.1 * townGroupsWidth])
    
    xAxis = g => g
      .attr('transform', `translate(0,100)`)
      .call(d3.axisTop(slopeX))
      .call(g => g.select('.domain').remove())

    // draw slope chart component

    // - x axis
    g.append("g")
      .attr('class', 'x-axis')
      .call(xAxis)
      .selectAll(".tick text")
      .attr('transform', `translate(0,${ isMobile ? -45 : -60 })`)
      .style('font-size', `${isMobile ? 0.6 : 0.8}rem`)
      .attr('font-family', 'Microsoft JhengHei')
      .call(wrap, 20)
      .attr('opacity', 0)

    
    // - x axis grid line
    d3.selectAll('.tick line')
      .attr('y1', d => slopeY(1))
      .attr('y2', d => slopeY(0))
      .attr('stroke-width', '1')
      .attr('stroke', 'rgba(207, 202, 207, 0.8)')
      .attr('transform', `translate(0,${ isMobile ? -20 : -35 })`)
      .attr('opacity', 0)
      .append('line')
      

    const yAxisTickText = [{value: 0, text: '0%'}, 
                          {value: 0.25, text: '25%'},
                          {value: 0.5, text: '50%'}, 
                          {value: 0.75, text: '75%'}, 
                          {value: 1, text: '100%'}]
    // - y axis tick text
    g.append("g")
      .attr('class', 'y-axis')
      .selectAll('text')
        .data(yAxisTickText)
        .join('text')
      .attr('dominant-baseline', 'central')
      .attr('x', townGroupsX + (isMobile ? 12 : 15))
      .attr('y', d => slopeY(d.value) + (isMobile ? 80 : 65))
      .style('font-size', `${isMobile ? 0.5 : 0.7}rem`)
      .text(d => d.text)
      .attr('font-family', 'Microsoft JhengHei')
      .attr('fill', '#272727')
      .attr('opacity', 0)
    
    // marker
    
    const markerDefs = svg.append("defs");

    markerDefs
      .append("marker")
      .attr("id", "arrow")
      .attr("viewBox", "-10 -10 30 30")
      .attr("markerWidth", 10)
      .attr("markerHeight", 10)
      .attr("orient", "auto")
      .append("path")
      .attr("d", `M${isMobile ? 15 : 20},0 L0,-3 L 0,3Z`)
      .attr("fill", "#272727");

    // set steop needed value to empty store
    const AddedArgs = {rotateInterpolator, isMobile, votePeoCirSize, voteRateColorScale,
                      arrowRotate, slopeFormat, townGroupsX, townGroupsY, slopeX, slopeY,
                      xAxis, formatData, townGroupsWidth, axisPosition, town_size, townSizeColor,
                      slopeLine}

    helperArgs.update(d => {
						// poll is something we want to add
            return AddedArgs;
        });
    
  });
  

</script>

<svg width={width}
     height={height}
     viewBox={`0 0 ${width} ${height}`}
     id ="canvas"></svg>


<style>
  svg {
    z-index: 2;
  }
</style>

<!-- markup (zero or more items) goes here -->