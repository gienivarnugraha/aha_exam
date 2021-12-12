<template>
  <v-row no-gutters>
    <v-col class="content">
      <v-form class="content__form">
        <p class="content__title headline">Search</p>
        <v-text-field
          label="Keyword"
          outlined
          v-model="search"
          solo
          color="primary"
        ></v-text-field>

        <v-divider v-if="$vuetify.breakpoint.mdAndUp" class="mb-9"></v-divider>

        <p class="headline"># Of Results Per Page</p>
        <!-- <p style="font-size: 48px">{{ range }}</p> -->

        <div class="d-inline-flex align-baseline">
          <v-text-field
            class="mt-1 mr-2 mb-2 pa-0 slider-input"
            solo
            hide-details
            v-model="range"
            color="transparent"
            type="number"
          ></v-text-field>
          <p class="text-subtitle-1">Results</p>
        </div>
        <v-slider
          v-model="range"
          thumb-label
          :max="50"
          :min="0"
          class="slider-custom"
          track-fill-color="gradient"
          tick-size="0"
          :tick-labels="rangeValue"
        ></v-slider>

        <v-divider class="my-8"></v-divider>
        <v-btn
          color="white"
          class="black--text content__button"
          :height="40"
          @click="doSearch"
          >Search</v-btn
        >
      </v-form>
    </v-col>
    <v-col style="max-width: 375px" v-if="$vuetify.breakpoint.xl">
      <Profile />
    </v-col>
  </v-row>
</template>

<script>
export default {
  layout: 'default',
  data: () => ({
    search: '',
    range: 0,
    page: 0,
  }),
  computed: {
    rangeValue() {
      let value = ['0']
      for (let index = 1; index < 50; index++) {
        if (this.$vuetify.breakpoint.smAndDown) {
          value[index * 10] = index * 10
        } else {
          value[index * 3] = index * 3
        }
      }
      value[50] = 50
      return value
    },
  },
  methods: {
    doSearch() {
      this.$router.push({
        path: 'search',
        query: { page: 1, pageSize: this.range, keyword: this.search },
      })
    },
  },
}
</script>

<style lang="scss" >
.gradient {
  background: linear-gradient(90deg, #ffd25f, #ff5c01) !important;
}

.slider-custom > .v-input__control > .v-input__slot > .v-slider {
  margin: 0;
  > .v-slider__track-container {
    .v-slider__track-fill,
    .v-slider__track-background {
      border-radius: 10px !important;
      background-color: rgba(255, 255, 255, 0.3) !important;
    }
  }
  > .v-slider__ticks-container {
    margin-top: 20px;
  }
}

.slider-input {
  font-size: 48px !important;
  width: 90px !important;
  .v-input__control > .v-input__slot > .v-text-field__slot > input {
    padding: 20px 0 !important;
  }
}

.content {
  min-width: 240px;
  margin-top: -14px;

  &__button {
    position: absolute;
    width: calc(100% - 48px);
    bottom: 90px;
    height: 200px;
  }
  &__form {
    height: calc(100vh - 100px);
    margin: 0 20px 0;
  }
  &__title {
    margin-bottom: 16px !important;
  }
}

@media screen and (min-width: 750px) {
  .content {
    &__button {
      bottom: 70px;
      width: 343px;
      height: 43px;
      padding: 13px 16px;
    }
  }
}

@media screen and (min-width: 960px) {
  .content {
    min-width: 800px;
    &__button {
      width: 343px;
      bottom: 87px;
      height: 43px;
      padding: 13px 16px;
    }
    &__form {
      margin: 70px 130px 0;
    }
    &__title {
      margin-bottom: 22px !important;
    }
  }
}
</style>
