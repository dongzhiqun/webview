<template>
  <div class="app-home-footer" >
      <div class="common-foot-nav">
          <ul>
              <li>关于我们</li>
              <li>法律声明</li>
              <li>隐私政策</li>
              <li>廉政举报</li>
              <li>联系我们</li>
              <li>加入我们</li>
          </ul>
      </div>
      <!-- <div>© 2020-2030 XXXyun.com 版权所有 ICP证：XXXX</div>
      <div>XX网安备 XXX号</div> -->
  </div>
</template>
<script>
</script>
<style lang='scss' scoped>
.app-home-footer{
  width: 100%;
  height: 40px;
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: white;
  .common-foot-nav{
    width: 400px;
    ul{
      display: flex;
      justify-content: space-between;
      align-items: center;
      list-style: none;
      padding: 0;
      margin: 0;
    }
  }
}
</style>
