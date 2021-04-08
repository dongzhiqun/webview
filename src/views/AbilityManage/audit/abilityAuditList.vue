<template>
  <div class="caplist-container">
  </div>
</template>
<script>
export default {
  name: 'abilityAuditList',
  data () {
    return {
    }
  },
  mounted () { }
}
</script>
<style>
.caplist-container {
  display: inline-block;
  width: 100%;
  min-height: calc(100vh - 100px);
  box-sizing: border-box;
  text-align: left;
  border-radius: 5px;
  padding: 20px 20px;
  overflow: auto;
}

.toola-container {
  height: 62px;
  text-align: left;
  background-color: #fff;
  border-radius: 5px;
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: 20px;
  overflow: auto;
}

.lista-container {
  min-height: calc(100vh - 181px);
  text-align: left;
  background-color: #fff;
  border-radius: 5px;
  padding: 20px 20px;
  overflow: auto;
}
</style>
