import { toRaw } from 'vue';
import { getReop } from '@/api';
import { REPOS, LOADING, END } from './mutation-types';

export default {
  async fetchData({ commit, state }, params) {
    const repos = toRaw(state.repos);
    commit({ type: LOADING, value: true });
    const apiData = await getReop(params);
    if (!apiData.length) return commit({ type: END });
    const data = repos.length < 0 ? apiData : repos.concat(apiData);
    return commit({
      type: REPOS,
      data,
    });
  },
};
