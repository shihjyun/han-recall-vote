<script>
	import { onMount } from "svelte";

	let kaoGeoData = [];

	onMount(async function() {
		const response = await fetch("./static/data/kao_town_merge.geojson");
		const json = await response.json();
		kaoGeoData = json;
	});
	
</script>

<main>
	<h1>Hello {kaoGeoData.name}!</h1>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>