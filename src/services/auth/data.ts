const remoteMenuData = [
  {
    identity: 'root.demo',
    name: '框架示例',
    icon: 'smile',
    path: 'demo',
    children: [
      {
        identity: 'root.demo.helloworld',
        name: 'Hello world',
        path: 'helloworld'
      }
    ]
  }, {
    identity: 'root.dashboard',
    name: 'dashboard',
    icon: 'dashboard',
    path: 'dashboard',
    children: [
      {
        identity: 'root.dashboard.analysis',
        name: '分析页',
        path: 'analysis'
      }, {
        identity: 'root.dashboard.monitor',
        name: '监控页',
        path: 'monitor'
      }, {
        identity: 'root.dshboard.workplace',
        name: '工作台',
        path: 'workplace',
        // hideInMenu: true,
      }
    ]
  }, {
    identity: 'root.form',
    name: '表单页',
    icon: 'form',
    path: 'form',
    children: [
      {
        identity: 'root.form.basic',
        name: '基础表单',
        path: 'basic-form'
      }, {
        identity: 'root.form.step',
        name: '分步表单',
        path: 'step-form'
      }, {
        identity: 'root.form.advanced',
        name: '高级表单',
        authority: 'admin',
        path: 'advanced-form'
      }
    ]
  }, {
    identity: 'root.table',
    name: '列表页',
    icon: 'table',
    path: 'list',
    children: [
      {
        identity: 'root.table.List',
        name: '查询表格',
        path: 'table-list'
      }, {
        identity: 'root.table.basicList',
        name: '标准列表',
        path: 'basic-list'
      }, {
        identity: 'root.table.cardList',
        name: '卡片列表',
        path: 'card-list'
      }, {
        identity: 'root.search',
        name: '搜索列表',
        path: 'search',
        children: [
          {
            identity: 'root.search.articles',
            name: '搜索列表（文章）',
            path: 'articles'
          }, {
            identity: 'root.search.projects',
            name: '搜索列表（项目）',
            path: 'projects'
          }, {
            identity: 'root.search.applications',
            name: '搜索列表（应用）',
            path: 'applications'
          }
        ]
      }
    ]
  }, {
    identity: 'root.profile',
    name: '详情页',
    icon: 'profile',
    path: 'profile',
    children: [
      {
        identity: 'root.profile.basic',
        name: '基础详情页',
        path: 'basic'
      }, {
        identity: 'root.profile.advanced',
        name: '高级详情页',
        path: 'advanced'
      }
    ]
  }, {
    identity: 'root.result',
    name: '结果页',
    icon: 'check-circle-o',
    path: 'result',
    children: [
      {
        identity: 'root.result.success',
        name: '成功',
        path: 'success'
      }, {
        identity: 'root.result.fail',
        name: '失败',
        path: 'fail'
      }
    ]
  },
  // {   identity: 'Root.Exception',   name: '异常页',   icon: 'warning',   path:
  // 'exception',   children: [     {       identity: 'Root.Exception.403',
  // name: '403',       path: '403'     }, {       identity: 'Root.Exception.401',
  //       name: '404',       path: '404'     }, {       identity:
  // 'Root.Exception.500',       name: '500',       path: '500'     }, {
  // identity: 'Root.Exception.Triger',       name: '触发异常',       path: 'trigger'
  //    }   ] },
  {
    identity: 'root.user',
    name: '账户',
    icon: 'user',
    path: 'user',
    children: [
      {
        identity: 'root.user.login',
        name: '登录',
        path: 'login'
      }, {
        identity: 'root.user.register',
        name: '注册',
        path: 'register'
      }, {
        identity: 'root.user.registerResult',
        name: '注册结果',
        path: 'register-result'
      }
    ]
  }
];

export default remoteMenuData;