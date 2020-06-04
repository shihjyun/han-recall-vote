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
      d3.selectAll('#slope-lines path')
        .each(function(d) { d.totalLength = this.getTotalLength(); })
        .transition()
        .duration(400)
        .attr("stroke-dashoffset", d => d.totalLength)

      d3.selectAll('#slope-lines')
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
    content: '在看完',
    stepEnterDown: function(...Arg){

      const slopeFormat2018 = Arg[0].slopeFormat.filter(d => d.vote_type === '2018 直轄市長選舉 韓得票率')

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
            .attr('id', 'slope-lines')
            .attr("fill", "none")
            .attr('stroke-width', 0.5)
            .attr("stroke", "rgba(16, 14, 14, 0.5)")
          .selectAll("path")
          .data(groups(Arg[0].slopeFormat, d => d.TOWNNAME))
          .enter()
          .append('path')
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
    stepEnterUp: function(...Arg){},
    stepExitUp: function(...Arg){},
    stepExitDown: function(...Arg){}
  },
  {
    step: 5,
    content: '這是第五步 這是第五步這是第五步這是第五步',
    stepEnterDown: function(...Arg){},
    stepEnterUp: function(...Arg){},
    stepExitUp: function(...Arg){},
    stepExitDown: function(...Arg){}
  },
  {
    step: 6,
    content: '這是第六步 這是第六步 這是第六步 這是第六步',
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