/**
 * @file bindWatchMsgCallback
 */

import { watch, computed, toRaw } from 'vue';
import { useStore } from 'vuex';

const bindWatchMsgCallback = onCallback => {

    const store = useStore();
    // 实例
    const jssdkInstance =  toRaw(computed(() => store.state.jssdkInstance));

    watch(jssdkInstance, () => {
        if (!jssdkInstance.value) return;
        onCallback && onCallback(jssdkInstance.value);
    }, { immediate: true });
};

export default bindWatchMsgCallback;