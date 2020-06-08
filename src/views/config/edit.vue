/* eslint-disable vue/html-indent */
<template>
  <div class="app-container">
    <el-form ref="config" :model="config" label-width="120px">
      <el-form-item label="worker数量">
        <el-col :span="3">
          <el-input v-model.number="config.worker" type="number" />
        </el-col>
      </el-form-item>
      <div v-for="(rule, index) in config.rules" :key="index">
        <el-form-item label="根节点">
          <el-col :span="3">
            <el-select v-model="rule.root">
              <el-option
                v-for="(container, index_container) in containers"
                :key="index_container"
                :label="container"
                :value="container"
              />
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-button type="danger" @click="remove_rule(index)"
              >删除</el-button
            >
          </el-col>
        </el-form-item>
        <el-form-item label="分组">
          <el-row
            v-for="(group, index_group) in rule.groups"
            :key="index_group"
          >
            <el-col :span="4">
              <el-form-item label="父节点">
                <el-select v-model="group.parent">
                  <el-option
                    v-for="(parent, index_parent) in parents(rule)"
                    :key="index_parent"
                    :label="parent"
                    :value="parent"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-checkbox-group v-model="group.children" :label="group.name">
              <el-col :span="2" class="line">{{ group.name }}</el-col>
              <el-checkbox
                v-for="(container, index_container) in containers"
                :key="index_container"
                :label="container"
              />
              <el-button type="danger" @click="remove_group(rule, index_group)"
                >删除</el-button
              >
            </el-checkbox-group>
          </el-row>
        </el-form-item>
        <el-form-item label="流量速率规则">
          <el-row
            v-for="(limit, index_limit) in rule.speed_limits"
            :key="index_limit"
          >
            <el-form-item>
              <el-col :span="2" class="line">起始容器</el-col>
              <el-col :span="4">
                <el-select
                  v-model="rule.speed_limits[index_limit].from_container"
                  placeholder="选择容器"
                >
                  <el-option
                    v-for="(container,
                    index_container) in containers_and_groups(rule)"
                    :key="index_container"
                    :label="container"
                    :value="container"
                  />
                </el-select>
              </el-col>
              <el-col :span="2" class="line">目的地容器</el-col>
              <el-col :span="4">
                <el-select
                  v-model="rule.speed_limits[index_limit].to_container"
                  placeholder="选择容器"
                >
                  <el-option
                    v-for="(container,
                    index_container) in containers_and_groups(rule)"
                    :key="index_container"
                    :label="container"
                    :value="container"
                  />
                </el-select>
              </el-col>
              <el-col :span="2" class="line">速率限制</el-col>
              <el-col :span="3">
                <el-input
                  v-model.number="rule.speed_limits[index_limit].limit"
                  type="number"
                />
              </el-col>
              <el-col :span="2" class="line">优先级</el-col>
              <el-col :span="3">
                <el-input
                  v-model.number="rule.speed_limits[index_limit].prio"
                  type="number"
                />
              </el-col>
              <el-button type="danger" @click="remove(rule, index_limit)"
                >删除</el-button
              >
            </el-form-item>
          </el-row>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="add(rule)">添加速率规则</el-button>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="add_group(rule)"
            >添加分组</el-button
          >
        </el-form-item>
      </div>
    </el-form>

    <main class="flex-center">
      <div>
        <el-button type="success" @click="add_root">添加根起始容器</el-button>
      </div>
      <div>
        <el-button type="success" @click="save">保存规则</el-button>
      </div>
      <div>
        <el-button type="success" @click="apply">应用规则</el-button>
      </div>
    </main>
  </div>
</template>

<script>
import { getConfig, applyConfig, saveConfig } from '@/api/config'
import { safeLoad, safeDump } from 'js-yaml'
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
        this.config.rules.forEach(rule => {
          if (!rule.groups) rule.groups = []
        })
      })
    },
    range(size, startAt = 1) {
      const result = [...Array(size).keys()].map(i => i + startAt)
      return result
    },
    remove(rule, index) {
      rule.speed_limits.splice(index, 1)
    },
    remove_group(rule, index) {
      rule.groups.splice(index, 1)
    },
    remove_rule(index) {
      this.config.rules.splice(index, 1)
    },
    add(rule) {
      rule.speed_limits.push({
        from_container: '',
        to_container: '',
        limit: 0,
        prio: 0
      })
    },
    add_group(rule) {
      rule.groups.push({
        name: `groups_${rule.groups.length + 1}`,
        parent: '',
        children: []
      })

      // TODO temp fix
      this.add(rule)
      rule.speed_limits.pop()
    },
    containers_and_groups(rule) {
      var result = this.containers.slice()
      rule.groups.forEach(group => result.push(group.name))
      return result
    },
    parents(rule) {
      var result = rule.groups.map(group => group.name)
      result.push('root')
      return result
    },
    add_root() {
      this.config.rules.push({
        root: '',
        rules: [],
        groups: [],
        speed_limits: []
      })
      console.log(this.config)
    },
    apply() {
      applyConfig(this.filename)
    },
    save() {
      var dump = safeDump(this.config)
      console.log(dump)
      saveConfig(this.filename, dump)
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
  font-size: 14px;
}

main {
  background: white;
  margin: 20px 0;
  padding: 10px;
}
main div {
  padding: 15px;
  max-width: 125px;
  margin: 5px;
}
.inline-block-center {
  text-align: center;
}
.inline-block-center div {
  display: inline-block;
  text-align: left;
}
.flex-center {
  display: flex;
  justify-content: center;
}
</style>
