import Store from './store'
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { cloneDeep } from 'lodash'

// destructure assign `mutations`
const localVue = createLocalVue()
localVue.use(Vuex)
const store = new Vuex.Store(cloneDeep(Store))

describe('testing actions', () => {
  it('get all followers from api', async () => {
    store.dispatch('getAllFollowers').then((res) => {
      console.log(res)
    })
  })
})
