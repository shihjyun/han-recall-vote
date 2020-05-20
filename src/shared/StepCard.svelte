<script>
  export let content;
  export let stepId;
</script>


<div class="step" data-step={stepId}>
  <p>{content}</p>
</div>

<style>
  .step{
    display: flex;
    width: 60%;
    height: 100vh;
    max-width: 720px;
    margin: 0 auto;
    align-items: center;
  }

  p{
    display: block;
    padding: 1rem;
    height: auto;
    box-shadow: 0px 2px 4px rgba(0,0,0,0.1);
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.842);
  }
</style>

