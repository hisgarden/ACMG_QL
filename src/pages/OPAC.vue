<template>
  <Layout>
    <Breadcrumbs />
    <H1>Outstanding Plants of Alameda County</H1>
    <div>
      The Outstanding Plants of Alameda County (OPAC) program recognizes exceptional plants that thrive in our local climate and conditions. These plants have been selected for their beauty, adaptability, and performance in Alameda County gardens.
    </div> 
    <AllPlants />
  </Layout>
</template>

<!-- Always put page-query between <template> and <script> -->
<page-query>
query {
  allGoogleSheet (filter: { Location: { in: ["OPAC"] }}){
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
import Breadcrumbs from '@/components/Breadcrumbs.vue'

export default {
  metaInfo: {
    title: 'Outstanding Plants of Alameda County - Quarry Lake Demonstration Garden',
  },
  components: {
    AllPlants,
    Breadcrumbs,
  },
}
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
