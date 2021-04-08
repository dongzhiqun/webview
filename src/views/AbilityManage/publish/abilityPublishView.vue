<template>
  <div>
    <abilityPublishList v-if="!showDetail"
                      @switchView='switchView' />
    <abilityDetail @showTotal='showTotal'
                       :rowData='selectRow'
                       v-else />
  </div>
</template>
<script>
import abilityPublishList from './abilityPublishList'
import abilityDetail from '../abilityDetail'
export default {
  name: 'abilityPublishView',
  components: {
    abilityDetail,
    abilityPublishList
  },
  data () {
    return {
      showDetail: false,
      selectRow: null
    }
  },
  mounted () {
  },
  methods: {
    switchView (rowData) {
      this.selectRow = rowData
      this.showDetail = true
    },
    showTotal () {
      this.showDetail = false
    }
  }
}
</script>
