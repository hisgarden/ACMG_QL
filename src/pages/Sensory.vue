<template>
  <Layout>
    <H1>Sensory Plants Garden</H1>
    <div>
      The Sensory Garden engages all five senses with plants that offer unique textures, fragrances, sounds, tastes, and visual appeal. This garden is designed to provide a multi-sensory experience, featuring plants with aromatic leaves, interesting textures, colorful flowers, and edible parts that create an interactive and therapeutic garden space.
    </div> 
    <AllPlants />
  </Layout>
</template>

<!-- Always put page-query between <template> and <script> -->
<page-query>
query {
  allGoogleSheet (filter: { Location: { in: ["Sensory"] }}) {
    edges {
      node {
        id
        ID
        Scientific_Name
        Common_Name
        Full_Name
        Cultivar
        Description
        Size__height_
        Size__width_
        Bloom_Season
        Pruning_Needs
        Water_Needs
        Exposure
        Pruning_Needs
        Location
        Img_URL
        Attribution
        Links
        Type
      }
    }
  }
}
</page-query>

<script>
import AllPlants from '@/components/AllPlants.vue'

export default {
  metaInfo: {
    title: 'Sensory Plants - Quarry Lake Demonstration Garden',
  },
  components: {
    AllPlants,
  },
}
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
