import Vue from 'vue'
export default {
  SET_GLOBAL(state, global) {
    Vue.set(state, 'global', global)
  },
  SET_VIETNAM(state, vietnam) {
    Vue.set(state, 'vietnam', vietnam)
  },
  SET_COUNTRIES(state, countries) {
    Vue.set(state, 'countries', countries)
  },
  SET_VIETNAMESE(state, vietnamese) {
    Vue.set(state, 'vietnamese', vietnamese)
  },
}
