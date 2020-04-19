<template>
  <div>dsaf</div>
</template>

<script>
import { getGraph } from '@/api/container'

export default {
  data() {
    return {
      graph: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getGraph().then(response => {
        this.graph = response.data
        console.log(this.graph)

        this.listLoading = false
      })
    }
  }
}
</script>

<style>
</style>
