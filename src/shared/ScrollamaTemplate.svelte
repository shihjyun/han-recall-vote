<script>
  import { onMount } from "svelte";
  import StepCard from "../shared/StepCard.svelte";
  import Chart from "../component/Chart.svelte";
  import { stepInfo } from "../stores/StepInfo.js";
  import "intersection-observer";
  import scrollama from "scrollama";
  import * as d3 from "d3";



  let scrolly;
  let chartScope;

  onMount(() => {
    
    // get object/function from child component
    //  - grid map
    let rotateInterpolator = chartScope.$capture_state().rotateInterpolator
    let votePeoCirSize = chartScope.$capture_state().votePeoCirSize
    let voteRateColorScale = chartScope.$capture_state().voteRateColorScale
    let arrowRotate = chartScope.$capture_state().arrowRotate
    let isMobile = chartScope.$capture_state().isMobile
    let formatData = chartScope.$capture_state().formatData
    let axisPosition = chartScope.$capture_state().axisPosition
    let town_size = chartScope.$capture_state().town_size
    // - slope chart
    let slopeFormat = chartScope.$capture_state().slopeFormat
    let slopeX = chartScope.$capture_state().slopeX
    let slopeY = chartScope.$capture_state().slopeY
    let xAxis = chartScope.$capture_state().xAxis
    let townGroupsX = chartScope.$capture_state().townGroupsX
    let townGroupsY = chartScope.$capture_state().townGroupsY
    let townGroupsWidth = chartScope.$capture_state().townGroupsWidth
    let townSizeColor = chartScope.$capture_state().townSizeColor
    let slopeLine = chartScope.$capture_state().slopeLine

    // package the helperArg and pass into the step function
    let helperArg = {rotateInterpolator, isMobile, votePeoCirSize, voteRateColorScale,
                     arrowRotate, slopeFormat, townGroupsX, townGroupsY, slopeX, slopeY,
                     xAxis, formatData, townGroupsWidth, axisPosition, town_size, townSizeColor,
                     slopeLine} 

    // scrollama set up
    let stepSelection = d3.select(scrolly)
      .selectAll(".step")

    let figure = d3.select(scrolly)
      .select(".figure")

    const scroller = scrollama();

    let midpoint = Math.floor(window.innerHeight * 0.2) + "px";

    scroller
    .setup({
      step: stepSelection.nodes(),
      offset: midpoint,
      debug: true,
    })
    .onStepEnter(response => {

      response.direction === 'down' ? 
        $stepInfo[response.index].stepEnterDown(helperArg) : 
        $stepInfo[response.index].stepEnterUp(helperArg)
      
    })
    .onStepExit(response => {
      response.direction === 'down' ? 
        $stepInfo[response.index].stepExitDown(helperArg) : 
        $stepInfo[response.index].stepExitUp(helperArg)
    });

    window.addEventListener("resize", scroller.resize);
  })
  
  

</script>

<div class="scrolly" bind:this={scrolly}>
  <div class="figure">
    <Chart bind:this={chartScope}/>
  </div>
  <article>
    {#each $stepInfo as step}
        <StepCard stepId={step.id} content={step.content}/>
    {/each}
  </article>
</div>


<style>
  .figure{
    z-index: 2;
    margin: 0 auto;
		background-color: #ffffff;
		margin-top: 10%;
    position: -webkit-sticky;
		position: sticky;
    -webkit-transform: translate3d(0, 0, 0);
    -moz-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
		top: 10%;
	}
</style>

