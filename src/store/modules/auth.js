import api from '@/api';

export default {
  state: {
    redirectAffterLogin:'dashboard',
    redirectAffterRegister:'dashboard',
    token: localStorage.getItem('token') || '',
    loading: false
  },
  getters: {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status
  },
  mutations: {
    toggleLoading(state, isLoading) {
      state.loading = isLoading;
    },

    setToken(state, token) {
      state.token = token;
    },
    
    clearToken(state) {
      state.token = undefined;
    }
  },
  actions: {
    loginByEmailAndPassword: async ({ commit, dispatch }, user) => {
      try {
        commit('toggleLoading', true);
        const { data } = await api.post('login', user);
        dispatch('succesLogin', data);
        return Promise.resolve(data);
      } catch (error) {
        return Promise.reject(error);
      } finally {
        commit('toggleLoading', false);
      }
    },

    registerByEmail: async ({ commit, dispatch }, user) => {
      try {
        commit('toggleLoading', true);
        const { data } = await api.post('register', user);
        dispatch('successRegister', user);
        return Promise.resolve(data);
      } catch (error) {
        return Promise.reject(error);
      } finally {
        commit('toggleLoading', false);
      }
    },


    resetPassword: async ({commit }, identification) => {
      try {
        commit('toggleLoading', true);
        const { data } = await api.post('reset-password', identification);
        return Promise.resolve(data);
      } catch (error) {
        return Promise.reject(error);
      } finally {
        commit('toggleLoading', false);
      }
    },
    successRegister({dispatch}, token){
      dispatch('successLogin', token)
    },
    succesLogin({ commit, dispatch }, data) {
      const token = data.token;
      localStorage.setItem('token', token);
      commit('setToken', token);
      dispatch('setCurrentUser', data);
    },

    logout: async ({ commit, dispatch }) => {
      localStorage.removeItem('token');
      api.removeAuthorization();
      commit('clearToken');
      dispatch('clearCurrentUser');
      return Promise.resolve();
    }
  }
};
