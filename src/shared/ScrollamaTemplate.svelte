<script>
  import { onMount } from "svelte";
  import StepCard from "../shared/StepCard.svelte";
  import Chart from "../component/Chart.svelte";
  import { stepInfo } from "../stores/StepInfo.js";
  import { helperArgs } from "../stores/RecallData.js";
  import "intersection-observer";
  import scrollama from "scrollama";
  import * as d3 from "d3";



  let scrolly;
  let chartScope;

  
  
  

  onMount(() => {

    // package the helperArg and pass into the step function
    const helperArg = $helperArgs

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
    <Chart />
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

