module.exports = {
    title: '宇总理财日记',
    description: 'Just playing around',
    plugins: ['@vuepress/back-to-top'],
    themeConfig: {
        lastUpdated: '最后一次更新',
        editLinks: false,
        nav: [
          { text: '主页', link: '/' },
          { text: '章节', link: '/guide/one' },
        //   {
        //     text: 'Languages',
        //     ariaLabel: 'Language Menu',
        //     items: [
        //       { text: 'Chinese', link: '/language/chinese/' },
        //       { text: 'Japanese', link: '/language/japanese/' }
        //     ]
        //   }
        ],
        sidebar: {
            '/guide/': [
                {
                    title: 'Group 1',   // 必要的
                    // path: 'one'
                    // collapsable: false, // 可选的, 默认值是 true,
                    // collapsable: true,
                    children: [
                        'one'
                    ]
                },
                {
                    title: 'LL',
                    path: 'tess'
                }
            ]
        }
      }
  }