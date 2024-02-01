import { createStore } from 'vuex';
import actions from './actions';
import mutations from './mutations';

export const defaultState = {
  repos: [],
  loading: false,
  isEnd: false,
};

export default createStore({
  state: defaultState,
  actions,
  mutations,
});
