<template>
  <div>
    <!-- Will Shown on larger screensize -->
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
      <v-list-item class="logo">
        <v-img src="/logo.svg" max-height="15px" max-width="35px"></v-img>
      </v-list-item>

      <v-list>
        <v-list-item
          v-for="item in navbar"
          :key="item.title"
          dense
          :to="item.href"
          class="my-3"
          style="height: 50px"
        >
          <v-list-item-content class="py-0">
            <v-badge
              color="blue"
              offset-x="10"
              v-if="$route.name !== item.name"
              overlap
              dot
            >
            </v-badge>
            <v-icon class="mb-2">{{ item.icon }}</v-icon>
            <v-list-item-title
              v-show="$route.name === item.name"
              class="nav-title custom-caption-text"
              >{{ item.title }}</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!--Will  Shown on smallest screensize -->
    <div v-else>
      <v-bottom-navigation
        v-if="$route.name === 'index'"
        fixed
        dark
        height="66"
        style="background-color: rgb(24, 24, 24, 0.2)"
      >
        <v-btn
          text
          color="white"
          dark
          v-for="item in navbar"
          :key="item.title"
          :to="item.href"
        >
          <v-icon>{{ item.icon }}</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    navbar: [
      { title: 'Home', href: '/', icon: 'mdi-view-dashboard', name: 'index' },
      {
        title: 'Tags',
        href: '/tags?pageSize=10',
        icon: 'mdi-view-grid',
        name: 'tags',
      },
    ],
  }),
}
</script>

<style lang="scss">
.logo {
  padding: 20px 16px 4px !important;
}
.nav-title {
  margin-top: -8px !important;
  margin-left: 2px !important;
  text-align: center !important;
}
</style>
