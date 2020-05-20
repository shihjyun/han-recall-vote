<script>
  import { onMount } from "svelte";
  import  StepCard  from "../shared/StepCard.svelte";
  import { stepInfo } from "../stores/StepInfo.js";
  import "intersection-observer";
  import scrollama from "scrollama";
  import { select, selectAll, style } from "d3-selection";

  let d3 = { select, selectAll }
  let scrolly;

  onMount(() => {

    let stepSelection = d3.select(scrolly)
      .selectAll(".step")

    let figure = d3.select(scrolly)
      .select(".figure")

    const scroller = scrollama();

    scroller
    .setup({
      step: stepSelection.nodes(),
      offset: 0.25,
      debug: true,
    })
    .onStepEnter(response => {
      if (response.index === 0) {
        figure.style("background-color", "#D9006C")
      }
      
    })
    .onStepExit(response => {
      figure.style("background-color", "aquamarine")
    });
  })
  
  

</script>

<div class="scrolly" bind:this={scrolly}>
  <div class="figure"></div>
  <article>
    {#each $stepInfo as step}
        <StepCard stepId={step.id} content={step.content}/>
    {/each}
  </article>
</div>


<style>
  .figure{
		z-index: -1;
		margin: 0 auto;
		background-color: aquamarine;
		margin-top: 20%;
		width: 90%;
		height: 250px;
		position: sticky;
		top: 20%;
	}
</style>

