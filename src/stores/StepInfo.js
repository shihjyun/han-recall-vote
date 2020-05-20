import { readable } from "svelte/store";

export const stepInfo = readable([
  {
    step: 1,
    content: '這是第一步 這是第一步 這是第一步 這是第一步 這是第一步 這是第一步'
  },
  {
    step: 2,
    content: '這是第二步 這是第二步 這是第二步 這是第二步 這是第二步 這是第二步'
  }
]);