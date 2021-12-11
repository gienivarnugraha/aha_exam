<template>
  <div>
    <v-tabs
      v-model="tab"
      background-color="transparent"
      grow
      color="white"
      mobile-breakpoint="1440"
      height="65px"
    >
      <v-tab v-for="(title, index) in titles" :key="index" class="text--end">
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

