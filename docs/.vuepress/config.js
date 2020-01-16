module.exports = {
  title: 'Hello VuePress',
  description: 'Just playing around',
  themeConfig: {
    sidebarDepth: 2,
    nav: [{
        text: 'Home',
        link: '/'
      },
      {
        text: 'Guide',
        link: '/guide/'
      },
      {
        text: 'External',
        link: 'https://google.com',
        target: '_blank',
        rel: ''
      },
      {
        text: 'Languages',
        ariaLabel: 'Language Menu',
        items: [
          {
            text: 'Chinese',
            link: '/'
          }
        ]
      }
    ],
    lastUpdated: 'Last Updated',
    sidebar: [
      {
        title: '介绍', // 必要的
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1, // 可选的, 默认值是 1
        children: ['/zh/guide']
      },
      {
        title: '组件',
        collapsable: false, // 可选的, 默认值是 true,
        path: '/component/', // 可选的, 应该是一个绝对路径
        collapsable: false,
        children: [
          {
            title: '类input组件', // 必要的
            path: '/component/input/', // 可选的, 应该是一个绝对路径
            collapsable: false, // 可选的, 默认值是 true,
            sidebarDepth: 1, // 可选的, 默认值是 1
            children: [
              {
                title: 'inputselect',
                path: '/component/input/inputselect', // 可选的, 应该是一个绝对路径
                collapsable: false, // 可选的, 默认值是 true,
                sidebarDepth: 1, // 可选的, 默认值是 1
              }
            ]
          },
          // '/component/README'
        ]
      },
      {
        title: '工具函数',
        collapsable: false, // 可选的, 默认值是 true,
        children: ['/component/']
      }
    ],
    smoothScroll: true
  }
}