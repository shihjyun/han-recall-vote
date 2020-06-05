<script>
	import ScrollamaTemplate from "./shared/ScrollamaTemplate.svelte";
	import HeaderCover from "./component/HeaderCover.svelte";
	import HowToRead from "./component/HowToRead.svelte";
	import Footer from "./component/Footer.svelte"
	

</script>


<main>
	<header id='intro'>
		<HeaderCover/>
		<h3>透過中選會數據一次帶你看盡三次投票中，高雄各區對韓國瑜的態度變化！</h3>
		<p>製作：Steven Yeo</p>
	</header>
	<section>
		<p class="content">韓國瑜近兩年來經歷了三場選舉，應該是在短時間內 韓國瑜近兩年來經歷了三場選舉，應該是在短時間內 韓國瑜近兩年來經歷了三場選舉，應該是在短時間內 韓國瑜近兩年來經歷了三場選舉，應該是在短時間內 韓國瑜近兩年來經歷了三場選舉，應該是在短時間內 韓國瑜近兩年來經歷了三場選舉，應該是在短時間內</p>
	</section>
	<h2>霸韓指南針組成三要素</h2>
	<HowToRead/>
	<ScrollamaTemplate/>
	<Footer/>
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
		font-size: 1.1em;
		font-family: 'Noto Sans TC';
	}

	p.content{
		text-align: left;
	}

	h1{
		color: #272727;
		font-weight:bold;
		letter-spacing: 0.2em;
		font-size: 3em;
		font-family: 'Noto Sans TC';
	}

	h2{
		color: #272727;
		font-weight:bold;
		letter-spacing: 0.05em;
		font-size: 1.5em;
		margin-block-start: 1.8em;
		margin-block-end: 0.1em;
		font-family: 'Noto Sans TC';
	}

	h3{
		color: #272727;
		letter-spacing: 0.05em;
		font-size: 1.2em;
		font-family: 'Noto Sans TC';
	}

	@media screen and (max-width: 1023px) {
	p{
		font-size: 1em;
	}
  p.content{
    padding: 0 10px;
	}
	h2{
		font-size: 1.2em;
	}
	h3{
		padding: 0 6px;
	}
}
</style>