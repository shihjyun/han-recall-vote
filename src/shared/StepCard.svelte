<script>
  export let content;
  export let stepId;
</script>


<div class="step" data-step={stepId}>
  <p>{@html content}</p>
</div>

<style>
  .step{
    z-index: 1;
    display: flex;
    width: 60%;
    height: 100vh;
    margin: 0 auto;
    align-items: center;
    border-block-color: black;
  }

  p{
    z-index: 10;
    display: block;
    word-wrap:break-word;
    margin: 0 auto;
    padding: 0.8rem;
    height: auto;
    font-family: 'Noto Sans TC';
    border: #938585 1px solid;
    background: rgba(247, 247, 247, 0.9);
    -webkit-transform: translate3d(0,0,0);
  }

  @media screen and (max-width: 1023px) {
  p{
    font-size: 0.8rem;
  }
}
</style>

