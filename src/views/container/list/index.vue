<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="containers"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="容器名称" width="200">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column align="center" label="容器id" width="200">
        <template slot-scope="scope">{{ scope.row.container_id }}</template>
      </el-table-column>
      <el-table-column align="center" label="虚拟网卡" width="200">
        <template slot-scope="scope">{{ scope.row.interface }}</template>
      </el-table-column>
      <el-table-column align="center" label="ip地址" width="200">
        <template slot-scope="scope">{{ scope.row.ip }}</template>
      </el-table-column>
      <el-table-column label="速率限制">
        <template slot-scope="scope">
          <el-input v-model="scope.row.limit" />
        </template>
      </el-table-column>
      <el-table-column label="优先级">
        <template slot-scope="scope">
          <el-input v-model="scope.row.prio" />
        </template>
      </el-table-column>
      <el-table-column label="目的地容器IP地址">
        <template slot-scope="scope">
          <el-input v-model="scope.row.dst_ip" />
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button
            type="success"
            @click="apply_simple(scope.row.container_id, scope.row.dst_ip, scope.row.limit, scope.row.prio)"
          >应用规则</el-button>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button type="danger" @click="reset_simple(scope.row.container_id)">重置</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/container'
import { applySimpleTest, resetSimpleTest } from '@/api/test'
import { applySimple, resetSimple } from '@/api/apply'

export default {
  data() {
    return {
      containers: [],
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        console.log(response.data)
        this.containers = response.data
        this.listLoading = false
      })
    },
    apply_simple(container, dst_ip, limit, prio) {
      console.log(container, dst_ip, limit, prio)
      applySimple(container, dst_ip, limit, prio).then(response => {
        console.log(response.data)
      })
    },
    reset_simple(container) {
      console.log(container)
      resetSimple(container).then(response => {
        console.log(response.data)
      })
    },
    apply_test_simple() {
      applySimpleTest()
    },
    reset_test_simple() {
      resetSimpleTest()
    }
  }
}
</script>

<style>
</style>
