<template>
  <div>
    <abilityAllList v-if="showDetail === 'list'" @switchView='switchView' @handleEdit='handleEdit'/>
    <abilityDetail @showTotal='showTotal'
                       :rowData='selectRow'
                       v-if="showDetail === 'detail'" />
    <abilityEdit @showTotal='showTotal'
                       :rowData='selectRow'
                       v-if="showDetail === 'edit'" />
  </div>
</template>
<script>
import abilityAllList from './abilityAllList'
import abilityDetail from '../abilityDetail'
import abilityEdit from '../abilityEdit'
export default {
  name: 'abilityAllView',
  components: {
    abilityDetail,
    abilityAllList,
    abilityEdit
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
    handleEdit (rowData) {
      this.selectRow = rowData
      this.showDetail = 'edit'
    },
    showTotal () {
      this.showDetail = 'list'
    }
  }
}
</script>
