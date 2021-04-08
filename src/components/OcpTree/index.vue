<template>
  <el-card shadow="never" class="tree-management-container"
           :body-style="{ maxHeight: 'calc(100vh - 170px)', minHeight: 'calc(100vh - 170px)', padding: 10}">
    <el-input v-if="searchable" v-model="filterText" :placeholder="searchInputPlaceholder"/>
    <el-tree ref="tree" class="tree" :data="elTreeData" :props="treeProps"
             :filter-node-method="filterNode" :expand-on-click-node="false" default-expand-all highlight-current>
      <span class="tree-node" slot-scope="{ node, data }">
        <span class="label" @click="handleNodeClick(node, data)"
              @contextmenu.prevent="handleNodeContextMenu($event, node)">{{ node.label }}</span>
      </span>
    </el-tree>
    <vue-context ref="menu" v-slot="{ data }" class="menu">
      <li v-if="showAppendButton(data)">
        <a href="#" @click.prevent="handleClickAppend($event, data)" class="green-label">
          <span>增加下级</span>
        </a>
      </li>
      <li v-if="showEditAndDeleteButton(data)">
        <a href="#" @click.prevent="handleClickEdit($event, data)" class="green-label">
          <span>编辑</span>
        </a>
      </li>
      <li v-if="showEditAndDeleteButton(data)">
        <div class="divider"/>
        <a href="#" @click.prevent="handleClickDelete($event, data)" class="red-label">
          <span>删除</span>
        </a>
      </li>
    </vue-context>
  </el-card>
</template>

<script>
import VueContext from 'vue-context'

export default {
  name: 'OcpTree',
  props: {
    data: {
      type: Array,
      required: true
    },
    treeProps: {
      type: Object,
      required: true,
      validator: function (value) {
        const treePropsKeys = ['parent', 'value', 'label', 'children']
        for (const key of treePropsKeys) {
          if (!Object.keys(value).includes(key)) {
            return false
          }
        }
        return true
      }
    },
    searchable: {
      type: Boolean,
      required: false,
      default: false
    },
    rootEditable: {
      type: Boolean,
      required: false,
      default: false
    },
    editable: {
      type: Boolean,
      required: false,
      default: false
    },
    maxLevel: {
      type: Number,
      required: false,
      default: Number.MAX_VALUE
    },
    searchInputPlaceholder: {
      type: String,
      required: false,
      default: '请输入名称'
    },
    sortable: {
      type: Boolean,
      required: false,
      default: false
    },
    sortableField: {
      type: String,
      required: false,
      default: 'sort'
    }
  },
  components: {
    VueContext
  },
  watch: {
    data: {
      handler: function (value) {
        if (!value) {
          console.warn('Data 为空！组件 OcpTree 期望非空的数据')
          return
        }
        if (this.sortable) {
          this.elTreeData = this.sortData(JSON.parse(JSON.stringify(value)))
        } else {
          this.elTreeData = value
        }
      },
      deep: true
    },
    filterText (value) {
      this.$refs.tree.filter(value)
    }
  },
  data: () => {
    return {
      filterText: null,
      elTreeData: null
    }
  },
  methods: {
    filterNode (value, data) {
      if (!value) {
        return true
      }
      return data[this.treeProps.label].indexOf(value) !== -1
    },
    showAppendButton (node) {
      return node && node.level < this.maxLevel
    },
    showEditAndDeleteButton (node) {
      if (this.rootEditable) {
        return true
      }
      return node && node.level !== 1
    },
    handleNodeClick (node, data) {
      if (this.showAppendButton(node)) {
        this.$emit('node-click', data)
      }
      this.$refs.menu.close()
    },
    handleClickAppend (event, node) {
      this.$emit('append-click', node, node.data)
    },
    handleClickEdit (event, node) {
      this.$emit('edit-click', node, node.data)
    },
    handleClickDelete (event, node) {
      this.$emit('delete-click', node, node.data)
    },
    handleNodeContextMenu (event, node) {
      this.$refs.menu.open(event, node)
    },
    sortData (array) {
      for (const element of array) {
        if (!element[this.treeProps.children].length > 0) {
          continue
        }
        element[this.treeProps.children].sort(function (a, b) {
          return a.sort - b.sort
        })
        this.sortData(element[this.treeProps.children])
      }
      return array
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/styles/variables.scss";
@import '~vue-context/dist/css/vue-context.css';

.tree-management-container {
  text-align: left;
  background-color: #fff;
  border-radius: 5px;
  overflow: auto;

  .tree {
    margin-top: 20px;
    min-width: 250px;
    max-height: calc(100vh - 230px);
    min-height: calc(100vh - 230px);
    overflow: auto;

    .tree-node {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      padding-right: 8px;

      .label {
        max-width: 90px;
      }

      .operation-area {
        max-width: 122px;
      }
    }
  }

  .menu {
    font-size: 14px;

    .divider {
      display: block;
      height: 1px;
      margin: 0 10px;
      background-color: #DCDFE6;
    }

    .green-label {
      color: $--color-primary
    }

    .red-label {
      color: $--color-danger;
    }
  }
}
</style>
