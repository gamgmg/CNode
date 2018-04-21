## 开发目录

```
├── README.md
├── build
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── src
│   ├── App.vue                     # 视图入口
│   ├── api                         # API配置文件
│   │   └── index.js
│   ├── assets                      # 处理静态资源文件目录
│   │   ├── images
│   │   │   ├── app-qrcode.png
│   │   │   ├── github.svg
│   │   │   └── not-match.gif
│   │   └── scss
│   │       ├── _variable.scss
│   │       ├── media.scss
│   │       └── style.scss
│   ├── components
│   │   ├── footer
│   │   │   └── Footer.vue          # 底部组件
│   │   ├── header
│   │   │   └── Header.vue          # 头部组件
│   │   ├── msg
│   │   │   └── Msg.vue             # 未读消息和已读消息列表组件
│   │   ├── sidebar
│   │   │   └── Sidebar.vue         # 侧边栏组件
│   │   └── topics-list
│   │       └── TopicsList.vue      # 话题列表组件
│   ├── main.js                     # 程序入口文件
│   ├── router
│   │   └── index.js                # 路由配置
│   ├── store
│   │   └── index.js                # 状态管理
│   └── views
│       ├── 404
│       │   └── 404.vue             # 404页
│       ├── collections
│       │   └── Collections.vue     # 收藏页
│       ├── index
│       │   └── Index.vue           # 主页
│       ├── login
│       │   └── Login.vue           # 登录页
│       ├── messages
│       │   └── Messages.vue        # 未读消息页
│       ├── release
│       │   └── Release.vue         # 发布/编辑页
│       ├── topic
│       │   └── Topic.vue           # 查看话题详情页
│       └── user
│           └── User.vue            # 用户详情页/个人主页
└── static                          # 静态资源目录
    └── images
        ├── 11.png
        ├── 22.png
        ├── 33.png
        └── 44.png
```