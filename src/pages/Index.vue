<template>
  <Layout>
    <div v-if="$page.allGoogleSheet && $page.allGoogleSheet.edges && $page.allGoogleSheet.edges.length > 0">
      <div v-for= "page in $page.allGoogleSheet.edges" :key= "page.node.id">
     <v-card max-width="400" class="mx-auto" elevation="4">
                <v-avatar class="ma-3" size="194" tile>
                  <g-link :to="`/plant/${page.node.id}`">
                    <v-img
                      contain
                      max-height="194"
                      max-width="194"
                      :src="page.node.Img_URL"
                      :alt="page.node.Common_Name"
                    ></v-img>
                    </g-link>
                 </v-avatar>
          <v-card-title>{{ page.node.Common_Name }}</v-card-title>
          <v-card-subtitle>
            <div class="container-name"> 
              <g-link :to="`/plant/${page.node.id}`">
                <div :class="[italic]">{{ page.node.Full_Name }}</div>
                <div class="div2"> {{ page.node.Cultivar }}</div>
              </g-link>
            </div>
          </v-card-subtitle>
    </v-card>
    <br> 
    <br>
    </div>
    </div>
    <div v-else>
      <v-alert type="info" class="ma-4">
        <div class="text-center">
          <h3>Welcome to Quarry Lakes Demonstration Garden</h3>
          <p>This site showcases plants from the Quarry Lakes Demonstration Garden in Fremont.</p>
          <p>To view plant information, please set up your Google Sheets API credentials in the .env file.</p>
          <p>For setup instructions, see the README.md file.</p>
        </div>
      </v-alert>
    </div>
  </Layout>
</template>

<!-- Always put page-query between <template> and <script> -->
<page-query>
    query {
    allGoogleSheet{
      	edges{
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
          }
        }
      }
    }
</page-query>
<script>

import AllPlants from '@/components/AllPlants.vue'
export default{
  data() {
    return {
      italic: 'italic', 
    }
  }
}
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
.italic { font-style: italic; }
.container-name div { 
    display: inline; 
		height: auto; 
  } 
</style>
