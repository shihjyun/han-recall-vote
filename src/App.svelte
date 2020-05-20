<script>
	import  ScrollamaTemplate  from "./shared/ScrollamaTemplate.svelte";
	

</script>

<main>
	<ScrollamaTemplate />
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

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>