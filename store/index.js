import Vuex from "vuex";
import state from "./state/index";
import mutations from "./mutations/index";

export default () => {
    const store = new Vuex.Store({
        state,
        mutations
    });

    return store;
};
