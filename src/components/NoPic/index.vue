<template>
  <div class="noPicWrap">
    <div class="noPicImg"></div>
    <div>暂无图片</div>
  </div>
</template>
<script>
export default {
  name: 'NoPic'
}
</script>
<style lang="scss" scoped>
.noPicWrap {
  display: inline-block;
  vertical-align: text-top;
  width: 260px;
  height: 150px;
  text-align: center;
  background-color: #f5f5f5;
  color: #595959;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 10px 10px;
  margin-bottom: 5px;
  .noPicImg {
    content: "";
    background: url("../../assets/noPic_img.png") no-repeat;
    display: block;
    width: 240px;
    height: 95px;
    background-position: center center;
    background-size: 36% 85%;
    text-align: center;
  }
  &:last-child {
    text-align: center;
  }
}
</style>
