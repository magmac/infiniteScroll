import { REPOS, LOADING, END } from './mutation-types'
export default {
  [REPOS](state, payLoad) {
    state.repos = payLoad.data
    state.loading = false
  },
  [LOADING](state, payLoad) {
    state.loading = payLoad.value
  },
  [END](state) {
    state.isEnd = true
    state.loading = false
  }
}
