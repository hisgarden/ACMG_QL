<template>
  <v-breadcrumbs :items="breadcrumbItems" class="pa-0">
    <template v-slot:item="{ item }">
      <v-breadcrumbs-item
        :to="item.to"
        :disabled="item.disabled"
        class="breadcrumb-item"
      >
        {{ item.text }}
      </v-breadcrumbs-item>
    </template>
    <template v-slot:divider>
      <v-icon>mdi-chevron-right</v-icon>
    </template>
  </v-breadcrumbs>
</template>

<script>
export default {
  name: 'Breadcrumbs',
  computed: {
    breadcrumbItems() {
      const items = [
        {
          text: 'Home',
          to: '/',
          disabled: false
        }
      ]

      const currentPath = this.$route.path
      
      if (currentPath === '/natives') {
        items.push({
          text: 'Native Plants',
          to: '/natives',
          disabled: true
        })
      } else if (currentPath === '/mediterranean') {
        items.push({
          text: 'Mediterranean Plants',
          to: '/mediterranean',
          disabled: true
        })
      } else if (currentPath === '/grasses') {
        items.push({
          text: 'Grasses',
          to: '/grasses',
          disabled: true
        })
      } else if (currentPath === '/sensory') {
        items.push({
          text: 'Sensory Garden',
          to: '/sensory',
          disabled: true
        })
      } else if (currentPath === '/opac') {
        items.push({
          text: 'Outstanding Plants of Alameda County',
          to: '/opac',
          disabled: true
        })
      } else if (currentPath.startsWith('/plant/')) {
        const plantSection = this.$route.query.section || 'natives'
        const sectionNames = {
          natives: 'Native Plants',
          mediterranean: 'Mediterranean Plants',
          grasses: 'Grasses',
          sensory: 'Sensory Garden',
          opac: 'Outstanding Plants of Alameda County'
        }
        
        items.push({
          text: sectionNames[plantSection] || 'Plants',
          to: `/${plantSection}`,
          disabled: false
        })
        
        items.push({
          text: 'Plant Details',
          to: currentPath,
          disabled: true
        })
      }

      return items
    }
  }
}
</script>

<style scoped>
.breadcrumb-item {
  font-size: 0.875rem;
}
</style>