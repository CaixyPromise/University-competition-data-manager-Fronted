export default [
    {
        path: '/user',
        layout: false,
        routes: [ { name: '登录', path: '/user/login', component: './User/Login' } ],
    },
    { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
    {
        path: "/team",
        name: "团队中心",
        routes: [ { path: '/team', redirect: '/team/index' },
            { path: '/team/index', component: './team/teamList', name: '团队中心' },
            { path: '/team/profile/:id', component: "./team/profile", name: '团队详情', hideInMenu: true }
        ]
    },
    {
        path: "/competition",
        name: "信息广场",
        routes: [
            { path: "/competition", redirect: "/competition/index" },
            { path: "/competition/index", component: "./competition/Index", name: "竞赛广场" },
            {
                path: "/competition/profile/:id", hideInMenu: true, component: "./competition/profile",
                name: "竞赛详情",
            },
            {
                path: "/competition/register/:id", hideInMenu: true, component: "./competition/registration",
                name: "竞赛报名",
            }
        ]
    },
    {path: "/demands", name:"需求广场", routes: [
            {"path": "/demands", redirect: "/demands/index"},
            {"path": "/demands/index", component: "./demand-market/List", name: "需求广场"},
            {"path": "/demands/profile/:id", hideInMenu:true, component: "./demand-market/profile", name: "需求详情"}

        ] },
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
    { path: '/', redirect: '/welcome' },
    { path: '*', layout: false, component: './404' },
];
