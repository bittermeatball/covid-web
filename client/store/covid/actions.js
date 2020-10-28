import { covidMutations } from '~/constants/vuex/covid'
const countriesList = require('~/constants/data/countries.json')
export default {
  async fetchSummary({ commit }) {
    const { data } = await this.$clientApi.get(
      'https://api.covid19api.com/summary'
    )
    commit(covidMutations.SET.GLOBAL, data.Global, { root: true })
    const countries = await Promise.all(
      data.Countries.map((country) => {
        return {
          ...country,
          ...countriesList.find(
            (item) => item.CountryCode === country.CountryCode
          ),
        }
      })
    )
    commit(covidMutations.SET.COUNTRIES, countries, { root: true })
  },
}
