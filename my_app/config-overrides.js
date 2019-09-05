const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
    //写了下面这个部分，就实现了按需加载，再也不需要再每个页面里面都引入“antd/dist/antd.css”啦
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true  //这里一定要写true，css和less都不行哦
    }),
    addLessLoader({
        javascriptEnabled: true,
        //下面这行很特殊，这里是更改主题的关键，这里我只更改了主色，当然还可以更改其他的，下面会详细写出。
        modifyVars: {
                        "@primary-color": "#f47983",// 全局主色
                        "@link-color": "#1890ff",  // 链接色
                        "@success-color": "#52c41a",   // 成功色
                        "@warning-color": "#faad14", // 警告色
                        "@error-color": "#f5222d",  // 错误色
                        "@font-size-base": "14px",  // 主字号
                        "@heading-color": "rgba(0, 0, 0, .85)",  // 标题色
                        "@text-color": "rgba(0, 0, 0, .65)",  // 主文本色
                        "@text-color-secondary" : "rgba(0, 0, 0, .45)",  // 次文本色
                        "@disabled-color ": "rgba(0, 0, 0, .25)", // 失效色
                        "@border-radius-base": "4px",  // 组件/浮层圆角
                        "@border-color-base": "#d9d9d9",  // 边框色
                        "@box-shadow-base": "0 2px 8px rgba(0, 0, 0, .15)"  // 浮层阴影
                    }
    })
)