import api from '@/api';

export default {
  state: {
    currentUser: undefined
  },
  getters: {},
  actions: {
    setCurrentUser: ({ commit }, user) => {
      commit('setCurrentUser', user);
    },
    clearCurrentUser: ({ commit }) => {
      commit('clearCurrentUser');
    },
    getCurrentUserFromApi: async ({ dispatch }) => {
      const { data } = await api.get('profile');
      dispatch('setCurrentUser', data);
      return data;
    }
  },
  mutations: {
    setCurrentUser(state, user) {
      state.currentUser = user;
    },
    clearCurrentUser(state) {
      state.currentUser = undefined;
    }
  }
};
