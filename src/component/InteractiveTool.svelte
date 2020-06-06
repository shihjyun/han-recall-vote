<script>
  import { onMount } from "svelte";
  import { highlightedTown } from "../stores/InteractiveParameter.js";
  import { recallTownData } from "../stores/RecallData.js";
  import Select from 'svelte-select';

  // the values need to show on interactive component
  let supportRate18, supportRate20, supportRateRecall

  // select box setting
  let inputStyles = 'border-color: #E42F8C; border-style: solid; border-width: 0 0 2px 0;'
  let townsList = $recallTownData.map(({ TOWNNAME }) => ({ value: TOWNNAME, label: TOWNNAME }))
  console.log(townsList)


  let selectedValue = 'OO區';

  // the parameters need to send to stores
  const handleSelectedTown = (e) => {
    highlightedTown.update(d => {
            return e.detail.value;
        });
  }

  
</script>


<div class="interactive-panel">
  <div class="slope-highlighter">
    <p>高雄市</p>
    <div class="select-theme">
      <Select items={townsList} 
              isSearchable={false}
              {inputStyles}
              isClearable={false}
              {selectedValue}
              on:select="{(e) => handleSelectedTown(e)}">
              </Select>
    </div>
    <p>在三次投票中對韓國瑜的支持率變化</p>
  </div>

  
</div>

<style>
p{
  display: inline-block;
  font-size: 1 em;
  font-family: 'Noto Sans TC';
}
.select-theme{
  font-family: 'Noto Sans TC';
  margin: 0;
  --itemPadding: 0;
  --inputFontSize: 1 em;
  --height: 1 em;
  --inputPadding: 0;
  --borderRadius: 0;
  --selectedItemPadding: 0;
  --indicatorWidth: 0px;
  --border: 0;
  display: inline-block;
}

.select-theme :global(.selectContainer),
.select-theme :global(.selectContainer input){
  --padding: 1px 1px;
}
</style>
