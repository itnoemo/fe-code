/**
 * @file hooks useTime
 */

import { ref, computed, onBeforeUnmount } from 'vue';
/**
 * 
 * @param {*} maxSeconds 毫秒数
 * @param {*} onCallbackTimeout 超时时回调函数
 * @param {*} isIncre 是否毫秒数自增，默认为自减
 */
const useTime = (maxSeconds, onCallbackTimeout, isIncre = false) => {
    // 计时器
    const time = ref(maxSeconds);

    // 定时器
    let timer = null;

    const timeResult = computed(() => {
        let timeValue = time.value;
        let m, s;
        timeValue = timeValue > 0 ? timeValue : 0;
        m = parseInt(timeValue / 60);
        s = timeValue % 60;
        m = m > 9 ? m : `0${m}`;
        s = s > 9 ? s : `0${s}`;
        return `${m}:${s}`
    });

    // 方法-取消
    const clear = () => {
        clearInterval(timer);
    };
    // 方法-开始计时
    const start = (isDown = true) => {
        timer = setInterval(() => {
            // 结束时
            if (isDown && time.value === 0) {
                clear();
                onCallbackTimeout && onCallbackTimeout();
                return;
            }
            // 是否自减
            if (isDown) {
                time.value--;
            } else {
                time.value++;
            }
        }, 1000);
    };
    // 方法-自增
    const startUp = () => {
        start(false);
    };
    // 方法-重置
    const reset = () => {
        time.value = maxSeconds;
        resume();
    };

    onBeforeUnmount(() => {
        clear();
    });

    return {
        time: timeResult,
        startDown: start,
        startUp,
        reset,
        clear
    };
};
export default useTime;