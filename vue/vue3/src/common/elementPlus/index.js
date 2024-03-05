/**
 * @file element-plus
 */

import ElementPlus from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

// 添加组件
const registerComponent = app => {
    // 图标组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
        app.component(key, component)
    }
    // 其他组件
    app.use(ElementPlus, {locale: zhCn});
};

export default registerComponent;
