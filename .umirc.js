
// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: { webpackChunkName: true },
      title: 'react-study-umi-dva',
      dll: true,
      locale: {
        enable: true,
        default: 'en-US',
      },
      routes: [
        { path: '/', component: './home' },
        { path: '/managerCenter', component: './managerCenter/_layout',
          routes: [
            { path: '/managerCenter/deviceList', component: './managerCenter/deviceList' },
            { path: '/managerCenter/deviceEventsList', component: './managerCenter/deviceEventsList' },
          ]
        },
      ],
    }],
  ],
  cssLoaderOptions:{
    localIdentName:'[local]'
  }
}
