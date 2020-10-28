// import { authMutations } from '~/constants/vuex/auth'
// const cookieparser = process.server ? require('cookieparser') : undefined
export default {
  // This will run first when nuxt app init
  nuxtServerInit({ commit }, { req }) {
    // let auth = null
    // // Since we don't have localStorage in server side, we gotta use cookie instead
    // if (req?.headers?.cookie) {
    //   const parsed = cookieparser.parse(req?.headers?.cookie)
    //   try {
    //     auth = JSON.parse(parsed.auth)
    //   } catch (err) {
    //     // No valid cookie found
    //   }
    // }
    // commit(authMutations.SET.AUTH, auth)
  },
}
