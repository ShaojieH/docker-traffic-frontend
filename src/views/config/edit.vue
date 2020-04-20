<template>
  <div class="app-container">
    <el-form ref="config" :model="config" label-width="120px">
      <el-form-item label="worker数量">
        <el-col :span="3">
          <el-input v-model.number="config.worker" type="number" />
        </el-col>
      </el-form-item>
      <el-form-item label="流量速率规则">
        <el-row v-for="(limit, index) in config.speed_limit" :key="index">
          <el-form-item>
            <el-col :span="2" class="line">起始容器</el-col>
            <el-col :span="4">
              <el-select
                v-model="config.speed_limit[index].from_container"
                placeholder="选择容器"
              >
                <el-option
                  v-for="(container, index_container) in containers"
                  :key="index_container"
                  :label="container"
                  :value="container"
                />
              </el-select>
            </el-col>
            <el-col :span="2" class="line">目的地容器</el-col>
            <el-col :span="4">
              <el-select
                v-model="config.speed_limit[index].to_container"
                placeholder="选择容器"
              >
                <el-option
                  v-for="(container, index_container) in containers"
                  :key="index_container"
                  :label="container"
                  :value="container"
                />
              </el-select>
            </el-col>
            <el-col :span="2" class="line">速率限制</el-col>
            <el-col :span="3">
              <el-input
                v-model.number="config.speed_limit[index].limit"
                type="number"
              />
            </el-col>
            <el-button type="danger" @click="remove(index)">删除</el-button>
          </el-form-item>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="add">添加速率规则</el-button>
      </el-form-item>

      <el-form-item>
        <el-button type="success" @click="apply">应用规则</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getConfig } from '@/api/config'
import { safeLoad } from 'js-yaml'
export default {
  props: {
    filename: {
      type: String,
      required: true,
      default: 'test.yml'
    }
  },
  data() {
    return {
      config: {}
    }
  },
  computed: {
    containers() {
      var list = ['master']
      for (const x of this.range(this.config.worker, 1)) {
        list.push('worker_' + x)
      }
      return list
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getConfig(this.filename).then(response => {
        this.config = safeLoad(response.data)
        console.log(this.config)
      })
    },
    range(size, startAt = 1) {
      const result = [...Array(size).keys()].map(i => i + startAt)
      return result
    },
    remove(index) {
      this.config.speed_limit.splice(index, 1)
    },
    add() {
      this.config.speed_limit.push({})
    },
    apply() {}
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
</style>
