export const state = () => ({
  followings: {
    items: [],
    totalItems: 0,
    page: 1,
    perPage: 20,
    totalPages: 0,
  },
  followers: {
    items: [],
    totalItems: 0,
    page: 1,
    perPage: 20,
    totalPages: 0,
  },
  search: {
    items: [],
    totalItems: 0,
    totalPages: 0,
  },
  tags: {
    items: [],
    totalItems: 0,
    page: 1,
    totalPages: 0,
  },
})

export const mutations = {
  SET(state, { key, value }) {
    state[key].items = value
  },
  SET_PAGE(state, { key, value }) {
    state[key].page = value
  },
  NEXT_PAGE(state, key) {
    state[key].page += 1
  },
  MORE_ITEMS(state, { key, value }) {
    state[key].items.push(...value)
  },
  TOTAL_ITEMS(state, { key, value }) {
    state[key].totalItems = value
  },
  TOTAL_PAGES(state, { key, value }) {
    state[key].totalPages = value
  },
}

export const actions = {
  // * Get all followings list from server
  getAllFollowings({ commit, state }, { page, more = false }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .$get(
          `https://avl-frontend-exam.herokuapp.com/api/users/friends?page=${page}&pageSize=${state.followings.perPage}`
        )
        .then((response) => {
          resolve(response)

          // *set initial page
          commit('SET_PAGE', {
            key: 'followings',
            value: parseInt(page),
          })

          // * if more page has emitted
          if (more) {
            commit('MORE_ITEMS', {
              key: 'followings',
              value: response.data,
            })
          } else {
            // * or set initial state
            commit('SET', {
              key: 'followings',
              value: response.data,
            })

            commit('TOTAL_ITEMS', {
              key: 'followings',
              value: response.total,
            })
            commit('TOTAL_PAGES', {
              key: 'followings',
              value: response.totalPages,
            })
          }
        })
        .catch((error) => {
          console.log(error)
        })
    })
  },

  // * Get all followers list from server
  getAllFollowers({ commit, state }, { page, more = false }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .$get(
          `https://avl-frontend-exam.herokuapp.com/api/users/all?page=${page}&pageSize=${state.followings.perPage}`
        )
        .then((response) => {
          resolve(response)

          // * set initial page
          commit('SET_PAGE', {
            key: 'followers',
            value: parseInt(page),
          })

          // * if more page has emitted
          if (more) {
            commit('MORE_ITEMS', {
              key: 'followers',
              value: response.data,
            })
          } else {
            // * or set initial states
            commit('SET', {
              key: 'followers',
              value: response.data,
            })

            commit('TOTAL_ITEMS', {
              key: 'followers',
              value: response.total,
            })
            commit('TOTAL_PAGES', {
              key: 'followers',
              value: response.totalPages,
            })
          }
        })
        .catch((error) => {
          console.log(error)
        })
    })
  },

  // * get search results
  getSearchResults({ commit }, { page, pageSize, keyword, more = false }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .$get(
          `https://avl-frontend-exam.herokuapp.com/api/users/all?page=${page}&pageSize=${pageSize}&keyword=${keyword}`
        )
        .then((response) => {
          resolve(response)

          // * if more page has emitted
          if (more) {
            commit('MORE_ITEMS', {
              key: 'search',
              value: response.data,
            })
          } else {
            // * or set initial states
            commit('SET', {
              key: 'search',
              value: response.data,
            })
            commit('TOTAL_ITEMS', {
              key: 'search',
              value: response.total,
            })
            commit('TOTAL_PAGES', {
              key: 'search',
              value: response.totalPages,
            })
          }
        })
        .catch((error) => {
          console.log(error)
        })
    })
  },

  // * get all tags
  getAllTags({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .$get('https://avl-frontend-exam.herokuapp.com/api/tags')
        .then((response) => {
          resolve(response)
          commit('SET', {
            key: 'tags',
            value: response,
          })
        })
        .catch((error) => {
          console.log(error)
        })
    })
  },
}
