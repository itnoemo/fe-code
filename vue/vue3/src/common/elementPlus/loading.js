/**
 * @file loading
 */
import { ElLoading } from 'element-plus';
// loading
const loadingInstance = ElLoading.service({
    fullscreen: true,
    background: 'rgba(122, 122, 122, 0.8)'
});

export default loadingInstance;
