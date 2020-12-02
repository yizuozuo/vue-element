<template>
  <div class="page-error-404">
    <div class="wrapper">
      <div class="item-cloud">
        <span class="ca" />
        <span class="cb" />
        <span class="cc" />
      </div>

      <div class="item-error-page">
        <div class="title">
          404
        </div>
        <div class="clearfix" />
        <div class="pic" />
        <div class="info">
          <div class="subtitle">
            哎呀～很抱歉，您查看的页面找不到了
          </div>
          <ul>
            <li>&bull;&nbsp;您正在查看的页面无法浏览或已经不存在</li>
            <li>&bull;&nbsp;输入的地址不正确</li>
            <li>&bull;&nbsp;页面重定义或程序出错</li>
          </ul>
          <router-link :to="{ name: 'dashboard' }" class="btn">
            返回首页
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'page-erorr-404'
}
</script>

<style lang="scss" scoped>
.page-error-404 {
  .wrapper {
    height: calc(100vh + 0px);
    background: #377f54 url(../../assets/img/bg.png) repeat-x top center;
    position: relative;
  }

  .item-error-page {
    position: relative;
    width: 100%;
    padding: 0 15px;
    margin: auto;
    color: #fff;
  }

  @media (min-width: 576px) {
    .item-error-page {
      max-width: 540px;
    }
  }
  @media (min-width: 768px) {
    .item-error-page {
      max-width: 720px;
    }
  }
  @media (min-width: 992px) {
    .item-error-page {
      max-width: 960px;
    }
  }
  @media (min-width: 1200px) {
    .item-error-page {
      max-width: 1140px;
    }
  }

  .clearfix {
    clear: both;
  }

  .clearfix::after {
    display: block;
    clear: both;
    content: '';
  }

  .title {
    width: 650px;
    float: right;
    font-size: 220px;
    font-weight: 700;
    letter-spacing: 8px;
    text-shadow: 10px 10px 20px rgba(0, 0, 0, 0.2);
    font-family: 'Russo One', sans-serif;
  }

  .pic {
    background: url('../../assets/img/500.png') no-repeat;
    background-size: 100%;
    width: 440px;
    height: 440px;
    float: left;
    margin: 0px 50px 50px 0;
    position: relative;
  }
  .info {
    position: relative;
    z-index: 999;
  }
  .subtitle {
    font-weight: 700;
    font-size: 25px;
    margin: 15px 0;
    font-family: 'Lato', sans-serif;
    text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.2);
  }
  .info ul li {
    font-size: 13px;
    line-height: 2;
    list-style: none;
  }
  .btn {
    margin: 30px 0;
    font-size: 20px;
    color: #43a6b0;
    border: 0px solid;
    border-bottom: 2px solid;
    border-color: #35939d;
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
  .btn:hover {
    background: #43a6b0;
    color: #fff;
    text-decoration: none;
  }
  .item-cloud {
    position: relative;
  }
  .item-cloud span {
    display: inline-block;
    position: absolute;
    -webkit-animation: 100s 0s linear infinite;
    -moz-animation: 100s 0s linear infinite;
    -o-animation: 100s 0s linear infinite;
    -ms-animation: 100s 0s linear infinite;
    animation: 100s 0s linear infinite;
  }
  .item-cloud span.ca {
    background: url(../../assets/img/cloud1.png) no-repeat;
    background-size: 100%;
    width: 43px;
    height: 22px;
    -webkit-animation-name: cloud1;
    -moz-animation-name: cloud1;
    -o-animation-name: cloud1;
    -ms-animation-name: cloud1;
    animation-name: cloud1;
  }
  .item-cloud span.cb {
    background: url(../../assets/img/cloud2.png) no-repeat;
    background-size: 100%;
    width: 25px;
    height: 13px;
    -webkit-animation-name: cloud2;
    -moz-animation-name: cloud2;
    -o-animation-name: cloud2;
    -ms-animation-name: cloud2;
    animation-name: cloud2;
  }
  .item-cloud span.cc {
    background: url(../../assets/img/cloud3.png) no-repeat;
    background-size: 100%;
    width: 54px;
    height: 27px;
    -webkit-animation-name: cloud3;
    -moz-animation-name: cloud3;
    -o-animation-name: cloud3;
    -ms-animation-name: cloud3;
    animation-name: cloud3;
  }
  @-webkit-keyframes cloud1 {
    0% {
      left: 30px;
      top: 5px;
      opacity: 0.3;
    }
    50% {
      opacity: 0.7;
    }
    100% {
      left: 90%;
      top: 5px;
      opacity: 0.1;
    }
  }
  @-moz-keyframes cloud1 {
    0% {
      left: 30px;
      top: 5px;
      opacity: 0.3;
    }
    50% {
      opacity: 0.7;
    }
    100% {
      left: 90%;
      top: 5px;
      opacity: 0.1;
    }
  }
  @-o-keyframes cloud1 {
    0% {
      left: 30px;
      top: 5px;
      opacity: 0.3;
    }
    50% {
      opacity: 0.7;
    }
    100% {
      left: 90%;
      top: 5px;
      opacity: 0.1;
    }
  }
  @-ms-keyframes cloud1 {
    0% {
      left: 30px;
      top: 5px;
      opacity: 0.3;
    }
    50% {
      opacity: 0.7;
    }
    100% {
      left: 90%;
      top: 5px;
      opacity: 0.1;
    }
  }
  @keyframes cloud1 {
    0% {
      left: 30px;
      top: 5px;
      opacity: 0.3;
    }
    50% {
      opacity: 0.7;
    }
    100% {
      left: 90%;
      top: 5px;
      opacity: 0.1;
    }
  }
  @-webkit-keyframes cloud2 {
    0% {
      left: 300px;
      top: 10px;
      opacity: 0.5;
    }
    100% {
      left: 90%;
      top: 10px;
      opacity: 0;
    }
  }
  @-moz-keyframes cloud2 {
    0% {
      left: 300px;
      top: 10px;
      opacity: 0.5;
    }
    100% {
      left: 90%;
      top: 10px;
      opacity: 0;
    }
  }
  @-o-keyframes cloud2 {
    0% {
      left: 300px;
      top: 10px;
      opacity: 0.5;
    }
    100% {
      left: 90%;
      top: 10px;
      opacity: 0;
    }
  }
  @-ms-keyframes cloud2 {
    0% {
      left: 300px;
      top: 10px;
      opacity: 0.5;
    }
    100% {
      left: 90%;
      top: 10px;
      opacity: 0;
    }
  }
  @keyframes cloud2 {
    0% {
      left: 50%;
      top: 10px;
      opacity: 0.5;
    }
    100% {
      left: 90%;
      top: 10px;
      opacity: 0;
    }
  }
  @-webkit-keyframes cloud3 {
    0% {
      left: 80%;
      top: 30px;
      opacity: 0.2;
    }
    50% {
      opacity: 0.6;
    }
    100% {
      left: 0;
      top: 30px;
      opacity: 0;
    }
  }
  @-moz-keyframes cloud3 {
    0% {
      left: 80%;
      top: 30px;
      opacity: 0.2;
    }
    50% {
      opacity: 0.6;
    }
    100% {
      left: 0;
      top: 30px;
      opacity: 0;
    }
  }
  @-o-keyframes cloud3 {
    0% {
      left: 80%;
      top: 30px;
      opacity: 0.2;
    }
    50% {
      opacity: 0.6;
    }
    100% {
      left: 0;
      top: 30px;
      opacity: 0;
    }
  }
  @-ms-keyframes cloud3 {
    0% {
      left: 80%;
      top: 30px;
      opacity: 0.2;
    }
    50% {
      opacity: 0.6;
    }
    100% {
      left: 0;
      top: 30px;
      opacity: 0;
    }
  }
  @keyframes cloud3 {
    0% {
      left: 80%;
      top: 30px;
      opacity: 0.2;
    }
    50% {
      opacity: 0.6;
    }
    100% {
      left: 0;
      top: 30px;
      opacity: 0;
    }
  }
}
</style>
