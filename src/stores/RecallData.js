import { readable } from "svelte/store";



export const gridSettingValue = readable({
  小港區:{x:2,y:10},
  鹽埕區:{x:6,y:4},
  新興區:{x:4,y:7},
  前金區:{x:7,y:4},
  前鎮區:{x:7,y:5},
  楠梓區:{x:6,y:3},
  鳳山區:{x:6,y:6},
  大寮區:{x:7,y:7},
  大樹區:{x:8,y:4},
  大社區:{x:4,y:6},
  仁武區:{x:7,y:3},
  鳥松區:{x:5,y:6},
  岡山區:{x:5,y:4},
  橋頭區:{x:2,y:7},
  燕巢區:{x:5,y:5},
  田寮區:{x:3,y:6},
  阿蓮區:{x:5,y:3},
  路竹區:{x:1,y:7},
  湖內區:{x:6,y:2},
  旗山區:{x:3,y:7},
  美濃區:{x:8,y:3},
  六龜區:{x:8,y:2},
  甲仙區:{x:7,y:2},
  杉林區:{x:8,y:1},
  內門區:{x:4,y:5},
  茂林區:{x:7,y:6},
  桃源區:{x:9,y:1},
  那瑪夏區:{x:9,y:0},
  林園區:{x:2,y:11},
  茄萣區:{x:7,y:1},
  永安區:{x:0,y:7},
  彌陀區:{x:0,y:8},
  梓官區:{x:1,y:8},
  苓雅區:{x:2,y:9},
  三民區:{x:6,y:5},
  旗津區:{x:1,y:10},
  鼓山區:{x:2,y:8},
  左營區:{x:1,y:9}
});


export const  kaoGeoData = readable(
  async function() {
   const response = await fetch("./static/data/kao_town_merge.geojson")
   return await response.json()
  }())