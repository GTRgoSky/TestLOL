import { nextTick } from 'vue';
import { createLogger, createStore, ActionContext } from 'vuex';

interface State {
  title: string;
}

export default createStore({
  state(): State {
    return {
      title: '',
    };
  },
  mutations: {
    setTitle(state: State, title: string) {
      state.title = title;
    },
  },
  actions: {
    async nextTickSetTitle({ commit }: ActionContext<State, State>, title: string) {
      await nextTick();
      commit('setTitle', title);
    },
  },
  plugins: process.env.NODE_ENV === 'development' ? [createLogger()] : [],
});
