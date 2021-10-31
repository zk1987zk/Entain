import Vue from 'vue'

export const createMutations = (initialState) => {
  Vue.set(initialState, 'FETCH_RACE_PENDING', false)
  Vue.set(initialState, 'FETCH_RACE_SUCCESS', false)
  Vue.set(initialState, 'FETCH_RACE_RESPONSE', null)
  Vue.set(initialState, 'FETCH_RACE_FAILURE', null)

  return {
    ['FETCH_RACE_PENDING'] (state) {
      Vue.set(state, 'FETCH_RACE_PENDING', true)
    },
    ['FETCH_RACE_SUCCESS'] (state, data) {
      Vue.set(state, 'FETCH_RACE_PENDING', false)
      Vue.set(state, 'FETCH_RACE_SUCCESS', true)
      Vue.set(state, 'FETCH_RACE_FAILURE', null)
      Vue.set(state, 'FETCH_RACE_RESPONSE', data)
    },
    ['FETCH_RACE_FAILURE'] (state, error) {
      Vue.set(state, 'FETCH_RACE_PENDING', false)
      Vue.set(state, 'FETCH_RACE_SUCCESS', false)
      Vue.set(state, 'FETCH_RACE_FAILURE', error)
    }
  }
}