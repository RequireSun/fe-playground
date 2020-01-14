import {Vue} from 'vue-property-decorator';
import Vuex, { Store } from 'vuex';
import SubStore, { IStoreSubStore } from './sub-store';

Vue.use(Vuex);

export interface IStorePureRoot {
    rootA: number;
}

export interface IStoreRoot extends IStorePureRoot {
    subStore: IStoreSubStore;
}

const state: IStorePureRoot = {
    rootA: 1,
};

// 这里用更全的类型, 以便子模块能够通过 rootState.subState.subProp 的方法取其他子模块的值
export default new Store<IStoreRoot>({
    modules: {
        subStore: SubStore,
    },
    // 这里骗过类型判断
    state: state as IStoreRoot,
});
