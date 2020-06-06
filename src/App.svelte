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
		<p>製作｜Steven Yeo</p>
	</header>
	<section>
		<p class="content">昨日(6/6)高雄市長罷免案以93.9萬張同意票成功罷免現任高雄市長韓國瑜，不管韓國瑜日後是否會提出罷免無效之訴，這也是台灣選舉史上第一次順利通過的罷免案。</p>
		<p class="content">韓國瑜從當選高雄市長到今日被高雄市民罷免成功，這一年多的期間高雄各區對韓國瑜的態度究竟如何變化？罷韓指南針將一一為你解答！</p>
	</section>
	<h2>罷韓指南針組成三要素</h2>
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