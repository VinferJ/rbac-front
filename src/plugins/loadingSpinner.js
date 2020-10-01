
/*
* loading-spinner使用说明：
*   1. 对话框或其他带有遮罩弹出的界面或组件中使用element-ui提供的loading，即当前插件类
*   2. 涉及表单提交以及页面初始数据的加载全部使用自定义的fullscreenLoadingSpinner组件
*   3. 其余场景的加载如更新、删除等操作，使用自定义的blockLoadingSpinner组件
*
* */

import {Loading} from "element-ui";
import Vue from 'vue'

/**
 * 开启全屏加载灯罩
 * @param loadingText       加载提示文本
 */
const startLoading=(loadingText) => {
    Loading.service({
        lock:true,
        text:loadingText,
        background:'rgba(0, 0, 0, 0.7)'
    })
};

/**
 * 关闭全屏加载灯罩
 */
const endLoading=() => {
    Loading.service({}).close();
};



/*
* 将上面的方法注册到vue中并默认导出
* */
export default function () {
    Vue.prototype.$fsloading={
        startLoading,
        endLoading,
    }
}



