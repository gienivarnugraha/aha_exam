<template>
  <div>
    <v-navigation-drawer
      v-if="$vuetify.breakpoint.lgAndUp"
      permanent
      touchless
      app
      floating
      mini-variant
      mini-variant-width="80px"
      color="transparent"
    >
      <v-list-item class="px-4 py-5">
        <v-img src="/logo.svg" max-height="15px" max-width="35px"></v-img>
      </v-list-item>

      <v-list class="pt-0">
        <v-list-item
          v-for="item in navbar"
          :key="item.title"
          dense
          :to="item.href"
          class="pt-1 pb-2 mb-4"
        >
          <v-list-item-content class="py-0">
            <v-icon>{{ item.icon }}</v-icon>
            <v-list-item-title class="text-center">{{
              item.title
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-bottom-navigation
      v-else
      fixed
      dark
      height="66"
      style="background-color: #181818"
    >
      <v-btn
        text
        color="white"
        dark
        v-for="item in navbar"
        :key="item.title"
        :to="item.href"
      >
        <span>{{ item.title }}</span>
        <v-icon>{{ item.icon }}</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script>
export default {
  data: () => ({
    navbar: [
      { title: 'Home', href: '/', icon: 'mdi-view-dashboard' },
      { title: 'Tags', href: '/tags', icon: 'mdi-view-grid' },
    ],
  }),
  computed: {},
  methods: {},
}
</script>

