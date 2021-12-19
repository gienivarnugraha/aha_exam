<template>
  <v-row no-gutters class="hide--scrollbar">
    <v-col class="search-content">
      <v-card
        flat
        color="transparent"
        class="search-content__result"
        ref="scrollable"
      >
        <div class="search-content--title">
          <div v-if="!$vuetify.breakpoint.xs">
            <v-btn
              class="search-content--title-responsive"
              text
              icon
              @click="back"
              ><v-icon x-large>mdi-chevron-left</v-icon>
            </v-btn>
            <span class="search-content--title__text custom-headline-4-regular">
              Results
            </span>
          </div>
          <span
            v-else
            class="search-content--title__text custom-headline-5-regular"
            >Results</span
          >
        </div>
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
          style="max-height: calc(100vh - 175px)"
          id="scrollable"
          v-scroll.self="onScroll"
        >
          <template v-slot:default="{ items }">
            <div v-for="item in items" :key="item.id">
              <v-card
                color="rgba(255,255,255, 0.06)"
                class="search-content__card"
                dark
              >
                <v-img
                  :src="item.avater"
                  class="grey darken-4 search-content__image"
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

                <p class="subtext subtext__title">
                  {{ item.name }}
                </p>
                <p class="subtext subtext__subtitle">by {{ item.username }}</p>
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
                class="search-content__card"
                type="card"
              ></v-skeleton-loader>
            </div>
          </template>
        </v-data-iterator>

        <v-fade-transition>
          <p v-if="isAllLoaded && totalItems > 0">All Items are loaded!</p>
        </v-fade-transition>

        <v-fade-transition>
          <div v-if="infiniteLoad" class="infinite-load">
            <v-progress-circular
              indeterminate
              color="primary"
              :size="25"
            ></v-progress-circular>
          </div>
        </v-fade-transition>
        <v-btn
          v-if="!loading && !overflown && !isAllLoaded"
          class="button-responsive button-contained"
          @click="fetchMore((page += 1))"
        >
          <span class="custom-button-text"> More </span>
        </v-btn>
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
    infiniteLoad: false,
    overflown: false,
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

  mounted() {
    this.isOverflown()
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

    await this.$nextTick()

    this.loading = false
  },
  methods: {
    //* detect overflown page
    isOverflown() {
      if (this.$refs.scrollable.$el.clientHeight + 140 > window.innerHeight)
        this.overflown = true
    },
    onScroll(e) {
      const scrollY = e.target.scrollTop
      const visible = e.target.clientHeight
      const pageHeight = e.target.scrollHeight - 1

      // * detect scroll on bottom page, and fetch more data
      const bottomOfPage = visible + scrollY >= pageHeight

      if (bottomOfPage && this.page + 1 <= this.totalPages) {
        this.page += 1
        this.fetchMore(this.page)
      }
    },
    fetchMore(val) {
      this.infiniteLoad = true

      if (val <= this.totalPages) {
        this.$store
          .dispatch('getSearchResults', {
            page: val,
            pageSize: this.pageSize,
            keyword: this.keyword,
            more: true,
          })
          .then(() => {
            this.isOverflown()
            this.infiniteLoad = false
          })
      }
    },
    back() {
      this.$router.go(-1)
    },
  },
}
</script>

<style lang="scss">
button-responsive {
  bottom: 0px !important;
}

.subtext__title {
  margin-top: 22px !important;
}

.search-content {
  min-width: 240px !important;
  margin-top: 86px !important;
  height: calc(100vh - 200px) !important;

  &--title {
    margin-left: -20px !important;

    &__text {
      position: relative !important;
      top: 4px !important;
      left: 20px !important;
      text-transform: capitalize !important;
    }
  }

  &__result {
    margin: 0 20px 0 !important;
  }

  &__card {
    width: 335px !important;
    height: 222px !important;
    margin: 0 0 100px !important;
  }
  &__image {
    width: 335px !important;
    height: 222px !important;
  }
}

@media screen and (min-width: 960px) {
  .button-responsive {
    position: relative !important;
    bottom: 10px !important;
  }

  .subtext {
    &__title {
      margin: 13px 0 0 !important;
    }

    &__subtitle {
      margin: -1px 0 0 !important;
    }
  }

  .search-content {
    min-width: 800px !important;
    margin-top: 24px !important;

    &__result {
      margin: 62px 118px 0 !important;
    }

    &__card {
      width: 219px !important;
      height: 146px !important;
      margin: 0 12px 82px !important;
    }

    &__image {
      width: 219px !important;
      height: 146px !important;
    }

    &--title {
      margin-left: -38px !important;

      &__text {
        position: relative !important;
        top: 6px !important;
        left: 17px !important;
      }
    }
  }
}
</style>
