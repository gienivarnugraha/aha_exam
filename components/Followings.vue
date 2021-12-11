<template>
  <v-card flat dark color="transparent ">
    <div v-if="loading" style="max-height: 85vh" class="overflow-y-auto">
      <v-skeleton-loader
        v-for="(n, index) in perPage"
        :key="index"
        class="my-2"
        type="list-item-avatar"
      ></v-skeleton-loader>
    </div>
    <v-card-text v-else>
      <v-virtual-scroll
        :items="followings"
        :item-height="61"
        v-scroll.self="onScroll"
        max-height="85vh"
      >
        <template v-slot:default="{ item }">
          <v-list-item class="px-0 mx-0 mt-2">
            <v-img
              dark
              max-width="40px"
              max-height="40px"
              lazy-src="/loading.svg"
              class="white--text rounded-lg bordered--image"
              :src="item.avater"
            >
            </v-img>

            <v-list-item-content>
              <v-list-item-title>{{ item.name }}</v-list-item-title>
              <v-list-item-subtitle>@{{ item.username }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn
                depressed
                x-small
                height="29px"
                rounded
                :outlined="!item.isFollowing"
                :color="`${item.isFollowing ? 'white' : ''}`"
                :class="`${item.isFollowing ? 'black--text' : ''}`"
              >
                {{ item.isFollowing ? 'Unfollow' : 'Follow' }}
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </template>
      </v-virtual-scroll>
      <v-fade-transition>
        <div v-if="loadMore" class="text-center">
          <v-progress-circular
            indeterminate
            color="primary"
            :size="25"
          ></v-progress-circular>
        </div>
      </v-fade-transition>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data: () => ({
    loadMore: false,
    loading: true,
  }),
  computed: {
    ...mapState({
      followings: (state) => state.followings.items,
      page: (state) => state.followings.page,
      perPage: (state) => state.followings.perPage,
      totalItems: (state) => state.followings.totalItems,
      totalPages: (state) => state.followings.totalPages,
    }),
  },
  async fetch() {
    if (this.followings.length === 0) {
      await this.$store.dispatch('getAllFollowings', {
        page: 1,
        perPage: this.perPage,
      })
    }
    this.loading = false
  },
  methods: {
    onScroll(e) {
      const scrollY = e.target.scrollTop
      const visible = e.target.clientHeight
      const pageHeight = e.target.scrollHeight - 1

      const bottomOfPage = visible + scrollY >= pageHeight

      if (bottomOfPage && this.page + 1 <= this.totalPages) {
        this.$store.commit('NEXT_PAGE', 'followings')
        this.fetchMore(this.page)
      }
    },
    fetchMore(val) {
      this.loadMore = true

      if (val <= this.totalPages) {
        this.$store
          .dispatch('getAllFollowings', {
            page: val,
            more: true,
          })
          .then((res) => {
            this.loadMore = false
          })
      }
    },
  },
}
</script>
