<template>
  <div>
    <v-tabs
      v-model="tab"
      background-color="transparent"
      grow
      color="white"
      mobile-breakpoint="1440"
      height="65px"
      active-class="tab-text--active"
    >
      <v-tab v-for="(title, index) in titles" :key="index" class="tab-text">
        {{ title }}
      </v-tab>
    </v-tabs>

    <v-tabs-items
      v-model="tab"
      style="max-height: calc(100vh - 10px); background-color: transparent"
    >
      <v-tab-item>
        <Followers />
      </v-tab-item>

      <v-tab-item>
        <Followings />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
export default {
  data: () => ({
    tab: 0,
    titles: ['Followers', 'Following'],
  }),
}
</script>

<style lang="scss">
// * set tab text to baseline
.tab-text {
  font-size: 16px !important;
  font-weight: 300 !important;
  letter-spacing: 0.15px !important;
  line-height: 150% !important;
  text-transform: capitalize !important;

  position: relative !important;
  top: 12px !important;
  left: -2px !important;
}
.tab-text--active {
  font-weight: 700 !important;
}
</style>
