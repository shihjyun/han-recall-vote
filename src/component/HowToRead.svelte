<script>
  import { onMount } from "svelte";
  import { recallTownData } from "../stores/RecallData.js";
  import { min, max, select, text, format, selectAll}  from "d3";

  onMount(() => {
    const formatData = $recallTownData
    const minVoteRate = min(formatData.map((d) => min([d.vote_rate_2018, d.vote_rate_2018, d.vote_rate_recall])))
    const maxVoteRate = max(formatData.map((d) => max([d.vote_rate_2018, d.vote_rate_2018, d.vote_rate_recall])))
    const minSupportRate = min(formatData.map((d) => min([d.han_votes_2018, d.han_votes_2020, d.han_votes_recall])))
    const maxSupportRate = max(formatData.map((d) => max([d.han_votes_2018, d.han_votes_2020, d.han_votes_recall])))
    
    select('#minVoteRate text').node().textContent = format(".1%")(minVoteRate)
    select('#maxVoteRate text').node().textContent = format(".1%")(maxVoteRate)
    select('#minSupportRate text').node().textContent = format(".1%")(minSupportRate)
    select('#maxSupportRate text').node().textContent = format(".1%")(maxSupportRate)

  })

  
</script>


<div id="HowToRead">
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:serif="http://www.serif.com/" width="100%" height="100%" viewBox="0 0 700 350" version="1.1" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:square;stroke-linejoin:round;stroke-miterlimit:1.5;">
    <g id="notation">
        <g transform="matrix(1.68361,1.36846e-48,0,1.68361,19.9721,-21.2)">
            <text x="236.361px" y="204.681px" style="font-family:'MicrosoftJhengHeiRegular', 'Microsoft JhengHei', sans-serif;font-size:7.128px;fill-opacity:0.6;">*兩次選舉之得票率、罷免案反對率在此泛稱支持率</text>
        </g>
        <g transform="matrix(1.68361,-6.16298e-33,0,1.68361,19.9721,-37.3361)">
            <text x="236.361px" y="204.681px" style="font-family:'MicrosoftJhengHeiRegular', 'Microsoft JhengHei', sans-serif;font-size:7.128px;fill-opacity:0.6;">*期間三類投票之最大值及最小值</text>
        </g>
    </g>
    <g id="circleLegend" transform="matrix(1.16667,0,0,1.16667,-38.7329,-28.164)">
        <g transform="matrix(1.61407e-16,-2.63598,2.01539,1.23407e-16,-216.536,807.697)">
            <path d="M249.429,152.199L249.429,180.838" style="fill:none;stroke:rgb(78,78,86);stroke-opacity:0.5;stroke-width:0.26px;stroke-dasharray:1.02,1.02,0,0;"/>
        </g>
        <g transform="matrix(1.61407e-16,-2.63598,2.01539,1.23407e-16,-216.536,845.207)">
            <path d="M249.429,152.199L249.429,180.838" style="fill:none;stroke:rgb(78,78,86);stroke-opacity:0.5;stroke-width:0.26px;stroke-dasharray:1.02,1.02,0,0;"/>
        </g>
        <g transform="matrix(1.61407e-16,-2.63598,2.01539,1.23407e-16,-216.536,882.71)">
            <path d="M249.429,152.199L249.429,180.838" style="fill:none;stroke:rgb(78,78,86);stroke-opacity:0.5;stroke-width:0.26px;stroke-dasharray:1.02,1.02,0,0;"/>
        </g>
        <g transform="matrix(0.519583,0,0,0.519583,5.70512,53.783)">
            <circle cx="162.63" cy="161.548" r="24.058" style="fill:none;stroke:rgb(137,137,137);stroke-width:1.15px;stroke-linecap:round;"/>
        </g>
        <g transform="matrix(1.29896,0,0,1.29896,-121.045,-53.3732)">
            <circle cx="162.63" cy="161.548" r="24.058" style="fill:none;stroke:rgb(137,137,137);stroke-width:0.46px;stroke-linecap:round;"/>
        </g>
        <g transform="matrix(2.07833,0,0,2.07833,-247.795,-160.529)">
            <circle cx="162.63" cy="161.548" r="24.058" style="fill:none;stroke:rgb(137,137,137);stroke-width:0.29px;stroke-linecap:round;"/>
        </g>
        <g transform="matrix(0.321867,0,0,0.321867,94.7427,119.428)">
            <text x="174.49px" y="104.043px" style="font-family:'MicrosoftJhengHeiRegular', 'Microsoft JhengHei', sans-serif;font-size:31.069px;">小型選區 - 少於一萬人</text>
        </g>
        <g transform="matrix(0.321867,0,0,0.321867,94.0222,157.148)">
            <text x="174.49px" y="104.043px" style="font-family:'MicrosoftJhengHeiRegular', 'Microsoft JhengHei', sans-serif;font-size:31.069px;">中型選區 - 1萬-10萬人</text>
        </g>
        <g transform="matrix(0.321867,0,0,0.321867,94.0222,194.586)">
            <text x="174.49px" y="104.043px" style="font-family:'MicrosoftJhengHeiRegular', 'Microsoft JhengHei', sans-serif;font-size:31.069px;">大型選區 - 超過10萬人</text>
        </g>
        <g transform="matrix(1.29829,0,0,2.10462,47.0011,-128.609)">
            <path d="M114.145,108.7C114.145,108.305 113.626,107.985 112.986,107.985L57.323,107.985C56.683,107.985 56.164,108.305 56.164,108.7L56.164,110.131C56.164,110.526 56.683,110.846 57.323,110.846L112.986,110.846C113.626,110.846 114.145,110.526 114.145,110.131L114.145,108.7Z" style="fill:rgb(255,0,179);fill-opacity:0.2;"/>
        </g>
        <g transform="matrix(0.620594,0,0,0.620594,34.5286,32.4766)">
            <text x="80.058px" y="110.583px" style="font-family:'MicrosoftJhengHeiRegular', 'Microsoft JhengHei', sans-serif;font-size:29.288px;">該區選舉人數</text>
        </g>
        <g transform="matrix(0.620594,0,0,0.620594,52.1589,10.2232)">
            <text x="80.058px" y="110.583px" style="font-family:'MicrosoftJhengHeiBold', 'Microsoft JhengHei', sans-serif;font-weight:700;font-size:29.288px;">圓圈大小</text>
        </g>
    </g>
    <g id="colorLegend" transform="matrix(1.16667,0,0,1.16667,16,-28)">
        <g transform="matrix(0.615534,0,0,0.615534,209.265,33.4806)">
            <text x="80.058px" y="110.583px" style="font-family:'MicrosoftJhengHeiRegular', 'Microsoft JhengHei', sans-serif;font-size:29.568px;">該區投票率</text>
        </g>
        <g transform="matrix(0.615534,0,0,0.615534,218.133,10.9373)">
            <text x="80.058px" y="110.583px" style="font-family:'MicrosoftJhengHeiBold', 'Microsoft JhengHei', sans-serif;font-weight:700;font-size:29.568px;">顏色深淺</text>
        </g>
        <g transform="matrix(1,0,0,1,0,6.8029)">
            <rect x="249.429" y="146.59" width="111.147" height="12.108" style="fill:url(#_Linear1);stroke:rgb(78,78,86);stroke-opacity:0.25;stroke-width:0.6px;stroke-linecap:round;"/>
        </g>
        <g transform="matrix(1,0,0,0.76457,0,49.1024)">
            <path d="M249.429,152.199L249.429,180.838" style="fill:none;stroke:rgb(78,78,86);stroke-opacity:0.5;stroke-width:0.67px;"/>
        </g>
        <g transform="matrix(1,0,0,0.76457,0,48.7619)">
            <path d="M360.576,152.507L360.576,180.838" style="fill:none;stroke:rgb(78,78,86);stroke-opacity:0.5;stroke-width:0.67px;"/>
        </g>
        <g id="minVoteRate" transform="matrix(1,0,0,1,-9.56631,11.9384)">
            <text x="239.84px" y="189.745px" style="font-family:'MicrosoftJhengHeiRegular', 'Microsoft JhengHei', sans-serif;font-size:15.429px;">64.1%</text>
        </g>
        <g id="maxVoteRate" transform="matrix(1,0,0,1,101.596,11.9384)">
            <text x="239.84px" y="189.745px" style="font-family:'MicrosoftJhengHeiRegular', 'Microsoft JhengHei', sans-serif;font-size:15.429px;">92.2%</text>
        </g>
        <g transform="matrix(1,0,0,1,-17.1015,22.9129)">
            <text x="241.268px" y="192.179px" style="font-family:'MicrosoftJhengHeiRegular', 'Microsoft JhengHei', sans-serif;font-size:10.286px;">各區最小值*</text>
        </g>
        <g transform="matrix(1,0,0,1,94.0913,22.9129)">
            <text x="241.268px" y="192.179px" style="font-family:'MicrosoftJhengHeiRegular', 'Microsoft JhengHei', sans-serif;font-size:10.286px;">各區最大值*</text>
        </g>
        <g transform="matrix(0.966778,0,0,2.08746,239.855,-126.604)">
            <path d="M114.145,108.7C114.145,108.305 113.453,107.985 112.601,107.985L57.708,107.985C56.856,107.985 56.164,108.305 56.164,108.7L56.164,110.131C56.164,110.526 56.856,110.846 57.708,110.846L112.601,110.846C113.453,110.846 114.145,110.526 114.145,110.131L114.145,108.7Z" style="fill:rgb(255,0,179);fill-opacity:0.2;"/>
        </g>
    </g>
    <g id="arrowLegend" transform="matrix(1,0,0,1,12.3786,-28.3763)">
        <g id="arrowLegend1" serif:id="arrowLegend">
        </g>
        <g transform="matrix(1,0,0,1,-5.05212,-7.85886)">
            <g transform="matrix(1.16667,0,0,1.16667,-9.47057,15.6545)">
                <path d="M494.426,136.971L499.145,174.693L489.708,174.693L494.426,136.971Z" style="fill:rgb(39,39,39);"/>
            </g>
            <g transform="matrix(0.824958,0.824958,-0.824958,0.824958,303.594,-332.532)">
                <path d="M494.426,136.971L499.145,174.693L489.708,174.693L494.426,136.971Z" style="fill:rgb(39,39,39);fill-opacity:0.22;"/>
            </g>
            <g transform="matrix(0.446464,1.07786,-1.07786,0.446464,534.911,-391.453)">
                <path d="M494.426,136.971L499.145,174.693L489.708,174.693L494.426,136.971Z" style="fill:rgb(39,39,39);fill-opacity:0.22;"/>
            </g>
            <g transform="matrix(1.07786,0.446464,-0.446464,1.07786,112.432,-189.575)">
                <path d="M494.426,136.971L499.145,174.693L489.708,174.693L494.426,136.971Z" style="fill:rgb(39,39,39);fill-opacity:0.22;"/>
            </g>
            <g transform="matrix(0,1.16667,-1.16667,0,771.169,-357.368)">
                <path d="M494.426,136.971L499.145,174.693L489.708,174.693L494.426,136.971Z" style="fill:rgb(39,39,39);fill-opacity:0.22;"/>
            </g>
            <g transform="matrix(-0.502263,1.05302,-1.05302,-0.502263,999.647,-213.434)">
                <path d="M494.426,136.971L499.145,174.693L489.708,174.693L494.426,136.971Z" style="fill:rgb(39,39,39);fill-opacity:0.22;"/>
            </g>
            <g transform="matrix(-0.824958,0.824958,-0.824958,-0.824958,1119.36,-44.3033)">
                <path d="M494.426,136.971L499.145,174.693L489.708,174.693L494.426,136.971Z" style="fill:rgb(39,39,39);fill-opacity:0.22;"/>
            </g>
            <g transform="matrix(-1.07786,0.446464,-0.446464,-1.07786,1178.28,187.014)">
                <path d="M494.426,136.971L499.145,174.693L489.708,174.693L494.426,136.971Z" style="fill:rgb(39,39,39);fill-opacity:0.22;"/>
            </g>
            <g transform="matrix(-1.16667,1.29526e-16,-1.29526e-16,-1.16667,1144.19,423.272)">
                <path d="M494.426,136.971L499.145,174.693L489.708,174.693L494.426,136.971Z" style="fill:rgb(39,39,39);"/>
            </g>
            <g transform="matrix(0.557675,0,0,0.557675,441.487,64.6926)">
                <text x="80.058px" y="110.583px" style="font-family:'MicrosoftJhengHeiRegular', 'Microsoft JhengHei', sans-serif;font-size:38.075px;">該區韓國瑜支持率*</text>
            </g>
            <g transform="matrix(0.557675,0,0,0.557675,462.294,38.9417)">
                <text x="80.058px" y="110.583px" style="font-family:'MicrosoftJhengHeiBold', 'Microsoft JhengHei', sans-serif;font-weight:700;font-size:38.075px;">指針擺動角度</text>
            </g>
            <g transform="matrix(2.18441,0,0,2.44642,407.966,-140.333)">
                <path d="M114.145,108.7C114.145,108.305 113.786,107.985 113.344,107.985L56.965,107.985C56.523,107.985 56.164,108.305 56.164,108.7L56.164,110.131C56.164,110.526 56.523,110.846 56.965,110.846L113.344,110.846C113.786,110.846 114.145,110.526 114.145,110.131L114.145,108.7Z" style="fill:rgb(255,0,179);fill-opacity:0.2;"/>
            </g>
        </g>
        <g id="minSupportRate" transform="matrix(1.16667,0,0,1.16667,-21.3121,14.1282)">
            <text x="481.382px" y="129.411px" style="font-family:'MicrosoftJhengHeiRegular', 'Microsoft JhengHei', sans-serif;font-size:15.429px;">20.5%</text>
        </g>
        <g transform="matrix(1,0,0,1,9.05573,-0.479676)">
            <text x="526.636px" y="145.414px" style="font-family:'MicrosoftJhengHeiRegular', 'Microsoft JhengHei', sans-serif;font-size:12px;">各區最小值</text>
        </g>
        <g id="maxSupportRate" transform="matrix(1.16667,0,0,1.16667,-21.3121,119.236)">
            <text x="481.382px" y="129.411px" style="font-family:'MicrosoftJhengHeiRegular', 'Microsoft JhengHei', sans-serif;font-size:15.429px;">87.5%</text>
        </g>
        <g transform="matrix(1,0,0,1,9.05573,141.527)">
            <text x="526.636px" y="145.414px" style="font-family:'MicrosoftJhengHeiRegular', 'Microsoft JhengHei', sans-serif;font-size:12px;">各區最大值</text>
        </g>
    </g>
    <defs>
        <linearGradient id="_Linear1" x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse" gradientTransform="matrix(111.147,0,0,111.147,249.429,153.41)"><stop offset="0" style="stop-color:rgb(246,246,252);stop-opacity:1"/><stop offset="1" style="stop-color:rgb(221,0,143);stop-opacity:1"/></linearGradient>
    </defs>
  </svg>
</div>

<style>
  div {
		margin: 0 auto;
		max-width: 700px;
	}
</style>

