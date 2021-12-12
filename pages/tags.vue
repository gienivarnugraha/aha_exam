<template>
  <div>
    <p class="page-title">Tags</p>

    <v-card flat color="transparent" class="content--margin">
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
              class="d-flex align-end justify-start rounded-lg mb-3"
            >
              <v-chip label flat outlined dark class="tags-chip">
                <span class="tags-chip__title">
                  {{ tag.name }}
                </span>
              </v-chip>
            </v-card>

            <p class="subtext subtext__title mb-0 mt-2">
              {{ tag.name }}
            </p>
            <p class="subtext subtext__subtitle mb-0">
              {{ tag.count }} Results
            </p>
          </div>
        </template>

        <template v-slot:loading>
          <div class="d-flex flex-wrap justify-center justify-md-space-between">
            <v-skeleton-loader
              v-for="(n, index) in perPage"
              :key="index"
              style="width: 150px; height: 199px"
              class="mx-auto mb-9"
              type="card"
            ></v-skeleton-loader>
          </div>
        </template>
      </v-data-iterator>
    </v-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  layout: 'default',
  data: () => ({
    perPage: 15,
    loading: true,
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
      return Math.ceil(this.tags.length / this.perPage)
    },
    itemsPerPage() {
      return this.page * this.perPage
    },
    mobileBreakpoint() {
      return this.$vuetify.breakpoint.xs
    },
  },
  async fetch() {
    if (this.tags.length === 0) await this.$store.dispatch('getAllTags')
  },
  methods: {
    onScroll(e) {
      // * is scroll state is on bottom of page
      const bottomOfPage =
        window.innerHeight + window.scrollY >= document.body.offsetHeight

      if (bottomOfPage && this.page + 1 <= this.numberOfPages) {
        // * get rest of the data
        console.log('fetching more tags..')
        this.$store.commit('NEXT_PAGE', 'tags')
      }
    },
  },
}
</script>


<style lang="scss" scoped>
.tags {
  margin: 0 auto 24px;
  height: 199px;
}

.tags-chip {
  border: 4px solid white;
  border-radius: 10px;
  height: 50px;
  margin: 0 10px 14px;

  &__title {
    font-size: 24px;
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.page-title {
  margin: 16px 20px 20px;
  font-size: 24px;
  line-height: 45px;
  font-weight: 300;
}

.content--margin {
  margin: 0 12px 40px;
}

@media screen and (min-width: 960px) {
  .tags {
    margin: 0 auto 36px;
  }

  .page-title {
    margin: 80px 258px 24px;
    font-size: 30px;
    font-weight: 400;
  }

  .content--margin {
    margin: 4px 246px 0;
  }
}
</style>
