<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="configs"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="配置名称" width="200">
        <template slot-scope="scope">{{ scope.row }}</template>
      </el-table-column>

      <el-table-column align="center" label="编辑配置" width="200">
        <template slot-scope="scope">
          <router-link
            :to="{ name: 'ConfigEdit', params: { filename: scope.row } }"
            >编辑配置
          </router-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/config'

export default {
  data() {
    return {
      configs: null,
      listLoading: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.configs = response.data.configs
        this.listLoading = false
      })
    }
  }
}
</script>

<style></style>
