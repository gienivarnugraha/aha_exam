<template>
  <v-row no-gutters class="hide--scrollbar">
    <v-col class="content">
      <v-card flat color="transparent" class="content__result">
        <v-btn
          class="ml-8"
          text
          icon
          @click="back"
          v-if="!$vuetify.breakpoint.xs"
          ><v-icon x-large left>mdi-chevron-left</v-icon>
          <span class="content__title"> Results </span>
        </v-btn>
        <span
          v-else
          class="headline"
          :style="`margin-left: ${$vuetify.breakpoint.xs ? 0 : 30}px;`"
          >Results</span
        >
        <v-data-iterator
          :items="items"
          :loading="loading"
          :items-per-page="itemsPerPage"
          hide-default-footer
          class="
            d-flex
            flex-wrap
            justify-center justify-md-space-between
            mt-7
            overflow-y-auto
          "
          style="max-height: calc(100vh - 200px)"
          id="scrollable"
          v-scroll.self="onScroll"
        >
          <template v-slot:default="{ items }">
            <div v-for="item in items" :key="item.id">
              <v-card
                color="rgba(255,255,255, 0.06)"
                class="content__image"
                :width="`${$vuetify.breakpoint.mdAndUp ? 219 : 335}px`"
                :height="`${$vuetify.breakpoint.mdAndUp ? 146 : 222}px`"
                dark
              >
                <v-img
                  :width="`${$vuetify.breakpoint.mdAndUp ? 219 : 335}px`"
                  :height="`${$vuetify.breakpoint.mdAndUp ? 146 : 222}px`"
                  :src="item.avater"
                  class="grey darken-4"
                >
                  <template v-slot:placeholder>
                    <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                    >
                      <v-progress-circular
                        indeterminate
                        color="grey lighten-5"
                      ></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>

                <p class="subtext subtext__title mb-0 mt-3">
                  {{ item.name }}
                </p>
                <p class="subtext subtext__subtitle mb-0">
                  by {{ item.username }}
                </p>
              </v-card>
            </div>
          </template>

          <template v-slot:loading>
            <div
              class="d-flex flex-wrap justify-center justify-md-space-between"
            >
              <v-skeleton-loader
                v-for="(n, index) in pageSize"
                :key="index"
                class="content__image"
                type="card"
              ></v-skeleton-loader>
            </div>
          </template>
        </v-data-iterator>

        <v-btn
          v-if="!isAllLoaded && !items.length <= 9"
          color="white"
          class="black--text content__button"
          @click="fetchMore((page += 1))"
          >More</v-btn
        >
        <v-fade-transition>
          <p v-if="isAllLoaded && totalItems > 0">All Items are loaded!</p>
        </v-fade-transition>

        <v-fade-transition>
          <div v-if="loadMore" class="text-center">
            <v-progress-circular
              indeterminate
              color="primary"
              :size="25"
            ></v-progress-circular>
          </div>
        </v-fade-transition>
      </v-card>
    </v-col>
    <v-col style="max-width: 375px" v-if="$vuetify.breakpoint.xl">
      <Profile />
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data: () => ({
    page: 1,
    pageSize: 1,
    keyword: '',
    loading: true,
    loadMore: false,
  }),
  computed: {
    ...mapState({
      items: (state) => state.search.items,
      totalItems: (state) => state.search.totalItems,
      totalPages: (state) => state.search.totalPages,
    }),
    isAllLoaded() {
      return this.items.length === this.totalItems
    },
    itemsPerPage() {
      return this.page * this.pageSize
    },
  },

  async fetch() {
    let { page, pageSize, keyword } = this.$route.query
    this.page = parseInt(page)
    this.pageSize = parseInt(pageSize)
    this.keyword = keyword

    await this.$store.dispatch('getSearchResults', {
      page: page,
      pageSize: pageSize,
      keyword: keyword,
    })

    this.loading = false
  },
  methods: {
    onScroll(e) {
      const scrollY = e.target.scrollTop
      const visible = e.target.clientHeight
      const pageHeight = e.target.scrollHeight - 1

      const bottomOfPage = visible + scrollY >= pageHeight

      if (bottomOfPage && this.page + 1 <= this.totalPages) {
        this.page += 1
        this.fetchMore(this.page)
      }
    },
    fetchMore(val) {
      this.loadMore = true

      if (val <= this.totalPages) {
        this.$store
          .dispatch('getSearchResults', {
            page: val,
            pageSize: this.pageSize,
            keyword: this.keyword,
            more: true,
          })
          .then((res) => {
            this.loadMore = false
          })
      }
    },
    back() {
      this.$router.go(-1)
    },
  },
}
</script>

<style lang="scss" >
.content {
  min-width: 240px;
  margin-top: 16px;
  height: calc(100vh - 100px);

  .subtext__title {
    margin-top: 20px !important;
  }

  &__button {
    bottom: 0px;
    width: 100%;
  }
  &__result {
    margin: 0 20px 0;
  }
  &__image {
    width: 335px;
    height: 222px;
    margin: 0 0 99px;
  }
}

@media screen and (min-width: 960px) {
  .content {
    min-width: 800px;
    margin-top: 24px;

    .subtext__title {
      margin-top: 12px !important;
    }

    &__button {
      width: 343px;
      height: 43px;
      padding: 13px 16px;
    }
    &__result {
      margin: 74px 120px 0;
    }
    &__image {
      width: 219px;
      height: 146px;
      margin: 0 12px 82px;
    }
    &__title {
      margin-left: 14px;
      font-weight: 400;
      font-size: 30px;
      text-transform: capitalize;
    }
  }
}
</style>
