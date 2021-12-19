<template>
  <div class="tags-content">
    <p
      :class="`page-title ${
        $vuetify.breakpoint.mdAndDown
          ? `custom-headline-5-regular`
          : `custom-headline-4-regular`
      } `"
    >
      Tags
    </p>

    <v-card flat color="transparent">
      <v-data-iterator
        class="d-flex flex-wrap justify-center justify-md-space-between"
        :items="tags"
        :loading="loading"
        :items-per-page="itemsPerPage"
        hide-default-footer
      >
        <template v-slot:default="{ items: tags }">
          <div v-for="tag in tags" :key="tag.id" class="tags">
            <v-card
              color="rgba(255,255,255, 0.06)"
              width="150px"
              height="150px"
              dark
              class="d-flex align-end justify-start rounded-lg tags-image"
            >
              <v-chip label flat outlined dark class="tags-chip">
                <span class="tags-chip__title custom-headline-5-bold">
                  {{ tag.name }}
                </span>
              </v-chip>
            </v-card>

            <p class="subtext subtext__title">
              {{ tag.name }}
            </p>
            <p class="subtext subtext__subtitle">{{ tag.count }} Questions</p>
          </div>
        </template>

        <template v-slot:loading>
          <div class="d-flex flex-wrap">
            <v-skeleton-loader
              v-for="(n, index) in pageSize"
              :key="index"
              style="width: 150px; height: 199px"
              class="tags"
              type="card"
            ></v-skeleton-loader>
          </div>
        </template>
      </v-data-iterator>
      <v-btn
        v-if="!isAllLoaded && !isOverflown && tags.length > 0"
        class="button-responsive button-contained custom-button-text"
        @click="fetchMore"
        >More</v-btn
      >
      <v-fade-transition>
        <p v-if="isAllLoaded && tags.length > 0">All Items are loaded!</p>
      </v-fade-transition>
    </v-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  layout: 'default',
  data: () => ({
    pageSize: 0,
    loading: true,
    isOverflown: false,
  }),
  created() {
    window.addEventListener('scroll', this.onScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.onScroll)
  },
  computed: {
    ...mapState({
      tags: (state) => state.tags.items,
      page: (state) => state.tags.page,
    }),
    numberOfPages() {
      return Math.ceil(this.tags.length / this.pageSize)
    },
    itemsPerPage() {
      return this.page * this.pageSize
    },
    isAllLoaded() {
      return this.page === this.numberOfPages
    },
  },
  mounted() {
    let { pageSize } = this.$route.query
    this.pageSize = parseInt(pageSize)
  },
  async fetch() {
    if (this.tags.length === 0) await this.$store.dispatch('getAllTags')
  },
  methods: {
    onScroll(e) {
      //* detect overflown page
      if (document.body.offsetHeight > window.innerHeight)
        this.isOverflown = true

      // * is scroll state is on bottom of page
      const bottomOfPage =
        window.innerHeight + 100 + window.scrollY >= document.body.offsetHeight

      // * get rest of the data
      if (bottomOfPage) {
        this.fetchMore()
      }
    },
    fetchMore() {
      //* if current page + 1 is less than total page, then fetch more or all data already loaded
      if (this.page + 1 <= this.numberOfPages) {
        console.log('fetching more tags..')
        this.$store.commit('NEXT_PAGE', 'tags')
      } else {
        console.log('all data are already loaded..')
      }
    },
  },
}
</script>


<style lang="scss" >
.tags-content {
  margin: 90px 13px 40px !important ;
}

.tags {
  margin: 0 auto 24px !important;
  height: 199px !important;

  &-image {
    margin-bottom: 12px !important;
  }

  &-chip {
    border: 4px solid white !important;
    border-radius: 10px !important;
    height: 50px !important;
    margin: 0 10px 14px !important;

    &__title {
      margin-top: 2px !important;
      margin-left: -1px !important;
      white-space: nowrap !important;
      overflow: hidden !important;
      text-overflow: ellipsis !important;
    }
  }
}

.subtext {
  &__title {
    margin: 0 0 -1px !important;
  }
}

.page-title {
  margin: 14px 8px 24px !important;
}

.button-responsive {
  width: 100% !important;
  text-transform: uppercase !important;
}

@media screen and (min-width: 960px) {
  .tags {
    margin: 0 auto 36px !important;
  }

  .page-title {
    margin: 14px 11px 24px !important;
  }

  .tags-content {
    margin: 80px 246px 0 !important;
  }

  .button-responsive {
    width: 343px !important;
    height: 43px !important;
    padding: 13px 16px !important;
  }
}
</style>
