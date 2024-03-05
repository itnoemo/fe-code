/**
 * @file 主入口
 */

import { createApp } from 'vue';
import App from 'src/Widget/App';
import Fragment from 'vue-fragment'
import store from 'src/common/store';
import router from 'src/common/router';
import registerComponent from 'src/common/elementPlus';
import 'element-plus/dist/index.css';
import 'src/common/css/base.less';

const app = createApp(App);
// sdk实例对象
app.config.globalProperties.$jssdkInstance = null;
// 注册组件
registerComponent(app);
app.use(Fragment)
    .use(router)
    .use(store)
    .mount('#app');
