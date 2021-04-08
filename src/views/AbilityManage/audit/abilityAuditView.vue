<template>
  <div>
    <abilityAuditList v-if="showDetail === 'list'"
                      @switchView='switchView' />
    <abilityDetail @showTotal='showTotal'
                       :rowData='selectRow'
                       v-if="showDetail === 'detail'" />
  </div>
</template>
<script>
import abilityAuditList from './abilityAuditList'
import abilityDetail from '../abilityDetail'
export default {
  name: 'abilityAuditView',
  components: {
    abilityDetail,
    abilityAuditList
  },
  data () {
    return {
      showDetail: 'list',
      selectRow: null
    }
  },
  mounted () {
  },
  methods: {
    switchView (rowData) {
      this.selectRow = rowData
      this.showDetail = 'detail'
    },
    showTotal () {
      this.showDetail = 'list'
    }
  }
}
</script>
