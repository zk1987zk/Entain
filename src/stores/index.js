import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {createMutations} from './mutation-types'
import store from './index'

Vue.use(Vuex)

const state = {races: null}
const mutations = createMutations(state)

const actions = {
  fetchRaces() {
    store.commit('FETCH_RACE_PENDING')
    return new Promise((resolve, reject) => {
      axios.get('https://api.neds.com.au/rest/v1/racing/?method=nextraces&count=10')
        .then((response) => {
          store.commit('FETCH_RACE_PENDING', false)
          store.commit('FETCH_RACE_SUCCESS', response.data)
          resolve(response)
        })
        .catch((error) => {
          store.commit('FETCH_RACE_PENDING', false)
          store.commit(
            'FETCH_RACE_FAILURE',
            error.response.data.error_description ||
            error.response.data.message
          )
          reject(error)
        })
    })
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})