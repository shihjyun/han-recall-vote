<script>
	import  StepCard  from "./shared/StepCard.svelte";
	import { stepInfo } from "./stores/StepInfo.js"
	

</script>

<main>
	<div class="figure"></div>
	<article>
		{#each $stepInfo as step}
			 <StepCard stepId={step.id} content={step.content}/>
		{/each}
	</article>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
		position: relative;
	}


	.figure{
		z-index: -1;
		margin: 0 auto;
		background-color: aquamarine;
		margin-top: 40%;
		width: 90%;
		height: 250px;
		position: sticky;
		top: 40%;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>