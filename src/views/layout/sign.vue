<template>
  <div class="sign-layout">
    <div class="left">
      <div class="wellcome">
        Welcome
      </div>
    </div>

    <div class="right">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'sign-layout',
}
</script>

<style lang="scss">
.is-mobile .sign-layout {
  .left {
    display: none;
  }

  .right {
    width: 100% !important;
  }
}
</style>

<style lang="scss" scoped>
.sign-layout {
  display: flex;

  .left {
    width: 580px;
    min-height: 520px;
    background-image: url(../../assets/img/500.png);
    background-position: bottom center;
    background-repeat: no-repeat;
    background-size: cover;

    .wellcome {
      font-size: 48px;
      color: #555555;
      padding-left: 118px;
      padding-top: 60px;
    }
  }

  .right {
    width: 420px;
    background-color: #fff;
  }
}
</style>