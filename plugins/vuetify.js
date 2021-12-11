import Vue from 'vue'
import Vuetify, { VSkeletonLoader } from 'vuetify/lib'

Vue.use(Vuetify, {
  components: { VSkeletonLoader },
})

const opts = {
  breakpoint: {
    thresholds: {
      sm: 375,
      md: 750,
      lg: 1440,
      /*
      xs: 340,
      sm: 540,
      md: 800,
      lg: 1280,
       */
    },
  },
  theme: {
    dark: true,
    options: {
      customProperties: true, // !!important for importing color variables to component style
    },
    themes: {
      dark: {
        primary: '#ffd25f',
        secondary: '#FF5C01',
      },
    },
  },
}

export default new Vuetify(opts)
