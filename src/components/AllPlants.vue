<template>
  <section id="index" class="plant-section">
    <v-container>
      <!-- Search and Filter Section -->
      <v-row class="mb-4">
        <v-col cols="12" md="6">
          <v-text-field
            v-model="searchQuery"
            label="Search plants..."
            prepend-inner-icon="mdi-magnify"
            outlined
            clearable
            dense
            @input="filterPlants"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-select
            v-model="selectedFilters"
            :items="filterOptions"
            label="Filter by characteristics"
            multiple
            outlined
            dense
            clearable
            @change="filterPlants"
          ></v-select>
        </v-col>
      </v-row>

      <!-- Results count -->
      <v-row v-if="$page.allGoogleSheet && $page.allGoogleSheet.edges && $page.allGoogleSheet.edges.length > 0">
        <v-col cols="12">
          <p class="text-subtitle-1 mb-3">
            Showing {{ filteredPlants.length }} of {{ $page.allGoogleSheet.edges.length }} plants
          </p>
        </v-col>
      </v-row>

      <!-- Plants Grid -->
      <v-row dense>
        <v-col sm="12">
          <div v-if="$page.allGoogleSheet && $page.allGoogleSheet.edges && $page.allGoogleSheet.edges.length > 0">
            <v-row>
              <v-col
                v-for="page in filteredPlants"
                :key="page.node.id"
                cols="12"
                sm="6"
                md="4"
                lg="3"
              >
                <v-card height="100%" elevation="4" class="plant-card">
                  <g-link :to="`/plant/${page.node.id}`" class="text-decoration-none">
                    <v-img
                      :src="page.node.Img_URL"
                      :alt="page.node.Common_Name"
                      height="200"
                      cover
                    >
                      <template v-slot:placeholder>
                        <v-row class="fill-height ma-0" align="center" justify="center">
                          <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                        </v-row>
                      </template>
                    </v-img>
                  </g-link>
                  
                  <v-card-title class="pb-2">
                    {{ page.node.Common_Name }}
                  </v-card-title>
                  
                  <v-card-subtitle class="pt-0 pb-2">
                    <div class="scientific-name font-italic">
                      {{ page.node.Full_Name }}
                    </div>
                    <div v-if="page.node.Cultivar" class="cultivar">
                      {{ page.node.Cultivar }}
                    </div>
                  </v-card-subtitle>

                  <!-- Plant characteristics chips -->
                  <v-card-text class="pt-0">
                    <div class="d-flex flex-wrap gap-1">
                      <v-chip
                        v-if="page.node.Water_Needs"
                        x-small
                        color="blue lighten-4"
                        text-color="blue darken-2"
                      >
                        {{ page.node.Water_Needs }}
                      </v-chip>
                      <v-chip
                        v-if="page.node.Exposure"
                        x-small
                        color="orange lighten-4"
                        text-color="orange darken-2"
                      >
                        {{ page.node.Exposure }}
                      </v-chip>
                      <v-chip
                        v-if="page.node.Bloom_Season"
                        x-small
                        color="pink lighten-4"
                        text-color="pink darken-2"
                      >
                        {{ page.node.Bloom_Season }}
                      </v-chip>
                    </div>
                  </v-card-text>

                  <v-card-actions>
                    <v-btn
                      :to="`/plant/${page.node.id}`"
                      color="primary"
                      text
                      small
                    >
                      View Details
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </div>
          <div v-else>
            <v-alert type="info" class="ma-4">
              <div class="text-center">
                <h3>No plant data available</h3>
                <p>This section requires Google Sheets data to be configured.</p>
                <p>Please set up your Google Sheets API credentials in the .env file to view plant information.</p>
              </div>
            </v-alert>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      selectedFilters: [],
      filteredPlants: []
    }
  },
  computed: {
    filterOptions() {
      if (!this.$page.allGoogleSheet || !this.$page.allGoogleSheet.edges) return []
      
      const options = new Set()
      
      this.$page.allGoogleSheet.edges.forEach(edge => {
        const node = edge.node
        if (node.Water_Needs) options.add(`Water: ${node.Water_Needs}`)
        if (node.Exposure) options.add(`Light: ${node.Exposure}`)
        if (node.Bloom_Season) options.add(`Bloom: ${node.Bloom_Season}`)
        if (node.Type) options.add(`Type: ${node.Type}`)
      })
      
      return Array.from(options).sort()
    }
  },
  mounted() {
    this.initializeFilteredPlants()
  },
  watch: {
    '$page.allGoogleSheet': {
      handler() {
        this.initializeFilteredPlants()
      },
      immediate: true
    }
  },
  methods: {
    initializeFilteredPlants() {
      if (this.$page.allGoogleSheet && this.$page.allGoogleSheet.edges) {
        this.filteredPlants = [...this.$page.allGoogleSheet.edges]
      }
    },
    filterPlants() {
      if (!this.$page.allGoogleSheet || !this.$page.allGoogleSheet.edges) {
        this.filteredPlants = []
        return
      }

      let plants = [...this.$page.allGoogleSheet.edges]

      // Search filter
      if (this.searchQuery && this.searchQuery.trim()) {
        const query = this.searchQuery.toLowerCase().trim()
        plants = plants.filter(edge => {
          const node = edge.node
          return (
            (node.Common_Name && node.Common_Name.toLowerCase().includes(query)) ||
            (node.Full_Name && node.Full_Name.toLowerCase().includes(query)) ||
            (node.Scientific_Name && node.Scientific_Name.toLowerCase().includes(query)) ||
            (node.Cultivar && node.Cultivar.toLowerCase().includes(query))
          )
        })
      }

      // Characteristic filters
      if (this.selectedFilters && this.selectedFilters.length > 0) {
        plants = plants.filter(edge => {
          const node = edge.node
          return this.selectedFilters.every(filter => {
            const [category, value] = filter.split(': ')
            switch (category) {
              case 'Water':
                return node.Water_Needs === value
              case 'Light':
                return node.Exposure === value
              case 'Bloom':
                return node.Bloom_Season === value
              case 'Type':
                return node.Type === value
              default:
                return false
            }
          })
        })
      }

      this.filteredPlants = plants
    }
  }
}
</script>

<style scoped>
.plant-card {
  transition: transform 0.2s ease-in-out;
}

.plant-card:hover {
  transform: translateY(-2px);
}

.scientific-name {
  font-size: 0.875rem;
  color: #666;
}

.cultivar {
  font-size: 0.8rem;
  color: #888;
  margin-top: 2px;
}

.gap-1 > * {
  margin-right: 4px;
  margin-bottom: 4px;
}
</style>
