<template>
  <div class="page-error-500">
    <div class="wrapper">
      <div class="item-error-page">
        <div class="title">
          500
        </div>
        <div class="subtitle">
          哎呀～崩溃啦
        </div>
        <p>服务器内部错误</p>
        <router-link :to="{name: 'dashboard'}"
          class="btn">
          返回首页
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'page-erorr-500'
}
</script>

<style lang="scss" scoped>
.page-error-500 {
  background: -webkit-radial-gradient(circle, #3BC1D6, #269AAC);
  background: -moz-radial-gradient(circle, #3BC1D6, #269AAC);
  background: -ms-radial-gradient(circle, #3BC1D6, #269AAC);
  background: -o-radial-gradient(circle, #3BC1D6, #269AAC);
  background: radial-gradient(circle, #3BC1D6, #269AAC);
  overflow: hidden;

  .wrapper {
    padding: 0;
    margin: 0;
    height: calc(100vh + 0px);
    background:url(../../assets/img/500.png) no-repeat center bottom;
    background-size: 75%;
  }

  .item-error-page {
    width: 600px;
    margin: 0 auto;
    color: #fff;
    line-height: 1;
    text-align: center;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    display: flex;
  }

  .title{
    margin-top: 50px;
    font-weight: 700;
    letter-spacing: 16px;
    font-size: 180px;
    text-shadow: 6px 6px 10px rgba(0, 0, 0, 0.2);
    font-family: 'Russo One', sans-serif;
  }

  .subtitle {
    margin-top: 20px;
    margin-bottom: 20px;
    font-weight: 700;
    font-size: 25px;
    font-family: "Lato", sans-serif;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  }

  p {
    font-size: 14px;
  }

  .btn{
    margin: 30px 0;
    font-size: 20px;
    color: #43A6B0;
    border: 0px solid;
    border-bottom: 2px solid;
    border-color: #35939D;
    padding: 10px 40px;
    border-radius: 5px;
    display: inline-block;
    background: #fff;
    text-decoration: none;
    -webkit-transition: all 0.5s ease-in-out;
    -moz-transition: all 0.5s ease-in-out;
    -ms-transition: all 0.5s ease-in-out;
    -o-transition: all 0.5s ease-in-out;
    transition: all 0.5s ease-in-out;
  }

  .btn:hover{
    background: #43A6B0;
    color: #fff;
    text-decoration: none;
  }
}
</style>
