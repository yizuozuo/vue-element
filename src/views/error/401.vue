<template>
  <div class="page-container">
    <div class="svg-icon">
      禁止
    </div>
    <div class="desc">
      <div class="oops">
        OOPS!
      </div>
      <div class="tip">
        这个页面您没有访问权限...
      </div>
      <div class="countdown">
        {{ second }}秒后返回首页
      </div>
    </div>
  </div>
</template>

<script>
const interval = 5
export default {
  name: 'page401',
  data() {
    return {
      second: interval,
      isCountDown: false,
      timer: null
    }
  },

  methods: {
    goToHome() {
      this.isCountDown = false
      this.clearTimer()
      this.$router.push({'path': '/'})
    },

    startTimer() {
      if (this.isCountDown) {
        return
      }

      this.second = interval
      this.isCountDown = true

      this.timer = setInterval(() => {
        if (this.second > 1) {
          this.second--
        } else {
          this.goToHome()
        }
      }, 1000)
    },

    clearTimer() {
      if (this.timer) clearInterval(this.timer)
      this.isCountDown = false
    }
  },

  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.second = interval
      vm.$nextTick(() => {
        vm.startTimer()
      })
    })
  },

  beforeRouteLeave (to, from, next) {
    next(vm => {
      vm.clearTimer()
    })
  }
}
</script>

<style lang="scss" scoped>
.page-container{
  background:#fff;
  height:100%;
  text-align: center;
  padding-top: 50px;
  display: flex;
  align-items: center;
  flex-direction: column;

  .svg-icon{
    width: 100px;
    height: 100px;
    line-height: 100px;
    font-size: 50px;
    color: #fff;
    background-color: #ec5956;
  }

  .desc{
    padding-top: 25px;
    line-height: 32px;
    text-align: center;

    .oops {
      font-weight: bold;
      color:#384369;
    }

    .tip {
      color: #7585be;
    }

    .countdown {
      text-align: center;
    }
  }
}
</style>
