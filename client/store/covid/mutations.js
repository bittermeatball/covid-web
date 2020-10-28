import Vue from 'vue'
export default {
  SET_GLOBAL(state, global) {
    Vue.set(state, 'global', global)
  },
  SET_COUNTRIES(state, countries) {
    Vue.set(state, 'countries', countries)
  },
}
