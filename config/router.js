export const routeList = [
    { path: '/', component: './index' },
    { path: '/login', component: './login' },
    {
        path: '/managerCenter', component: './managerCenter/_layout',
        routes: [
            { path: '/managerCenter/userList', component: './managerCenter/userList' },
            { path: '/managerCenter/userList/userDetail', component: './managerCenter/userList/userDetail' },
            { path: '/managerCenter/roleList', component: './managerCenter/roleList' },
            { path: '/managerCenter/rightList', component: './managerCenter/rightList' },
            { path: '/managerCenter/deviceList', component: './managerCenter/deviceList' },
            { path: '/managerCenter/deviceEventsList', component: './managerCenter/deviceEventsList' },
            { component: './404'},
        ]
    },
    { component: './404'},
];