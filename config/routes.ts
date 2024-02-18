export default [
    {
        path: '/user',
        layout: false,
        routes: [ { name: '登录', path: '/user/login', component: './User/Login' } ],
    },
    { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
    {
        path: '/admin',
        name: '管理页',
        icon: 'crown',
        access: 'canAdmin',
        routes: [
            { path: '/admin', redirect: '/admin/sub-page' },
            { path: '/admin/user-data', name: '用户管理', component: './Admin/UserList' },

            { path: '/admin/department-data', name: '学院与专业管理', component: './Admin/DepartmentAndMajorList' },
            {
                // path: '/admin/competition',
                name: '比赛管理',
                // component: './Admin/CompetitionList',
                routes: [
                    { path: '/admin/competition', redirect: '/admin/competition/list' },
                    { path: '/admin/competition/list', name: '比赛列表', component: './Admin/CompetitionList' },
                    { path: '/admin/competition/add', name: '添加比赛', component: './Admin/AddCompetition' },
                ],
            },
        ],
    },
    {
        name: '个人页',
        icon: 'user',
        path: '/account',
        routes: [
            { path: '/account', redirect: '/account/center' },
            { name: '个人中心', icon: 'smile', path: '/account/center', component: './account/center' },
            {
                name: '个人设置',
                icon: 'smile',
                path: '/account/settings',
                component: './account/settings',
            },
        ],
    },
    // { name: '查询表格', icon: 'table', path: '/list', component: './TableList' },
    {
        path: '/profile',
        name: '详情页',
        icon: 'profile',
        routes: [
            { path: '/profile', redirect: '/profile/basic' },
            { name: '基础详情页', icon: 'smile', path: '/profile/basic', component: './profile/basic' },
            {
                name: '高级详情页',
                icon: 'smile',
                path: '/profile/advanced',
                component: './profile/advanced',
            },
        ],
    },
    { path: '/', redirect: '/welcome' },
    { path: '*', layout: false, component: './404' },
];
