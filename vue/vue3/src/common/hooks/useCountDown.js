/**
 * @file hooks useCountDown
 */

import { ref, computed } from 'vue';

const useCountDown = (maxCount, onCallbackTimeout) => {
    // 计时器
    const count = ref(maxCount);
    
    // 定时器
    let timer = null;

    // 方法-消除定时器
    const clear = () => {
        clearInterval(timer);
        count.value = maxCount;
    };
    // 方法-初始化计时数
    const reset = () => {
        count.value = maxCount;
        clear();
        timer = setInterval(() => {
            const countValue = count.value;
            if (countValue === 0) {
                clear();
                onCallbackTimeout && onCallbackTimeout();
                return;
            }
            count.value--;
        }, 1000);
    };

    return {
        count,
        clear,
        reset
    };
};
export default useCountDown;