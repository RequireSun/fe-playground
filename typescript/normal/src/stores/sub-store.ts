import { ActionContext, Module, GetterTree, MutationTree, ActionTree } from 'vuex';
import { IStoreRoot } from './index';

const state = {
    propA: 1,
    propB: 'str',
};

export type IStoreSubStore = typeof state;

const getters: GetterTree<IStoreSubStore, IStoreRoot> = {
    // 这个 any 官方也没办法解决
    // 详见:
    // https://github.com/vuejs/vuex/issues/564
    processedPropA(state: IStoreSubStore, getters: any, rootState: IStoreRoot, rootGetters: any) {
        return `propA: ${state.propA}; rootA: ${rootState.rootA}`;
    },
    processedPropB(state) {
        return `propB(*3): ${state.propB.repeat(3)}`;
    },
    combinedProps(state: IStoreSubStore, getters: any, rootState: IStoreRoot, rootGetters: any) {
        return `${getters.processedPropA}; ${getters.processedPropB}`;
    },
};

const mutations: MutationTree<IStoreSubStore> = {
    increasePropA(state, payload: number) {
        state.propA += payload;
    },
};

type actionCtx = ActionContext<IStoreSubStore, IStoreRoot>;

const actions: ActionTree<IStoreSubStore, IStoreRoot> = {
    async randomlyIncreasePropA(ctx: actionCtx, payload: number) {
        // 随机等待 1 秒半
        await new Promise(res => setTimeout(res, Math.ceil(Math.random() * 1500)));

        ctx.commit('increasePropA', Math.ceil(Math.random() * payload));
    },
};

export default <Module<IStoreSubStore, IStoreRoot>>{
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
