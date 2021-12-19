<template>
  <v-app dark>
    <!-- APPBAR will shown on smaller screens -->
    <v-app-bar
      dark
      dense
      fixed
      :height="70"
      class="pa-0"
      color="#181818"
      flat
      v-if="$vuetify.breakpoint.mdAndDown"
    >
      <v-img
        v-if="$route.name === 'index'"
        src="/logo.svg"
        style="margin-left: 6px"
        max-height="15px"
        max-width="35px"
      ></v-img>

      <v-toolbar-title v-else class="toolbar-title">
        <v-btn icon to="/" width="30px">
          <v-icon x-large left>mdi-chevron-left</v-icon>
        </v-btn>
        <span class="toolbar-title--text"> Home Page </span>
      </v-toolbar-title>
    </v-app-bar>

    <Navbar />
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<style lang="scss">
.toolbar-title {
  font-size: 24px !important;
  margin-left: 7px !important;
  &--text {
    position: relative !important;
    top: 3px !important;
  }
}
</style>
