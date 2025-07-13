<template>
  <Layout>
    <H1>Mediterranean Plants Garden</H1>
    <div>
      Mediterranean climate plants are perfectly suited to our Bay Area conditions. These plants thrive in our dry summers and mild, wet winters. The Mediterranean Garden showcases drought-tolerant plants from Mediterranean climates around the world, including California, the Mediterranean Basin, Chile, South Africa, and Australia.
    </div> 
    <AllPlants />
  </Layout>
</template>

<!-- Always put page-query between <template> and <script> -->
<page-query>
query {
  allGoogleSheet (filter: { Location: { in: ["Mediterranean"] }}){
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
    title: 'Mediterranean Plants - Quarry Lake Demonstration Garden',
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
