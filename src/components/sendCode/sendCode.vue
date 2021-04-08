<template>
     <div :class="[{'send-dynamic-pwd-btn-active': phone.length === 11},'send-dynamic-pwd-btn']" @click="phone.length === 11 ? sendCode() : ''">
        <span v-if="isClick" class="send-dynamic-pwd-label">获取验证码</span>
        <span v-else class="count-down-label">{{ remainingSeconds }}S后重新发送</span>
     </div>
</template>
<script>
export default {
  name: 'del-send-code',
  data () {
    return {
      // 是否是可点击状态
      isClick: true,
      // 剩余秒数
      remainingSeconds: 60
      // phone长度小于11时候不可以点击
    }
  },
  props: {
    // 发送验证码的手机号
    phone: {
      type: String,
      default: ''
    },
    // 倒计时结束后调用的方法
    countDownMethod: {
      type: Function,
      default () {
        return () => {}
      }
    }
  },
  mounted () {

  },
  methods: {
    /**
        * @func
        * @desc 发送验证码
        */
    sendCode () {
      if (this.isClick) { // 可点击状态 发送验证码
        if (!(/^1\d{10}$/.test(this.phone))) {
          this.$message('手机号不合法')
          return
        }
        // 调用父级的方法
        this.countDownMethod()
      } else {   // 不可点击状态

      }
    },
    /**
        * @func
        * @desc 倒计时方法
        */
    countDown () {
      this.isClick = false
      let remainingSeconds = this.remainingSeconds
      const interval = setInterval(() => {
        remainingSeconds--
        this.remainingSeconds = remainingSeconds
        if (remainingSeconds <= 0) {
          clearInterval(interval)
          this.isClick = true
          this.remainingSeconds = 60
        }
      }, 1000)
    }
  }
}
</script>
<style lang='scss' scoped>
    .send-dynamic-pwd-btn {
        background: rgb(217,221,222);
        text-align: center;
        color: white;
        border-radius: 4px;
        line-height: initial;
        padding: 5px 10px;
        cursor: pointer;
    }
    .send-dynamic-pwd-btn-active{
        background: #64a998;
    }
    .send-dynamic-pwd-label {
        font-size: 12px;
    }
    .count-down-label {
        font-size: 14px;
    }
</style>
