<script>
  // your script goes here
</script>

<footer>
    <div class="grid">
      <p>製作：Steven Yeo</p>
      <p>資料來源：中選會</p>
      <div class="github">
        <a href="https://github.com/shihjyun/han-recall-vote"><img src="./static/images/mark-github.svg" alt="github"></a>
      </div>
    </div>
  </footer>

<style>
    .grid{
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 10px;
    }
    footer{
      padding: 30px 20px;
      background-color: rgba(241, 168, 226, 0.2);
    }
    footer p{
      font-family: 'Noto Sans TC';
      grid-column: 1/8;
      font-size: 0.8em;
      margin: 0 auto;
    }
    footer .github{
      width: 100%;
      grid-column: 4/5;
    }
    footer img{
      width: 20px;
    }
</style>