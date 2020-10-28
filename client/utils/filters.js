import Vue from 'vue'

Vue.filter('upper', (val) => {
  return val.toUpperCase()
})

Vue.filter('formatNumber', (val) => {
  val = val + ''
  return val.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
})

Vue.filter('formatDate', (val) => {
  const moment = require('moment')
  return moment(val).format('l')
})

Vue.filter('slugify', (val) => {
  // For more information, visit https://www.npmjs.com/package/slug
  const slug = require('slug')
  return slug(val)
})
