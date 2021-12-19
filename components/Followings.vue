<template>
  <v-card flat dark color="transparent ">
    <div
      v-if="loading"
      style="max-height: 88vh; margin-top: 32px !important"
      class="overflow-y-auto"
    >
      <v-skeleton-loader
        v-for="(n, index) in perPage"
        :key="index"
        style="margin-bottom: 13px"
        type="list-item-avatar"
      ></v-skeleton-loader>
    </div>
    <v-card-text v-else>
      <v-virtual-scroll
        :items="followings"
        :item-height="61"
        v-scroll.self="onScroll"
        max-height="88vh"
      >
        <template v-slot:default="{ item }">
          <v-list-item class="follows-content">
            <v-img
              dark
              max-width="40px"
              max-height="40px"
              lazy-src="/loading.svg"
              :src="item.avater"
              class="white--text rounded-lg follows-content__image"
            >
            </v-img>

            <v-list-item-content>
              <v-list-item-title
                class="custom-body-1-text"
                style="margin-top: 2px"
                >{{ item.name }}</v-list-item-title
              >
              <v-list-item-subtitle class="custom-body-2-text"
                >@{{ item.username }}</v-list-item-subtitle
              >
            </v-list-item-content>

            <v-list-item-action>
              <v-btn
                depressed
                x-small
                height="29px"
                rounded
                :class="`${
                  item.isFollowing ? 'button-contained' : 'button-outlined'
                }`"
                ><span class="custom-follow-button-text">
                  {{ item.isFollowing ? 'Following' : 'Follow' }}
                </span>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </template>
      </v-virtual-scroll>
      <v-fade-transition>
        <div v-if="infiniteLoad" class="infinite-load">
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
    infiniteLoad: false,
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
      this.infiniteLoad = true

      if (val <= this.totalPages) {
        this.$store
          .dispatch('getAllFollowings', {
            page: val,
            more: true,
          })
          .then((res) => {
            this.infiniteLoad = false
          })
      }
    },
  },
}
</script>

