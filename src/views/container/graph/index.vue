<template>
  <div id="app-container">
    <div id="holder">
      <cytoscape ref="cy" :config="config()" :after-created="afterCreated">
        <cy-element
          v-for="(def, idx) in elements"
          :key="idx"
          :definition="def"
        />
      </cytoscape>
    </div>
  </div>
</template>

<script>
import { getGraph } from '@/api/container'

let resolveCy = null
const cyPromise = new Promise(resolve => (resolveCy = resolve))

export default {
  data() {
    return {
      elements: [],
      cy: null
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    async updateStyle() {
      const cy = await cyPromise
      cy.layout({ name: 'circle' }).run()
    },
    fetchData() {
      getGraph()
        .then(response => {
          this.elements = response.data
        })
        .then(this.updateStyle)
    },
    config() {
      return {
        style: [
          {
            selector: 'node',
            style: {
              'background-color': '#1b87cf',
              label: 'data(name)'
            }
          },
          {
            selector: 'edge',
            style: {
              width: 10,
              'line-color': '#ccc',
              'target-arrow-color': '#ccc',
              'target-arrow-shape': 'triangle',
              'curve-style': 'bezier',
              content: 'data(limit)'
            }
          }
        ],
        layout: {
          name: 'circle'
        }
      }
    },

    async afterCreated(cy) {
      resolveCy(cy)
    }
  }
}
</script>

<style scoped></style>
