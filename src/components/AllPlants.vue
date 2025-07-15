<template>
  <section id="index" class="plant-section">
    <v-container>
      <v-row dense>
        <v-col sm="12">
          <div v-if="$page.allGoogleSheet && $page.allGoogleSheet.edges && $page.allGoogleSheet.edges.length > 0">
            <div
              v-for="page in $page.allGoogleSheet.edges"
              :key="page.node.id"
            >
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
          </div>
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
