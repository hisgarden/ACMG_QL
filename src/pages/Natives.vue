<template>
  <Layout>
    <H1>Native Plants Garden</H1>
    <div>
      Native plants are those that occur naturally in a region and have evolved to thrive in local conditions. Our Native Plants Garden showcases beautiful California native species that provide habitat for local wildlife while requiring minimal water and maintenance once established.
    </div> 
    <AllPlants />
  </Layout>
</template>

<!-- Always put page-query between <template> and <script> -->
<page-query>
query {
  allGoogleSheet (filter: { Location: { in: ["Natives"] }}){
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
    title: 'Native Plants - Quarry Lake Demonstration Garden',
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
