<template>
  <div>
    <v-row no-gutters>
      <v-col class="content" align-self="start">
        <v-form>
          <div class="content__form">
            <p class="custom-headline-5-regular content__title">Search</p>
            <v-text-field
              label="Keyword"
              outlined
              v-model="search"
              solo
              hide-details
              class="search--box"
              color="primary"
            ></v-text-field>

            <v-divider
              v-if="$vuetify.breakpoint.mdAndUp"
              class="mb-8"
            ></v-divider>

            <p class="custom-headline-5-regular content__perpage-text">
              # Of Results Per Page
            </p>

            <div class="d-inline-flex align-baseline content__range">
              <p class="content__range-text">{{ label[range] }}</p>
              <span class="custom-subtitle-regular content__result-text"
                >results</span
              >
            </div>
          </div>
          <div class="content__slider">
            <v-slider
              v-model="range"
              class="slider-custom"
              track-fill-color="gradient"
              thumb-color="#1b1b1b"
              thumb-size="56px"
              tick-size="0"
              hide-details
              :max="6"
              :min="0"
              :step="1"
              :thumb-label="false"
              :tick-labels="label"
            ></v-slider>
          </div>

          <div class="content__form">
            <v-divider class="content__divider"></v-divider>
            <v-btn
              class="content__button button-contained custom-button-text"
              :height="40"
              @click="doSearch"
              >Search</v-btn
            >
          </div>
        </v-form>
      </v-col>
      <v-col style="max-width: 375px" v-if="$vuetify.breakpoint.xl">
        <Profile />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  layout: 'default',
  data: () => ({
    search: '',
    range: 0,
    page: 0,
    label: [3, 6, 9, 12, 15, 30, 50],
  }),
  methods: {
    doSearch() {
      this.$router.push({
        path: 'search',
        query: {
          page: 1,
          pageSize: this.label[this.range],
          keyword: this.search,
        },
      })
    },
  },
}
</script>

<style lang="scss" >
// * Vuetify slider custom style
.slider-custom > .v-input__control > .v-input__slot > .v-slider {
  // * Vuetify slider track bar custom style
  > .v-slider__track-container {
    .v-slider__track-fill,
    .v-slider__track-background {
      border-radius: 10px !important;
      background-color: rgba(255, 255, 255, 0.3) !important;
    }
  }

  // * Vuetify slider ticks custom style
  > .v-slider__ticks-container {
    margin-top: 18px !important;
  }

  // * Vuetify slider thumb custom style
  > .v-slider__thumb-container > .v-slider__thumb {
    height: 26px !important;
    width: 26px !important;
    left: -12px !important;
    border: solid 6px #ffd05d !important;
  }
}

// * Vuetify slider track color
.gradient {
  background: linear-gradient(90deg, #ff5c01, #ffd25f) !important;
}

/* .slider-input {
  font-size: 48px !important;
  width: 90px !important;
  .v-input__control > .v-input__slot > .v-text-field__slot > input {
    padding: 20px 0 !important;
  }
} */

// * Vuetify text-input custom style
.search--box {
  margin-bottom: 29px !important;
  > .v-input__control > .v-input__slot > .v-text-field__slot > label {
    font-size: 14px !important;
    font-weight: 300 !important;
    letter-spacing: 0.25px !important;
    line-height: 150% !important;
    left: 2px !important;
  }
}

.content {
  min-width: 240px !important;
  margin-top: 0 !important;

  &__title {
    margin-bottom: 16px !important;
  }
  &__form {
    margin: 71px 20px 0 !important;
  }
  &__perpage-text {
    margin-bottom: 6px !important;
  }

  &__range {
    margin-bottom: 2px !important;
    &-text {
      margin-bottom: 0 !important;
      width: 50px !important;
      font-size: 48px !important;
      font-weight: 600 !important;
      line-height: 150% !important;
    }
  }

  &__result-text {
    position: relative !important;
    left: 15px !important;
    bottom: 3px !important;
  }

  &__slider {
    padding: 0 8px !important;
  }

  &__divider {
    position: relative !important;
    top: 172px !important;
  }

  &__button {
    position: absolute !important;
    width: calc(100% - 40px) !important;
    text-transform: uppercase !important;
    bottom: 90px !important;
    left: 8px !important;
  }
}

@media screen and (min-width: 960px) {
  .content {
    min-width: 800px;

    &__button {
      width: 343px !important;
      bottom: 86px !important;
      height: 42px !important;
      padding: 13px 16px !important;
      left: 118px !important;
    }
    &__form {
      margin: 55px 130px 0 !important;
    }
    &__slider {
      padding: 0 120px 0 124px !important;
    }
    &__title {
      margin-bottom: 21px !important;
    }

    &__range {
      margin-bottom: 4px !important;
    }
    &__result-text {
      bottom: 4px !important;
      left: 15px !important;
    }
  }

  // * Vuetify slider ticks custom style
  .slider-custom
    > .v-input__control
    > .v-input__slot
    > .v-slider
    > .v-slider__ticks-container {
    padding: 0 19px !important;
  }
}
</style>
