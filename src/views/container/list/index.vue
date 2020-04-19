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
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/container'

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
    }
  }
}
</script>

<style>
</style>
