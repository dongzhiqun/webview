<template>
  <div class="edit-progess-box">
      <div :class="[now == '0' || now == '1' || now == '2' ? 'active' : '']">
        <div>1</div>
        <span>验证身份</span>
      </div>
      <div :class="[now == '1' || now == '2' ? 'active' : '']">
        <div>2</div>
        <span>{{isphone == '0'?'修改密码':'修改手机号'}}</span>
      </div>
      <div :class="[now == '2' ? 'active' : '']">
        <div>3</div>
        <span>完成</span>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    now: {
      type: String,
      default: ''
    },
    isphone: {
      type: String,
      default: ''
    }
  }

}
</script>

<style lang='scss' scoped>
.edit-progess-box{
  width: 800px;
  margin: 10px auto 0;
  display: flex;
  justify-content: space-between;
  color: #BFBFBF;
  .active{
    div{
      background-color: #64A998;
    }
    span{
      color: #595959;
    }
  }
  >div{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    div{
      position: relative;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: #C9EBE3;
      text-align: center;
      line-height: 40px;
      color: white;
    }
    div::after{
      content: '';
      position: absolute;
      top: 20px;
      right: -330px;
      height: 1px;
      background-color: #979797;
      width: 320px;
    }
    span{
      margin: 10px 0 0 0;
    }
  }
  >div:nth-child(3) div::after{
    display: none;
  }
  >div:nth-child(2) div::after{
    right: -320px;
    width: 310px;
  }
}
</style>
