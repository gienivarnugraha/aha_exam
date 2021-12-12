import _ from 'lodash'
import Vuex from 'vuex'
import { createLocalVue } from '@vue/test-utils'

describe('store/games/games', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  let NuxtStore
  let store

  beforeAll(async () => {
    const storePath = `${process.env.buildDir}/store.js`

    console.log(storePath)
    NuxtStore = await import(storePath)
  })

  beforeEach(async () => {
    store = await NuxtStore.createStore()
    console.log(store)
  })

  describe('getAll', () => {
    let followers
    const context = {
      commit: jest.fn(),
      state: jest.fn(),
    }
    const body = {
      page: '1',
    }

    beforeEach(() => {
      followers = store.actions['getAllFollowers'](context, body)
    })

    test('DOOM should be on only playStation 4', () => {
      expect(followers).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: 'PlayStation 4',
            username: 'DOOM',
          }),
        ])
      )
    })
  })
})
