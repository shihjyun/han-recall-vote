<script>
	import  ScrollamaTemplate  from "./shared/ScrollamaTemplate.svelte";
	import  HowToRead  from "./component/HowToRead.svelte";
	

</script>


<main>
	<header id='intro'>
		<h1>罷韓指南針</h1>
		<h2>透過中選會數據一次帶你看盡三次投票中，高雄各區對韓國瑜的態度變化！</h2>
		<p>製作：Steven Yeo</p>
	</header>
	<section>
		<p class="content">韓國瑜近兩年來經歷了三場選舉，應該是在短時間內 韓國瑜近兩年來經歷了三場選舉，應該是在短時間內 韓國瑜近兩年來經歷了三場選舉，應該是在短時間內 韓國瑜近兩年來經歷了三場選舉，應該是在短時間內 韓國瑜近兩年來經歷了三場選舉，應該是在短時間內 韓國瑜近兩年來經歷了三場選舉，應該是在短時間內</p>
	</section>
	<HowToRead/>
	<ScrollamaTemplate />
</main>

<style>
	main {
		text-align: center;
		margin: 0 auto;
	}

	header {
		margin: 0 auto;
		max-width: 700px;
	}

	section {
		margin: 0 auto;
		max-width: 700px;
	}

	p{
		font-family: 'Noto Sans TC';
	}

	p.content{
		text-align: left;
	}

	h1 {
		color: #272727;
		font-weight:bold;
		text-transform: uppercase;
		letter-spacing: 0.2em;
		font-size: 3em;
		font-family: 'Noto Sans TC';
	}

	h2 {
		color: #272727;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		font-size: 1.2em;
		font-family: 'Noto Sans TC';
	}
</style>