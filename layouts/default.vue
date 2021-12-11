<template>
  <v-app dark>
    <v-app-bar
      dark
      dense
      :height="70"
      class="pa-0"
      color="#181818"
      flat
      v-if="$vuetify.breakpoint.mdAndDown"
    >
      <v-img
        v-if="$route.name === 'index'"
        src="/logo.svg"
        max-height="15px"
        max-width="35px"
      ></v-img>

      <v-toolbar-title v-else class="pl-0" style="font-size: 24px">
        <v-btn icon to="/" width="36px">
          <v-icon x-large left>mdi-chevron-left</v-icon>
        </v-btn>
        <span> Home Page </span>
      </v-toolbar-title>
    </v-app-bar>
    <Navbar />
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>
