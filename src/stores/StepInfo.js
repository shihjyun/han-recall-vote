import { readable } from "svelte/store";
import * as d3 from "d3";
import { groups } from "d3-array";

export const stepInfo = readable([
  {
    step: 1,
    content: `2018 市場選舉韓國瑜近<br>兩年來經歷了三場選舉，應該是在短時間內 韓國瑜近兩年來經歷了三場選舉，應該是在短`,
    stepEnterDown: function(...Arg){

      const formatData = Arg[0].formatData
      const town_size = Arg[0].town_size
      const axisPosition = Arg[0].axisPosition
      const isMobile = Arg[0].isMobile

      d3.selectAll('.town circle')
        .data(formatData, function (d) { return d ? d.TOWNNAME : this.id; })
          .transition()
        .duration(800)
        .attr('cx', d => axisPosition(d.column))
        .attr('cy', d => axisPosition(d.row) + (isMobile ? 0.6 * town_size : 0.5 * town_size))
        .attr('r',  d => Arg[0].votePeoCirSize(d))
        .attr('fill', d => Arg[0].voteRateColorScale(d.vote_rate_2018))
        .attr('stroke', 'rgba(95, 93, 93, 0.2)')

      d3.selectAll('.town .arrow')
        .attr('opacity', 1)
          .transition()
        .duration(1000)
        .attrTween('transform', d => Arg[0].rotateInterpolator(d, 0, Arg[0].arrowRotate(d.han_votes_2018)))

    },
    stepEnterUp: function(...Arg){

      const formatData = Arg[0].formatData
      const town_size = Arg[0].town_size
      const axisPosition = Arg[0].axisPosition
      const isMobile = Arg[0].isMobile

      d3.selectAll('.town circle')
        .data(formatData, function (d) { return d ? d.TOWNNAME : this.id; })
          .transition()
        .attr('cx', d => axisPosition(d.column))
        .attr('cy', d => axisPosition(d.row) + (isMobile ? 0.6 * town_size : 0.5 * town_size))
        .duration(800)
        .attr('r', d => Arg[0].votePeoCirSize(d))
        .attr('fill', d => Arg[0].voteRateColorScale(d.vote_rate_2018))

      d3.selectAll('.town .arrow')
          .transition()
        .duration(1000)
        .attr('opacity', 1)
        .attrTween('transform', d => Arg[0].rotateInterpolator(d, Arg[0].arrowRotate(d.han_votes_2020), Arg[0].arrowRotate(d.han_votes_2018)))

    },
    stepExitUp: function(...Arg){

      d3.selectAll('.town circle')
          .transition()
        .duration(800)
        .attr('r', 0)

      d3.selectAll('.town .arrow')
          .transition()
        .duration(1000)
        .attrTween('transform', d => Arg[0].rotateInterpolator(d, Arg[0].arrowRotate(d.han_votes_2018), 0))

      
    },
    stepExitDown: function(){}
  },
  {
    step: 2,
    content: '2020 總統大選',
    stepEnterDown: function(...Arg){
      d3.selectAll('.town circle')
          .transition()
        .duration(800)
        .attr('r',  d => Arg[0].votePeoCirSize(d))
        .attr('fill', d => Arg[0].voteRateColorScale(d.vote_rate_2020))
        .attr('stroke', 'rgba(95, 93, 93, 0.2)')

      d3.selectAll('.town .arrow')
          .transition()
        .duration(1000)
        .attrTween('transform', d => Arg[0].rotateInterpolator(d, Arg[0].arrowRotate(d.han_votes_2018), Arg[0].arrowRotate(d.han_votes_2020)))
    },
    stepEnterUp: function(...Arg){

      const formatData = Arg[0].formatData
      const town_size = Arg[0].town_size
      const axisPosition = Arg[0].axisPosition
      const isMobile = Arg[0].isMobile

      d3.selectAll('.town circle')
        .data(formatData, function (d) { return d ? d.TOWNNAME : this.id; })
          .transition()
        .duration(800)
        .attr('cx', d => axisPosition(d.column))
        .attr('cy', d => axisPosition(d.row) + (isMobile ? 0.6 * town_size : 0.5 * town_size))
        .attr('r', d => Arg[0].votePeoCirSize(d))
        .attr('fill', d => Arg[0].voteRateColorScale(d.vote_rate_2020))

      d3.selectAll('.town .arrow')
          .transition()
        .duration(1000)
        .attr('opacity', 1)
        .attrTween('transform', d => Arg[0].rotateInterpolator(d, Arg[0].arrowRotate(d.han_votes_recall), Arg[0].arrowRotate(d.han_votes_2020)))

    },
    stepExitUp: function(){},
    stepExitDown: function(){}
  },
  {
    step: 3,
    content: '2020 高雄市長罷免',
    stepEnterDown: function(...Arg){
      d3.selectAll('.town circle')
          .transition()
        .duration(800)
        .attr('r', d => Arg[0].votePeoCirSize(d))
        .attr('fill', d => Arg[0].voteRateColorScale(d.vote_rate_recall))
    },
    stepEnterUp: function(...Arg){

      // remove slope lines group

      d3.selectAll('#slope-lines-20recall, #slope-lines-1820')
        .remove()


      // redraw circles
      const formatData = Arg[0].formatData

      d3.selectAll('.town circle')
        .data(formatData, function (d) { return d ? d.TOWNNAME : this.id; })
          .transition()
        .duration(1000)
        .attr('cx', d => Arg[0].axisPosition(d.column))
        .attr('cy', d => Arg[0].axisPosition(d.row) + (Arg[0].isMobile ? 0.6 * Arg[0].town_size : 0.5 * Arg[0].town_size))
        .attr('r', d => Arg[0].votePeoCirSize(d))
        .attr('fill', d => Arg[0].voteRateColorScale(d.vote_rate_2020))

      // show arrow
      d3.selectAll('.town .arrow')
          .transition()
        .delay(600)
        .duration(500)
        .attr('opacity', 1)

      // show text
      d3.selectAll('.town-label')
          .transition()
        .delay(600)
        .duration(500)
        .attr('opacity', 1)

      // hide axis
      d3.selectAll('.tick text')
        .transition()
        .duration(500)
        .attr('opacity', 0)

      d3.selectAll('.tick line')
        .transition()
        .duration(500)
        .attr('opacity', 0)

      d3.selectAll('.y-axis text')
        .transition()
        .duration(500)
        .attr('opacity', 0)
    },
    stepExitUp: function(...Arg){},
    stepExitDown: function(...Arg){}
  },
  {
    step: 4,
    content: '接著觀察高雄各區三次投票中對韓國瑜的支持率的趨勢變化',
    stepEnterDown: function(...Arg){

      const slopeFormat2018 = Arg[0].slopeFormat.filter(d => d.vote_type !== '2020 高雄市長罷免 反對率')

      // hide arrow
      d3.selectAll('.town .arrow')
        .attr('opacity', 1)
          .transition()
        .duration(500)
        .attr('opacity', 0)

      // hide text
      d3.selectAll('.town-label')
        .attr('opacity', 1)
          .transition()
        .duration(500)
        .attr('opacity', 0)

      // transform circles
      d3.selectAll('.town circle')
            .data(slopeFormat2018, function (d) { return d ? d.TOWNNAME : this.id; })
            .transition()
          .attr('fill', 'rgba(16, 14, 14, 0.5)')
          .delay(400)
          .duration(1000)
          .attr('cx', Arg[0].townGroupsX  + 0.1 * Arg[0].townGroupsWidth)
          .attr('cy', d => Arg[0].slopeY(d.support_rate) + 100)
          .attr("r", 0.5)
      
      // draw slope lines
      d3.select('#town-groups')
            .append("g")
            .attr('id', 'slope-lines-1820')
            .attr("fill", "none")
            .attr('stroke-width', 0.5)
            .attr("stroke", "rgba(16, 14, 14, 0.5)")
          .selectAll("path")
          .data(groups(slopeFormat2018, d => d.TOWNNAME))
          .enter()
          .append('path')
          .attr('class', '_18to20')
          .attr('id', ([key ,]) => key)
          .attr("d", ([, group]) => Arg[0].slopeLine(group))
          .each(function(d) { d.totalLength = this.getTotalLength(); })
          .attr("stroke-dasharray", d => d.totalLength  + " " + d.totalLength)
          .attr("stroke-dashoffset", d => d.totalLength)
          .transition()
          .delay(1400)
          .duration(500)
          .attr("stroke-dashoffset", 0)
      
      // show axis elements
      d3.selectAll('.tick text')
        .transition()
        .delay(600)
        .duration(500)
        .attr('opacity', 1)

      d3.selectAll('.tick line')
        .transition()
        .delay(600)
        .duration(500)
        .attr('opacity', 1)

      d3.selectAll('.y-axis text')
        .transition()
        .delay(600)
        .duration(500)
        .attr('opacity', 1)

    },
    stepEnterUp: function(...Arg){
      d3.selectAll('#slope-lines-1820 path')
        .attr("stroke", "rgba(16, 14, 14, 0.5)")
        .attr('stroke-width', 0.5)
    },
    stepExitUp: function(...Arg){},
    stepExitDown: function(...Arg){}
  },
  {
    step: 5,
    content: '從圖表中可以發現，與直轄市長選舉時相比，總統大選韓國瑜在高雄各區的支持率皆呈劇烈下降趨勢，每區平均下降了 <strong>18.1 %<strong/>',
    stepEnterDown: function(...Arg){},
    stepEnterUp: function(...Arg){
      d3.selectAll('#slope-lines-1820 path')
        .attr("stroke", "rgba(16, 14, 14, 0.5)")
        .attr('stroke-width', 0.5)
    },
    stepExitUp: function(...Arg){},
    stepExitDown: function(...Arg){}
  },
  {
    step: 6,
    content: '其中又以路竹區下降最多達 <strong>21.6 %<strong/>',
    stepEnterDown: function(...Arg){
      
      d3.selectAll('#slope-lines-1820 path, #slope-lines-20recall path')
      .attr("stroke", "rgba(16, 14, 14, 0.2)")
        .attr('stroke-width', 0.5)

      // highlight maximum support rate
      d3.select('#slope-lines-1820 #路竹區')
        .attr("stroke", "#E42F8C")
        .attr('stroke-width', 2)
    },
    stepEnterUp: function(...Arg){

      d3.selectAll('#slope-lines-1820 path, #slope-lines-20recall path')
      .attr("stroke", "rgba(16, 14, 14, 0.2)")
        .attr('stroke-width', 0.5)

      // highlight maximum support rate
      d3.select('#slope-lines-1820 #路竹區')
        .attr("stroke", "#E42F8C")
        .attr('stroke-width', 2)
    },
    stepExitUp: function(...Arg){},
    stepExitDown: function(...Arg){}
  },
  {
    step: 7,
    content: '那與總統大選相比，這次罷韓投票各區對韓國瑜支持率的變化又是如何呢？',
    stepEnterDown: function(...Arg){},
    stepEnterUp: function(...Arg){
      d3.selectAll('#slope-lines-1820 path')
        .attr("stroke", "rgba(16, 14, 14, 0.5)")
        .attr('stroke-width', 0.5)

      // remove slope lines group
      d3.selectAll('._20recall')
        .each(function(d) { d.totalLength = this.getTotalLength(); })
        .transition()
        .duration(400)
        .attr("stroke-dashoffset", d => d.totalLength)
        .remove()

      d3.select('#slope-lines-20recall')
        .transition()
        .delay(400)
        .remove()
    },
    stepExitUp: function(...Arg){
    },
    stepExitDown: function(...Arg){}
  },
  {
    step: 8,
    content: '##可以從圖表中看到，主要有 ... 種情況',
    stepEnterDown: function(...Arg){
      const slopeFormat20recall = Arg[0].slopeFormat.filter(d => d.vote_type !== '2018 直轄市長選舉 韓得票率')

      d3.selectAll('#slope-lines-1820 path')
        .attr("stroke", "rgba(16, 14, 14, 0.5)")
        .attr('stroke-width', 0.5)

      d3.select('#town-groups')
          .append('g')
          .attr('id', 'slope-lines-20recall')
          .attr('fill', 'none')
          .attr('stroke-width', 0.5)
          .attr('stroke', 'rgba(16, 14, 14, 0.5)')
        .selectAll("path")
        .data(groups(slopeFormat20recall, d => d.TOWNNAME))
        .enter()
        .append('path')
        .attr('class', '_20recall')
        .attr('id', ([key ,]) => key)
        .attr('d', ([, group]) => Arg[0].slopeLine(group))
        .each(function(d) { d.totalLength = this.getTotalLength(); })
        .attr('stroke-dasharray', d => d.totalLength  + " " + d.totalLength)
        .attr('stroke-dashoffset', d => d.totalLength)
        .transition()
        .duration(500)
        .attr('stroke-dashoffset', 0)
    },
    stepEnterUp: function(...Arg){
      d3.selectAll('#slope-lines-1820 path, #slope-lines-20recall path')
        .attr("stroke", "rgba(16, 14, 14, 0.5)")
        .attr('stroke-width', 0.5)
    },
    stepExitUp: function(...Arg){},
    stepExitDown: function(...Arg){}
  },
  {
    step: 9,
    content: '##其中呈現 ... 情況的有幾區',
    stepEnterDown: function(...Arg){},
    stepEnterUp: function(...Arg){},
    stepExitUp: function(...Arg){},
    stepExitDown: function(...Arg){}
  }
]);


// call back step function template
// stepEnterDown: function(...Arg){},
// stepEnterUp: function(...Arg){},
// stepExitUp: function(...Arg){},
// stepExitDown: function(...Arg){}