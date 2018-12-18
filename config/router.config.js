export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
      { path: '/user/register-result', component: './User/RegisterResult' },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'user'],
    routes: [
      // dashboard
      { path: '/', redirect: '/dashboard/analysis' },
      {
        path: '/dashboard',
        name: 'dashboard',
        icon: 'dashboard',
        routes: [
          {
            path: '/dashboard/jobs',
            name: 'jobs',
            component: './NotImplemented',
          },
          {
            path: '/dashboard/monitor',
            name: 'monitor',
            component: './Dashboard/Monitor',
          },
        ],
      },
      // forms
      {
        path: '/templates',
        icon: 'project',
        name: 'templates',
        component: './NotImplemented',
      },
      {
        path: '/credentials',
        icon: 'key',
        name: 'credentials',
        component: './Credentials/BasicList',
      },
      {
        path: '/projects',
        icon: 'experiment',
        name: 'projects',
        component: './NotImplemented',
      },
      {
        path: '/inventories',
        icon: 'credit-card',
        name: 'inventories',
        component: './NotImplemented',
      },
      {
        path: '/users',
        icon: 'user',
        name: 'users',
        component: './NotImplemented',
      },
      {
        path: '/team',
        icon: 'team',
        name: 'team',
        component: './NotImplemented',
      },
      {
        path: '/settings',
        icon: 'setting',
        name: 'settings',
        component: './NotImplemented',
      },

      {
        name: 'exception',
        icon: 'warning',
        hideInMenu: true,
        path: '/exception',
        routes: [
          // exception
          {
            path: '/exception/403',
            name: 'not-permission',
            component: './Exception/403',
          },
          {
            path: '/exception/404',
            name: 'not-find',
            component: './Exception/404',
          },
          {
            path: '/exception/500',
            name: 'server-error',
            component: './Exception/500',
          },
          {
            path: '/exception/trigger',
            name: 'trigger',
            hideInMenu: true,
            component: './Exception/TriggerException',
          },
        ],
      },
      {
        name: 'online',
        icon: 'play-circle',
        path: '/online',
        component: './YamlOnline',
      },
      {
        name: 'machine',
        icon: 'hdd',
        path: '/machine',
        routes: [{ path: '/machine/list', name: 'list', component: './Machine/TableList' }],
      },
      {
        name: 'account',
        icon: 'user',
        path: '/account',
        routes: [
          {
            path: '/account/center',
            name: 'center',
            component: './Account/Center/Center',
            routes: [
              {
                path: '/account/center',
                redirect: '/account/center/articles',
              },
              {
                path: '/account/center/articles',
                component: './Account/Center/Articles',
              },
              {
                path: '/account/center/applications',
                component: './Account/Center/Applications',
              },
              {
                path: '/account/center/projects',
                component: './Account/Center/Projects',
              },
            ],
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: './Account/Settings/Info',
            routes: [
              {
                path: '/account/settings',
                redirect: '/account/settings/base',
              },
              {
                path: '/account/settings/base',
                component: './Account/Settings/BaseView',
              },
              {
                path: '/account/settings/security',
                component: './Account/Settings/SecurityView',
              },
              {
                path: '/account/settings/binding',
                component: './Account/Settings/BindingView',
              },
              {
                path: '/account/settings/notification',
                component: './Account/Settings/NotificationView',
              },
            ],
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
