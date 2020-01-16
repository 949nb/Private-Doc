module.exports = {
  title: 'Hello VuePress',
  description: 'Just playing around',
  themeConfig: {
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
        items: [{
            text: 'Chinese',
            link: '/language/chinese/'
          },
          {
            text: 'Japanese',
            link: '/language/japanese/'
          }
        ]
      }
    ],
    sidebar: [{
        title: '介绍', // 必要的
        path: '/zh/guide', // 可选的, 应该是一个绝对路径
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1, // 可选的, 默认值是 1
        children: [
          '/'
        ]
      },
      {
        title: 'Group 2',
        children: [ /* ... */ ]
      }
    ],
    smoothScroll: true
  }
}