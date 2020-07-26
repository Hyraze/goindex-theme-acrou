export default {
  namespaced: true,
  state: {
    // View mode
    mode: "list",
  },
  actions: {
    /**
     * @description Read view mode settings from persistent data
     * @param {Object} context
     */
    load({ state, dispatch, commit }) {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (resolve) => {
        // store Assignment
        state.mode = await dispatch(
          "acrou/db/get",
          {
            dbName: "sys",
            path: "view.mode.value",
            defaultValue: "list",
            user: true,
          },
          { root: true }
        );
        // application
        commit("set", state.mode);
        // end
        resolve();
      });
    },
    /**
     * @description Switch view mode
     * @param {Object} context
     */
    toggle({ state, dispatch, commit }, mode) {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (resolve) => {
        // store Assignment
        state.mode = mode || "list";
        // Persistence
        await dispatch(
          "acrou/db/set",
          {
            dbName: "sys",
            path: "view.mode.value",
            value: state.mode,
            user: true,
          },
          { root: true }
        );
        // application
        commit("set", state.mode);
        // end
        resolve();
      });
    },
  },
  mutations: {
    /**
     * @description Set the view mode in the store
     * @param {Object} state state
     * @param {Boolean} mode mode
     */
    set(state, mode) {
      state.mode = mode;
    },
  },
};
